const http = require('http');

const PORT = 5174;
const TARGET_PORT = 5173;

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy forward error:', err.message);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Gateway Error connecting to Vite dev server on port ' + TARGET_PORT);
  });

  req.pipe(proxyReq, { end: true });
});

// Handle WebSocket / HMR upgrade
server.on('upgrade', (req, socket, head) => {
  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options);
  proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
    socket.write(
      `HTTP/${proxyRes.httpVersion} ${proxyRes.statusCode} ${proxyRes.statusMessage}\r\n` +
      Object.keys(proxyRes.headers)
        .map((k) => `${k}: ${proxyRes.headers[k]}`)
        .join('\r\n') +
      '\r\n\r\n'
    );
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxyReq.on('error', (err) => {
    console.error('WebSocket proxy error:', err.message);
    socket.destroy();
  });

  proxyReq.end();
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Port bridge active: http://localhost:${PORT} -> forwarding to http://localhost:${TARGET_PORT}`);
});

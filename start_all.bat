@echo off
title CivicSync Full Stack Launcher
echo ===================================================
echo           Starting CivicSync Full Stack
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Flask Backend on port 5000...
start "CivicSync Flask Backend" cmd /k "title CivicSync Flask Backend && .\.venv\Scripts\python.exe backend\app.py"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Vite Frontend on port 5173...
start "CivicSync Vite Frontend" cmd /k "title CivicSync Vite Frontend && cd frontend && npm run dev"

timeout /t 2 /nobreak >nul

echo.
echo ===================================================
echo  CivicSync is running!
echo  Backend:  http://127.0.0.1:5000
echo  Frontend: http://localhost:5173
echo ===================================================
echo.
pause

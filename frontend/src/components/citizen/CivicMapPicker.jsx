import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * CivicMapPicker Component
 * ------------------------
 * Interactive OpenStreetMap Pin Picker powered by Leaflet.
 * Enables citizens to drop/drag a marker, auto-detect location,
 * and automatically reverse-geocode to a human-readable street address.
 */
export default function CivicMapPicker({
  initialLat = 17.3850,
  initialLng = 78.4867,
  onLocationSelect,
  onNotification,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [coords, setCoords] = useState({
    lat: parseFloat(initialLat) || 17.3850,
    lng: parseFloat(initialLng) || 78.4867,
  });
  const [resolvedAddress, setResolvedAddress] = useState('Detecting street address...');
  const [isLocating, setIsLocating] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Custom high-contrast civic map pin icon matching Nagarmitra theme
  const createPinIcon = () => {
    return L.divIcon({
      className: 'civic-leaflet-marker',
      html: `
        <div class="civic-pin-anchor">
          <div class="civic-pin-pulse"></div>
          <div class="civic-pin-badge">📍</div>
        </div>
      `,
      iconSize: [36, 42],
      iconAnchor: [18, 38],
      popupAnchor: [0, -36],
    });
  };

  // Perform reverse geocoding via OpenStreetMap Nominatim
  const fetchAddress = async (lat, lng) => {
    setIsGeocoding(true);
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const response = await fetch(url, {
        headers: {
          'Accept-Language': 'en',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const addressText = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        setResolvedAddress(addressText);
        if (onLocationSelect) {
          onLocationSelect({
            lat: lat.toFixed(5),
            lng: lng.toFixed(5),
            address: addressText,
          });
        }
        return addressText;
      }
    } catch {
      // Fallback if offline / rate-limited
      const fallback = `Coordinates (${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E)`;
      setResolvedAddress(fallback);
      if (onLocationSelect) {
        onLocationSelect({
          lat: lat.toFixed(5),
          lng: lng.toFixed(5),
          address: fallback,
        });
      }
    } finally {
      setIsGeocoding(false);
    }
  };

  // Initialize Leaflet Map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Default to provided coords or fallback
    const startLat = coords.lat;
    const startLng = coords.lng;

    const map = L.map(mapContainerRef.current, {
      center: [startLat, startLng],
      zoom: 15,
      zoomControl: true,
      attributionControl: false,
    });
    mapRef.current = map;

    // Clean OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add Draggable Marker
    const marker = L.marker([startLat, startLng], {
      draggable: true,
      icon: createPinIcon(),
      title: 'Drag or click to set civic grievance location',
    }).addTo(map);
    markerRef.current = marker;

    marker.bindPopup('<b>📍 Grievance Location</b><br/>Drag pin or click map to adjust.').openPopup();

    // Handle marker drag
    marker.on('dragend', (e) => {
      const newPos = e.target.getLatLng();
      setCoords({ lat: newPos.lat, lng: newPos.lng });
      fetchAddress(newPos.lat, newPos.lng);
    });

    // Handle click on map to move pin
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setCoords({ lat, lng });
      fetchAddress(lat, lng);
    });

    // Initial address resolution
    fetchAddress(startLat, startLng);

    // Auto-fix Leaflet sizing glitches in dynamic modals/containers
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
    };
  }, []);

  // Handle "Locate Me" button (HTML5 Geolocation)
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      if (onNotification) onNotification('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });

        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([latitude, longitude], 16);
          markerRef.current.setLatLng([latitude, longitude]);
          markerRef.current.openPopup();
        }

        fetchAddress(latitude, longitude);
        if (onNotification) {
          onNotification('📍 GPS location locked! Pin positioned at your current coordinates.');
        }
      },
      (err) => {
        setIsLocating(false);
        const errMsg = err.code === 1 ? 'Location permission was denied.' : 'Unable to acquire GPS fix.';
        if (onNotification) onNotification(`⚠️ ${errMsg}`);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="civic-map-picker-card">
      {/* Map Control Toolbar */}
      <div className="civic-map-header">
        <div className="civic-map-title-row">
          <span className="civic-map-icon">🗺️</span>
          <div>
            <strong style={{ fontSize: '0.88rem', color: '#111827' }}>
              Interactive Grievance Pin Picker
            </strong>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Click on the map or drag the pin to pinpoint the exact road, pole, or drain location.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLocateMe}
          disabled={isLocating}
          className="civic-map-locate-btn"
          title="Detect my current physical location"
        >
          {isLocating ? '📡 Locating...' : '🎯 Locate Me'}
        </button>
      </div>

      {/* Leaflet Canvas Container */}
      <div
        ref={mapContainerRef}
        className="civic-map-canvas"
        style={{ height: '240px', width: '100%', borderRadius: '6px' }}
      />

      {/* Resolved Address & Coordinates Bar */}
      <div className="civic-map-footer">
        <div className="civic-map-coords-badge">
          <span>Lat: {coords.lat.toFixed(5)}°</span>
          <span>•</span>
          <span>Lng: {coords.lng.toFixed(5)}°</span>
        </div>

        <div className="civic-map-address-text">
          {isGeocoding ? (
            <span style={{ color: '#2563EB' }}>⏳ Resolving street address...</span>
          ) : (
            <span title={resolvedAddress}>
              📍 <strong>Location:</strong> {resolvedAddress}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

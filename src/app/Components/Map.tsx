import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple } from 'leaflet';

const customIcon = L.icon({
  iconUrl: '/location.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Map = () => {
  const position: LatLngTuple = [51.505, -0.09]; 

  return (
    <div className="h-96">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            TRAGENCE <br /> 10 Diego Maradona Street, Lanús, Argentine
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
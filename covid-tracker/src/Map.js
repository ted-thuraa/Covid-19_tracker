import React from 'react';
import './Map.css';
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";

const position = [51.505, -0.09];

function Map() {
  return (
    <div className='map'>
      <LeafletMap center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    </div>
  );
}

export default Map;

"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  center: { lat: number; lng: number };
  radius: number;
  onCenterChange: (center: { lat: number; lng: number }) => void;
  results: any[];
}

function MapEvents({ onCenterChange }: { onCenterChange: (center: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onCenterChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function MapComponent({ center, radius, onCenterChange, results }: MapProps) {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border border-border shadow-sm relative z-0">
      <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapEvents onCenterChange={onCenterChange} />

        {/* Search Radius Circle */}
        <Circle center={[center.lat, center.lng]} radius={radius} pathOptions={{ color: 'hsl(var(--primary))', fillColor: 'hsl(var(--primary))', fillOpacity: 0.1 }} />
        
        {/* Origin Marker */}
        <Marker position={[center.lat, center.lng]} opacity={0.6}>
          <Popup>Search Origin</Popup>
        </Marker>

        {/* Result Markers */}
        {results.map((biz) => {
          if (biz.location && biz.location.latitude && biz.location.longitude) {
            return (
              <Marker key={biz.id} position={[biz.location.latitude, biz.location.longitude]}>
                <Popup>
                  <div className="font-semibold text-sm">{biz.displayName?.text || biz.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{biz.formattedAddress || biz.address}</div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
}

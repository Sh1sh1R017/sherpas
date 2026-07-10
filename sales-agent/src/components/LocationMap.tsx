"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path issues with Next.js/Webpack
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

interface LocationMapProps {
  center: [number, number];
  onLocationChange: (lat: number, lng: number) => void;
}

export default function LocationMap({ center, onLocationChange }: LocationMapProps) {
  const [position, setPosition] = useState<[number, number]>(center);
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    setPosition(center);
  }, [center]);

  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const { lat, lng } = marker.getLatLng();
      setPosition([lat, lng]);
      onLocationChange(lat, lng);
    }
  };

  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden border border-border z-0">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full relative z-0"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={position} />
        <Marker
          draggable={true}
          eventHandlers={{ dragend: handleDragEnd }}
          position={position}
          ref={markerRef}
        />
      </MapContainer>
    </div>
  );
}

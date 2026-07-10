"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-md border border-border bg-secondary animate-pulse flex items-center justify-center">
      <span className="text-sm text-muted-foreground">Loading interactive map...</span>
    </div>
  ),
});

const LOCATIONS = {
  "Nepal": [
    { name: "Kathmandu", coords: [27.7172, 85.3240] },
    { name: "Biratnagar", coords: [26.4525, 87.2718] },
    { name: "Pokhara", coords: [28.2096, 83.9856] },
  ],
  "USA": [
    { name: "New York", coords: [40.7128, -74.0060] },
    { name: "San Francisco", coords: [37.7749, -122.4194] },
    { name: "Austin", coords: [30.2672, -97.7431] },
  ],
  "UK": [
    { name: "London", coords: [51.5074, -0.1278] },
    { name: "Manchester", coords: [53.4808, -2.2426] },
  ],
  "Australia": [
    { name: "Sydney", coords: [-33.8688, 151.2093] },
    { name: "Melbourne", coords: [-37.8136, 144.9631] },
  ],
} as const;

type Country = keyof typeof LOCATIONS;

export function LocationPicker() {
  const [country, setCountry] = useState<Country>("Nepal");
  const [city, setCity] = useState<{ name: string; coords: readonly [number, number] }>(LOCATIONS["Nepal"][0]);
  const [customCoords, setCustomCoords] = useState<[number, number] | null>(null);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value as Country;
    setCountry(selectedCountry);
    setCity(LOCATIONS[selectedCountry][0]);
    setCustomCoords(null);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityName = e.target.value;
    const selectedCity = LOCATIONS[country].find(c => c.name === selectedCityName);
    if (selectedCity) {
      setCity(selectedCity);
      setCustomCoords(null);
    }
  };

  const handleMapDrag = (lat: number, lng: number) => {
    setCustomCoords([lat, lng]);
  };

  const currentCoords = customCoords || city.coords;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country-select" className="block text-sm font-medium mb-1.5">
            Country
          </label>
          <select
            id="country-select"
            value={country}
            onChange={handleCountryChange}
            className="block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {Object.keys(LOCATIONS).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city-select" className="block text-sm font-medium mb-1.5">
            City/Region
          </label>
          <select
            id="city-select"
            value={city.name}
            onChange={handleCityChange}
            className="block w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {LOCATIONS[country].map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-1.5">Exact Location</p>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop the map pin to pinpoint your exact location.
        </p>
        
        <LocationMap 
          center={city.coords as [number, number]} 
          onLocationChange={handleMapDrag} 
        />
        
        {customCoords && (
          <p className="mt-4 text-sm font-mono text-muted-foreground bg-muted p-2 rounded-md inline-block">
            Coordinates: {customCoords[0].toFixed(5)}, {customCoords[1].toFixed(5)}
          </p>
        )}
      </div>
    </div>
  );
}

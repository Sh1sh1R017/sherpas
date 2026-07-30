"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CountryCode,
  GEO_DICTIONARY,
  GeoData,
  INDUSTRY_DICTIONARY,
  IndustryData,
  detectGeo,
} from "@/lib/geo";

interface GeoContextType {
  geo: GeoData;
  countryCode: CountryCode;
  industry: IndustryData | null;
  setCountryCode: (code: CountryCode) => void;
  setIndustryId: (id: string | null) => void;
  isReturningVisitor: boolean;
}

const GeoContext = createContext<GeoContextType>({
  geo: GEO_DICTIONARY.US,
  countryCode: "US",
  industry: null,
  setCountryCode: () => {},
  setIndustryId: () => {},
  isReturningVisitor: false,
});

export function GeoProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [industryId, setIndustryId] = useState<string | null>(null);
  const [isReturningVisitor, setIsReturningVisitor] = useState<boolean>(false);

  useEffect(() => {
    // Detect Geo
    const detected = detectGeo();
    setCountryCode(detected);

    // Check returning visitor
    const visits = localStorage.getItem("sherpas_visit_count");
    if (visits) {
      const count = parseInt(visits, 10);
      localStorage.setItem("sherpas_visit_count", String(count + 1));
      if (count >= 1) {
        setIsReturningVisitor(true);
      }
    } else {
      localStorage.setItem("sherpas_visit_count", "1");
    }

    // Check URL parameters for industry (?industry=healthcare) or pathname
    const searchParams = new URLSearchParams(window.location.search);
    const indParam = searchParams.get("industry");
    const path = window.location.pathname.replace("/", "");

    if (indParam && INDUSTRY_DICTIONARY[indParam]) {
      setIndustryId(indParam);
    } else if (path && INDUSTRY_DICTIONARY[path]) {
      setIndustryId(path);
    }
  }, []);

  const geo = GEO_DICTIONARY[countryCode] || GEO_DICTIONARY.US;
  const industry = industryId ? INDUSTRY_DICTIONARY[industryId] || null : null;

  return (
    <GeoContext.Provider
      value={{
        geo,
        countryCode,
        industry,
        setCountryCode,
        setIndustryId,
        isReturningVisitor,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
}

export function useGeo() {
  return useContext(GeoContext);
}

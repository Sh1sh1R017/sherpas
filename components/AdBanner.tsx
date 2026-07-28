"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  adKey: string;
  format?: string;
  height: number;
  width: number;
  className?: string;
}

export function AdBanner({
  adKey,
  format = "iframe",
  height,
  width,
  className = "",
}: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    // Set options on window object for Adsterra script
    (window as any).atOptions = {
      key: adKey,
      format,
      height,
      width,
      params: {},
    };

    const script = document.createElement("script");
    script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;

    container.appendChild(script);
  }, [adKey, format, height, width]);

  return (
    <div
      ref={containerRef}
      className={`flex justify-center items-center overflow-hidden my-4 ${className}`}
      style={{ minHeight: `${height}px` }}
    />
  );
}

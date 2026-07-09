"use client";

import React, { useEffect } from 'react';

interface AdSenseProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: string;
}

export function AdSenseAd({
  client,
  slot,
  format = 'auto',
  responsive = 'true',
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Ensure the adsbygoogle array exists before pushing
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      // Prevents crashes if an ad blocker blocks the script
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className="ad-container w-full min-h-[100px] flex justify-center items-center overflow-hidden my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

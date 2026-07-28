"use client";

import Script from "next/script";

export function AdNetworkScripts() {
  return (
    <>
      <Script
        src="https://pl30569639.effectivecpmnetwork.com/a2/41/10/a24110a61bd7de8750e5c9d16fcf9846.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://pl30569640.effectivecpmnetwork.com/d4/0e/60/d40e60975b4c56e20999eedf9ca9f134.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://pl30569642.effectivecpmnetwork.com/6431f3c3a8811f121536dba3afd65859/invoke.js"
        strategy="lazyOnload"
        data-cfasync="false"
      />
    </>
  );
}

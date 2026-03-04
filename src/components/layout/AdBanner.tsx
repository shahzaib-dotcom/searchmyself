'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner({
  slot,
  format = 'auto',
  className = '',
}: {
  slot: string;
  format?: string;
  className?: string;
}) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!pushed.current && process.env.NEXT_PUBLIC_ADSENSE_CLIENT) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch {
        // AdSense not loaded yet
      }
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) {
    return null;
  }

  return (
    <div className={`ad-container flex justify-center my-6 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export const SPLASH_SESSION_KEY = 'nagarmitra_splash_shown';

/**
 * Opening Splash Animation for Nagarmitra
 * Displays only once per browser session.
 * Features existing emerald seal logo, high-contrast typography, and smooth fade-out.
 */
export default function SplashScreen({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Record in sessionStorage immediately so subsequent reloads or navigations do not re-trigger
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, 'true');
    } catch {
      // ignore storage restriction if cookies/storage disabled
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Total display duration before initiating smooth fade-out
    const displayDuration = prefersReducedMotion ? 400 : 1400;
    const fadeDuration = prefersReducedMotion ? 200 : 500;

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, displayDuration);

    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, displayDuration + fadeDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`nagarmitra-splash-overlay ${isFadingOut ? 'fading-out' : ''}`}
      aria-hidden={isFadingOut}
      role="dialog"
      aria-label="Welcome to Nagarmitra"
    >
      <div className="nagarmitra-splash-content">
        {/* Existing Nagarmitra Emerald Seal with Civic Sprout Icon */}
        <div className="nagarmitra-splash-seal" title="Nagarmitra">
          🌱
        </div>
        
        {/* Brand Title */}
        <h1 className="nagarmitra-splash-title">Nagarmitra</h1>
        
        {/* Existing Official Tagline */}
        <p className="nagarmitra-splash-tagline">Stronger Cities. Happier Communities.</p>
      </div>
    </div>
  );
}

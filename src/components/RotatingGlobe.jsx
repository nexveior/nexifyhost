import React from 'react';

export default function RotatingGlobe({ size = 200 }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      }}
    >
      {/* Outer Atmospheric Glow Ring */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(124, 58, 237, 0.15) 60%, transparent 80%)',
          filter: 'blur(10px)',
          animation: 'pulseGlow 3s ease-in-out infinite alternate'
        }}
      />

      {/* Orbiting Ring 1 */}
      <div
        style={{
          position: 'absolute',
          width: '115%',
          height: '115%',
          borderRadius: '50%',
          border: '1px dashed rgba(0, 242, 254, 0.4)',
          transform: 'rotateX(70deg) rotateY(20deg)',
          animation: 'orbitSpin1 14s linear infinite'
        }}
      />

      {/* Orbiting Ring 2 */}
      <div
        style={{
          position: 'absolute',
          width: '125%',
          height: '125%',
          borderRadius: '50%',
          border: '1px solid rgba(124, 58, 237, 0.35)',
          transform: 'rotateX(60deg) rotateY(-40deg)',
          animation: 'orbitSpin2 18s linear infinite reverse'
        }}
      />

      {/* Main Spinning Wireframe Globe SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{
          filter: 'drop-shadow(0 0 16px rgba(0, 242, 254, 0.6))',
          animation: 'globeRotate 12s linear infinite'
        }}
      >
        <defs>
          <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#070a12" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* Globe Sphere Base */}
        <circle cx="50" cy="50" r="45" fill="url(#globeGrad)" stroke="rgba(0, 242, 254, 0.6)" strokeWidth="1.2" />

        {/* Equator & Latitude Lines */}
        <ellipse cx="50" cy="50" rx="45" ry="12" fill="none" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="0.8" strokeDasharray="3 2" />
        <ellipse cx="50" cy="50" rx="45" ry="28" fill="none" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="0.7" />
        <ellipse cx="50" cy="50" rx="45" ry="38" fill="none" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="0.6" />

        {/* Longitude Lines */}
        <ellipse cx="50" cy="50" rx="14" ry="45" fill="none" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="0.8" />
        <ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="0.7" strokeDasharray="4 2" />
        <ellipse cx="50" cy="50" rx="40" ry="45" fill="none" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="0.6" />

        {/* Pulsing Node Location Pins */}
        <circle cx="35" cy="38" r="2.5" fill="#00f2fe" />
        <circle cx="65" cy="42" r="2.5" fill="#10b981" />
        <circle cx="50" cy="62" r="2.5" fill="#7c3aed" />
        <circle cx="42" cy="28" r="2.5" fill="#f59e0b" />
      </svg>
    </div>
  );
}

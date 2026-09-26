import { useEffect, useRef, useState } from "react";
import { locations } from "../data/config";

/**
 * Lightweight canvas dot-globe (cobe-style render).
 * Fully fluid — measures its container with ResizeObserver and renders
 * crisply at any width, capping at `maxSize`. Colors adapt to the theme.
 */
export default function Globe({ dark = true, maxSize = 460 }: { dark?: boolean; maxSize?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState(0);

  /* fluid sizing */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width);
      setSize((prev) => {
        const next = Math.min(w, maxSize);
        return prev === next ? prev : next;
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxSize]);

  /* render loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const R = size * 0.38 * dpr;
    const cx = (size / 2) * dpr;
    const cy = (size / 2) * dpr;

    /* theme palette */
    const dotRGB = dark ? "96,165,250" : "37,99,235";
    const dotBase = dark ? 0.08 : 0.12;
    const dotRange = dark ? 0.35 : 0.42;
    const markerCore = dark ? "147,197,253" : "29,78,216";

    /* fibonacci sphere points */
    const POINTS = size < 340 ? 600 : 900; // fewer points on tiny screens = smoother
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINTS; i++) {
      const y = 1 - (i / (POINTS - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
    }

    /* markers from config (lat/lng -> xyz) */
    const toXYZ = (lat: number, lng: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return {
        x: -Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    };
    const markers = locations.markers.map((m) => toXYZ(m.lat, m.lng));

    let rot = 0;
    let raf = 0;
    let t = 0;

    const render = () => {
      t += 0.016;
      rot += 0.0026;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);

      /* dots */
      for (const p of pts) {
        const x = p.x * cosR - p.z * sinR;
        const z = p.x * sinR + p.z * cosR;
        if (z < -0.15) continue; // back side
        const px = cx + x * R;
        const py = cy + p.y * R;
        const depth = (z + 1) / 2;
        const alpha = dotBase + depth * dotRange;
        const s = (0.7 + depth * 1.1) * dpr;
        ctx.beginPath();
        ctx.arc(px, py, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRGB},${alpha})`;
        ctx.fill();
      }

      /* markers */
      for (const m of markers) {
        const x = m.x * cosR - m.z * sinR;
        const z = m.x * sinR + m.z * cosR;
        if (z < -0.05) continue;
        const px = cx + x * R;
        const py = cy + m.y * R;
        const depth = (z + 1) / 2;

        /* pulse ring */
        const pulse = ((t * 0.7) % 1) * 14 * dpr;
        ctx.beginPath();
        ctx.arc(px, py, 4 * dpr + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59,130,246,${(1 - pulse / (14 * dpr)) * 0.5 * depth})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();

        /* core */
        ctx.beginPath();
        ctx.arc(px, py, (2.4 + depth * 1.4) * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${markerCore},${0.5 + depth * 0.5})`;
        ctx.shadowColor = "rgba(59,130,246,0.9)";
        ctx.shadowBlur = 8 * dpr;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [size, dark]);

  return (
    <div ref={wrapRef} className="w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[460px] mx-auto aspect-square">
      {size > 0 && (
        <canvas
          ref={canvasRef}
          className="select-none"
          aria-label="Rotating globe with datacenter markers"
        />
      )}
    </div>
  );
}

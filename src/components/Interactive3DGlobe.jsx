import React, { useRef, useEffect, useState } from 'react';
import { Server, Activity, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';

const NODE_LOCATIONS = [
  { id: 'us-east', name: 'North America East', city: 'Ashburn, VA', lat: 39.04, lon: -77.48, ping: 12, region: 'US-EAST-1', status: 'Operational' },
  { id: 'eu-central', name: 'Europe Central', city: 'Frankfurt, DE', lat: 50.11, lon: 8.68, ping: 14, region: 'EU-CENTRAL-1', status: 'Operational' },
  { id: 'ap-south', name: 'Asia Pacific', city: 'Mumbai, IN', lat: 19.07, lon: 72.87, ping: 11, region: 'AP-SOUTH-1', status: 'Operational' },
  { id: 'ap-southeast', name: 'Southeast Asia', city: 'Singapore', lat: 1.35, lon: 103.81, ping: 15, region: 'AP-SOUTHEAST-1', status: 'Operational' },
  { id: 'ap-oceania', name: 'Oceania', city: 'Sydney, AU', lat: -33.86, lon: 151.20, ping: 16, region: 'AP-SOUTHEAST-2', status: 'Operational' }
];

export default function Interactive3DGlobe({ livePing = 12 }) {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(NODE_LOCATIONS[0]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const rotationRef = useRef({ rotX: 0.3, rotY: 0.8, velX: 0, velY: 0.003 });
  const mouseRef = useRef({ lastX: 0, lastY: 0 });

  // Convert Lat/Lon to 3D Cartesian coordinates on sphere radius R
  const latLonToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return { x, y, z };
  };

  // Rotate 3D vector around Y and X axes
  const rotateVector = (v, rotX, rotY) => {
    // Rotate around Y
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    let x1 = v.x * cosY - v.z * sinY;
    let z1 = v.x * sinY + v.z * cosY;
    let y1 = v.y;

    // Rotate around X
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;
    let x2 = x1;

    return { x: x2, y: y2, z: z2 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) * 0.34;
    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const state = rotationRef.current;
      if (!isDragging) {
        state.rotY += state.velY;
      }

      // 1. Draw Outer Atmospheric Glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.35);
      glowGrad.addColorStop(0, 'rgba(0, 242, 254, 0.15)');
      glowGrad.addColorStop(0.5, 'rgba(124, 58, 237, 0.1)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Sphere Base Body
      const sphereGrad = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1, centerX, centerY, radius);
      sphereGrad.addColorStop(0, 'rgba(18, 26, 44, 0.95)');
      sphereGrad.addColorStop(0.75, 'rgba(8, 12, 22, 0.98)');
      sphereGrad.addColorStop(1, 'rgba(0, 242, 254, 0.4)');

      ctx.fillStyle = sphereGrad;
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 3. Draw 3D Grid (Latitude Lines)
      ctx.lineWidth = 0.8;
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.strokeStyle = lat === 0 ? 'rgba(0, 242, 254, 0.45)' : 'rgba(0, 242, 254, 0.18)';
        ctx.beginPath();
        let first = true;

        for (let lon = 0; lon <= 360; lon += 5) {
          const pt3d = latLonToVector3(lat, lon, radius);
          const rotPt = rotateVector(pt3d, state.rotX, state.rotY);

          if (rotPt.z > 0) { // Front hemisphere
            const screenX = centerX + rotPt.x;
            const screenY = centerY + rotPt.y;

            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 4. Draw 3D Grid (Longitude Lines)
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
        ctx.beginPath();
        let first = true;

        for (let lat = -90; lat <= 90; lat += 5) {
          const pt3d = latLonToVector3(lat, lon, radius);
          const rotPt = rotateVector(pt3d, state.rotX, state.rotY);

          if (rotPt.z > 0) {
            const screenX = centerX + rotPt.x;
            const screenY = centerY + rotPt.y;

            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 5. Draw 3D Interactive Node Markers
      NODE_LOCATIONS.forEach((node) => {
        const pt3d = latLonToVector3(node.lat, node.lon, radius);
        const rotPt = rotateVector(pt3d, state.rotX, state.rotY);

        if (rotPt.z > 0) { // Only visible on front facing side
          const screenX = centerX + rotPt.x;
          const screenY = centerY + rotPt.y;
          const isSel = selectedNode && selectedNode.id === node.id;
          const isHov = hoveredNode && hoveredNode.id === node.id;

          // Pulsing Glow aura
          ctx.fillStyle = isSel ? 'rgba(16, 185, 129, 0.35)' : 'rgba(0, 242, 254, 0.3)';
          ctx.beginPath();
          ctx.arc(screenX, screenY, isSel ? 16 : 11, 0, Math.PI * 2);
          ctx.fill();

          // Outer Ring
          ctx.strokeStyle = isSel ? '#10b981' : isHov ? '#ffffff' : '#00f2fe';
          ctx.lineWidth = isSel ? 2.5 : 1.5;
          ctx.beginPath();
          ctx.arc(screenX, screenY, isSel ? 10 : 7, 0, Math.PI * 2);
          ctx.stroke();

          // Center Solid Pin
          ctx.fillStyle = isSel ? '#10b981' : '#00f2fe';
          ctx.beginPath();
          ctx.arc(screenX, screenY, isSel ? 5 : 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Text Label
          ctx.font = '11px "JetBrains Mono", monospace';
          ctx.fillStyle = isSel ? '#10b981' : '#ffffff';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 4;
          ctx.fillText(`${node.city} (${node.ping}ms)`, screenX + 12, screenY + 4);
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, selectedNode, hoveredNode]);

  // Mouse Interaction Handlers for Dragging Globe
  const handleMouseDown = (e) => {
    setIsDragging(true);
    mouseRef.current = { lastX: e.clientX, lastY: e.clientY };
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) * 0.34;
    const centerX = width / 2;
    const centerY = height / 2;

    // Check hover state over node pins
    let hovered = null;
    NODE_LOCATIONS.forEach((node) => {
      const pt3d = latLonToVector3(node.lat, node.lon, radius);
      const rotPt = rotateVector(pt3d, rotationRef.current.rotX, rotationRef.current.rotY);
      if (rotPt.z > 0) {
        const screenX = centerX + rotPt.x;
        const screenY = centerY + rotPt.y;
        const dist = Math.hypot(x - screenX, y - screenY);
        if (dist < 18) hovered = node;
      }
    });

    setHoveredNode(hovered);
    if (canvas) canvas.style.cursor = hovered ? 'pointer' : isDragging ? 'grabbing' : 'grab';

    if (isDragging) {
      const deltaX = e.clientX - mouseRef.current.lastX;
      const deltaY = e.clientY - mouseRef.current.lastY;

      rotationRef.current.rotY += deltaX * 0.008;
      rotationRef.current.rotX += deltaY * 0.008;

      // Clamp X rotation to avoid flip upside down
      rotationRef.current.rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotationRef.current.rotX));

      mouseRef.current = { lastX: e.clientX, lastY: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    if (hoveredNode) {
      setSelectedNode(hoveredNode);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          height: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto'
        }}
      >
        <canvas
          ref={canvasRef}
          width={520}
          height={420}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 14, 26, 0.85)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            padding: '6px 14px',
            borderRadius: '50px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Navigation size={13} color="var(--primary)" /> Drag with mouse to rotate 3D Globe & inspect nodes
        </div>
      </div>

      {/* Selected Node Details Card */}
      {selectedNode && (
        <div
          style={{
            width: '100%',
            maxWidth: '650px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem 2rem',
            marginTop: '1.5rem',
            boxShadow: '0 10px 30px rgba(0, 242, 254, 0.12)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                <Server size={22} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#fff' }}>{selectedNode.name}</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Location: <strong>{selectedNode.city}</strong> ({selectedNode.region})</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Response Latency</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--success)', fontWeight: 800 }}>{selectedNode.ping}ms</div>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: 'var(--success)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0.4rem 0.9rem',
                  borderRadius: '50px'
                }}
              >
                <CheckCircle2 size={14} /> {selectedNode.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

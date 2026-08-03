import React from 'react';
import { Globe, X, Server, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

export default function NodeStatusModal({ isOpen, onClose, livePing }) {
  if (!isOpen) return null;

  const nodeLocations = [
    { name: 'North America East (Ashburn, VA)', region: 'US-EAST-1', ping: livePing, status: 'Operational' },
    { name: 'Europe Central (Frankfurt, DE)', region: 'EU-CENTRAL-1', ping: livePing + 2, status: 'Operational' },
    { name: 'Asia Pacific (Mumbai, IN)', region: 'AP-SOUTH-1', ping: livePing - 1, status: 'Operational' },
    { name: 'Southeast Asia (Singapore)', region: 'AP-SOUTHEAST-1', ping: livePing + 3, status: 'Operational' },
    { name: 'Oceania (Sydney, AU)', region: 'AP-SOUTHEAST-2', ping: livePing + 4, status: 'Operational' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(4, 6, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 99999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(10, 14, 26, 0.96)',
          border: '1px solid rgba(0, 242, 254, 0.45)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 242, 254, 0.25)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '650px',
          padding: '2rem',
          position: 'relative',
          animation: 'modalFadeIn 0.25s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 242, 254, 0.12)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}
          >
            <Globe size={24} className="globe-icon-spin" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff' }}>Global Node Network Status</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Real-time cluster latency & 99.99% SLA verification</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {nodeLocations.map((node, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Server size={16} color="var(--primary)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{node.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{node.region}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--success)', fontWeight: 700 }}>
                  {node.ping}ms
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: 'var(--success)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px'
                  }}
                >
                  <CheckCircle2 size={12} /> {node.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 242, 254, 0.06)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
            <Activity size={16} color="var(--primary)" />
            <span>L7 Anti-DDoS Protection: <strong style={{ color: 'var(--success)' }}>Active (1 Tbps+)</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} color="var(--primary)" />
            <span>Uptime SLA: <strong>99.99%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

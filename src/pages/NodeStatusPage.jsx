import React from 'react';
import { Globe, Server, CheckCircle2, ShieldCheck, Activity, Cpu } from 'lucide-react';
import Interactive3DGlobe from '../components/Interactive3DGlobe.jsx';

export default function NodeStatusPage({ livePing }) {
  const nodeLocations = [
    { name: 'North America East (Ashburn, VA)', region: 'US-EAST-1', ping: livePing, status: 'Operational', cpuLoad: '14%', ramUsage: '22%' },
    { name: 'Europe Central (Frankfurt, DE)', region: 'EU-CENTRAL-1', ping: livePing + 2, status: 'Operational', cpuLoad: '18%', ramUsage: '28%' },
    { name: 'Asia Pacific (Mumbai, IN)', region: 'AP-SOUTH-1', ping: livePing - 1, status: 'Operational', cpuLoad: '12%', ramUsage: '19%' },
    { name: 'Southeast Asia (Singapore)', region: 'AP-SOUTHEAST-1', ping: livePing + 3, status: 'Operational', cpuLoad: '16%', ramUsage: '24%' },
    { name: 'Oceania (Sydney, AU)', region: 'AP-SOUTHEAST-2', ping: livePing + 4, status: 'Operational', cpuLoad: '21%', ramUsage: '31%' }
  ];

  return (
    <section style={{ padding: '4rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <div className="status-online-pill" style={{ marginBottom: '1.25rem' }}>
            <span className="pulse-dot"></span>
            <span>SYSTEM ONLINE (99.99% Uptime SLA)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '0.75rem' }}>
            <Globe size={32} color="var(--primary)" className="globe-icon-spin" />
            <h2 className="section-title" style={{ marginBottom: 0 }}>Interactive 3D Node Map</h2>
          </div>
          <p className="section-desc">
            Drag to rotate the 3D globe and click on any node location pin to inspect real-time cluster metrics.
          </p>
        </div>

        {/* Interactive 3D Rotatable Globe */}
        <div style={{ marginBottom: '3.5rem' }}>
          <Interactive3DGlobe livePing={livePing} />
        </div>

        {/* Global Overview Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center' }}>
            <Activity size={28} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Network Uptime</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', fontWeight: 800 }}>99.99% SLA</div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center' }}>
            <Globe size={28} color="var(--primary)" className="globe-icon-spin" style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Average Global Ping</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', color: 'var(--success)', fontWeight: 800 }}>{livePing}ms</div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center' }}>
            <ShieldCheck size={28} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>L7 DDoS Protection</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', fontWeight: 800 }}>1 Tbps+ Shield</div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center' }}>
            <Cpu size={28} color="var(--warning)" style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Node Hardware</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff', fontWeight: 800, marginTop: '0.2rem' }}>AMD Ryzen 9 7950X</div>
          </div>
        </div>

        {/* Regional Node Location Breakdown */}
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: '#fff', marginBottom: '1.25rem' }}>
          🌐 Regional Cluster Breakdown
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
          {nodeLocations.map((node, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Server size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>{node.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{node.region}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CPU / RAM Load</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#fff' }}>{node.cpuLoad} / {node.ramUsage}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Ping</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--success)', fontWeight: 800 }}>{node.ping}ms</div>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    color: 'var(--success)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '50px'
                  }}
                >
                  <CheckCircle2 size={14} /> {node.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Discord Support Ticket */}
        <div style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-glow)', padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', color: '#fff' }}>Questions About Our Cluster Performance?</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Open a ticket on Discord to speak directly with our infrastructure engineering team.</p>
          <a href="https://discord.gg/hMeGraR7nc" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Open Discord Support Ticket
          </a>
        </div>
      </div>
    </section>
  );
}

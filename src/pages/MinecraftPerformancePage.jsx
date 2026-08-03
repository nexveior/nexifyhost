import React from 'react';
import { Cpu, HardDrive, Server, ShieldCheck, Zap, ExternalLink, MessageSquare } from 'lucide-react';

export default function MinecraftPerformancePage({ formatPrice, plansData }) {
  const plans = plansData['minecraft-performance'] || [];

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" style={{ color: 'var(--secondary)' }}>// PERFORMANCE PROWESS</span>
          <h2 className="section-title">Minecraft Performance Hosting Plans</h2>
          <p className="section-desc">Overclocked node hardware, Defcon thread priority, and lethal computing architecture designed for heavy ticks.</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, idx) => (
            <div key={idx} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && (
                <span style={{ position: 'absolute', top: '-12px', right: '20px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.85rem', borderRadius: '50px' }}>
                  MOST POPULAR
                </span>
              )}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-desc">{plan.desc}</p>
              <div className="plan-price-box">
                <span className="price-val">{formatPrice(plan.basePriceUSD)}</span>
              </div>
              <ul className="plan-features">
                <li><Cpu size={15} /> {plan.cpu}</li>
                <li><HardDrive size={15} /> {plan.ram}</li>
                <li><Server size={15} /> {plan.disk}</li>
                <li><ShieldCheck size={15} /> Enterprise DDoS Shield</li>
                <li><Zap size={15} /> 24/7 Uptime Guaranteed</li>
              </ul>
              <a
                href="https://discord.gg/hMeGraR7nc"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
              >
                Purchase via Discord Ticket <ExternalLink size={14} />
              </a>
              <p className="ticket-note">Open a ticket in Discord channel to order or request custom specs</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-glow)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', color: '#fff' }}>Custom Prowess Architecture</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Coordinate with an engineering dispatcher to review custom parameters across selected global clusters.</p>
          <a href="https://discord.gg/hMeGraR7nc" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageSquare size={16} /> Open Ticket in Discord Channel
          </a>
        </div>
      </div>
    </section>
  );
}

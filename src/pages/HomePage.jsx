import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Cpu, Clock, Server, Box, Bot, Star, MessageSquare } from 'lucide-react';

export default function HomePage({ setCurrentPage, formatPrice }) {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="status-online-pill" style={{ marginBottom: '1.25rem' }}>
                <span className="pulse-dot"></span>
                <span>Ultra Low-Latency Global Network</span>
              </div>
              <h1>
                Powerful Hosting.<br />
                <span className="text-gradient">Limitless Possibilities.</span>
              </h1>
              <p>
                High-performance Minecraft, KVM Cloud VPS, and Discord Bot hosting powered by enterprise AMD Ryzen 9 7950X nodes, NVMe Gen4 storage, and 1 Tbps+ DDoS protection.
              </p>

              <div className="hero-badges">
                <div className="badge-item">
                  <Cpu size={16} color="var(--primary)" />
                  <span>AMD Ryzen 9 7950X (5.7GHz)</span>
                </div>
                <div className="badge-item">
                  <Zap size={16} color="var(--secondary)" />
                  <span>DDR5 RAM & Gen4 NVMe</span>
                </div>
                <div className="badge-item">
                  <ShieldCheck size={16} color="var(--success)" />
                  <span>L7 Anti-DDoS Defense</span>
                </div>
                <div className="badge-item">
                  <Clock size={16} color="var(--warning)" />
                  <span>Instant Ticket Setup</span>
                </div>
              </div>

              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => setCurrentPage('minecraft-budget')}>
                  <Zap size={18} /> Explore Minecraft Budget
                </button>
                <button className="btn btn-secondary" onClick={() => setCurrentPage('minecraft-performance')}>
                  <ArrowRight size={18} /> Explore Performance Tiers
                </button>
                <button className="btn btn-secondary" onClick={() => setCurrentPage('feedbacks')}>
                  <Star size={18} fill="#00b67a" color="#00b67a" /> Submit A Review
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <img
                src="/nexify_banner.png"
                alt="Nexify Host Powerful Game and VPS Hosting Banner"
                className="hero-banner-preview"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services / Categories Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">// OUR PLATFORM</span>
            <h2 className="section-title">High-Speed Server Categories</h2>
            <p className="section-desc">
              Choose from our specialized hosting architectures. All plans include 24/7 support and enterprise L7 protection.
            </p>
          </div>

          <div className="plans-grid">
            <div className="plan-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1rem' }}>
                <Box size={24} />
              </div>
              <h3 className="plan-name">Minecraft Budget</h3>
              <p className="plan-desc">Baseline architecture engineered for private staging setups, vanilla multiplayer, and production plugin networks starting from <strong>{formatPrice(0.99)}</strong>.</p>
              <button className="btn btn-primary" style={{ marginTop: 'auto' }} onClick={() => setCurrentPage('minecraft-budget')}>
                View Budget Plans <ArrowRight size={16} />
              </button>
            </div>

            <div className="plan-card featured">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', marginBottom: '1rem' }}>
                <Zap size={24} />
              </div>
              <h3 className="plan-name">Minecraft Performance</h3>
              <p className="plan-desc">High-priority overclocked computing architecture tailored for heavy modpacks and massive player communities starting from <strong>{formatPrice(2.50)}</strong>.</p>
              <button className="btn btn-primary" style={{ marginTop: 'auto' }} onClick={() => setCurrentPage('minecraft-performance')}>
                View Performance Plans <ArrowRight size={16} />
              </button>
            </div>

            <div className="plan-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(88, 101, 242, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5865f2', marginBottom: '1rem' }}>
                <Bot size={24} />
              </div>
              <h3 className="plan-name">Discord Bot Hosting</h3>
              <p className="plan-desc">Dedicated runtime environment for Node.js, Python, Java, Bun, Deno, and Go bots starting from <strong>{formatPrice(0.60)}</strong>.</p>
              <button className="btn btn-primary" style={{ marginTop: 'auto' }} onClick={() => setCurrentPage('discord-bot')}>
                View Bot Plans <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Submit A Review Banner CTA Section */}
      <section style={{ padding: '3rem 0 5rem' }}>
        <div className="container">
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-xl)',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 15px 45px rgba(0, 242, 254, 0.12)'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '0.75rem' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} fill="#00b67a" color="#00b67a" />
              ))}
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
              Loved Your Hosting Experience?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
              Share your feedback with our global gaming community on our verified Trustpilot Review Portal.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCurrentPage('feedbacks');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Star size={18} fill="#fff" color="#fff" /> Submit A Review
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

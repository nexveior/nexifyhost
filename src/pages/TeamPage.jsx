import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function TeamPage() {
  return (
    <section className="team-section" style={{ paddingTop: '5rem', minHeight: '70vh' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag" style={{ color: 'var(--danger)' }}>// LEADERSHIP</span>
          <h2 className="section-title">Engineering Leadership</h2>
          <p className="section-desc">Meet the Founder and engineers behind Nexify Host cluster infrastructure.</p>
        </div>

        <div className="team-grid">
          <div className="team-card">
            {/* Founder nexxy using RED LOGO asset */}
            <img src="/logo_red.jpg" alt="Founder nexxy Red Logo Avatar" className="team-avatar-img" />
            <div className="team-name">nexxy</div>
            <div className="team-role">FOUNDER & CEO</div>
            <p className="team-bio">
              Chief Architect behind Nexify Host cluster infrastructure, high-tick Ryzen performance tuning, and 24/7 security operations.
            </p>
            <a
              href="https://discord.gg/hMeGraR7nc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1.5rem' }}
            >
              <MessageSquare size={14} /> Connect on Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

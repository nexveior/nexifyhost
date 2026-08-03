import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <section style={{ padding: '5rem 0', minHeight: '65vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header">
          <span className="section-tag">// ABOUT US</span>
          <h2 className="section-title">Built for Peak Reliability</h2>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', lineHeight: '1.8' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '1rem' }}>Who We Are</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Nexify Host is a next-generation game server, VPS, and cloud hosting provider founded by <strong>nexxy</strong>. Built with a commitment to unyielding single-thread clock speeds, enterprise Gen4 NVMe storage arrays, and 1 Tbps+ Layer 7 DDoS Protection.
          </p>

          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '1rem' }}>Our Mission</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            To empower gamers, bot developers, and enterprise communities with high-availability infrastructure at transparent, accessible pricing across low-latency global clusters.
          </p>

          <a
            href="https://discord.gg/hMeGraR7nc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Join Our Discord Community <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

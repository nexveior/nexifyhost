import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  return (
    <section style={{ padding: '5rem 0', minHeight: '65vh' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        <div className="section-header">
          <span className="section-tag" style={{ color: 'var(--warning)' }}>// 24/7 SUPPORT</span>
          <h2 className="section-title">Contact Support Dispatch</h2>
          <p className="section-desc">Our engineering team processes custom plan requests and technical tickets 24/7 via Discord.</p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', textAlign: 'center' }}>
          <MessageSquare style={{ width: '60px', height: '60px', color: 'var(--primary)', marginBottom: '1rem' }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '1rem' }}>Open a Discord Ticket</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            To purchase any plan or discuss bespoke hardware parameters, click below to open a ticket in our official Discord server.
          </p>
          <a
            href="https://discord.gg/hMeGraR7nc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Open Ticket on Discord <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

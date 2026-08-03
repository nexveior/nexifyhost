import React from 'react';

export default function TermsPage() {
  return (
    <section style={{ padding: '5rem 0', minHeight: '65vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header">
          <span className="section-tag">// LEGAL & SLA</span>
          <h2 className="section-title">Terms and Conditions</h2>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '1rem' }}>1. Service Agreement</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            By purchasing hardware resources or using services provided by Nexify Host, you agree to comply with our network usage policies and acceptable use guidelines.
          </p>

          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '1rem' }}>2. Uptime Guarantee SLA</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Nexify Host guarantees 99.99% network uptime across our global cluster nodes. Scheduled maintenance periods will be communicated in advance via Discord announcements.
          </p>

          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '1rem' }}>3. Anti-DDoS & Acceptable Use</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            All nodes feature automated 1 Tbps+ Layer 7 DDoS mitigation. Running malicious code, port scanning, or unauthorized stress testing is strictly prohibited and will result in immediate service suspension.
          </p>
        </div>
      </div>
    </section>
  );
}

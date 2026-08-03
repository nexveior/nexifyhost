import React, { useState } from 'react';
import { Globe, Shield, Zap, Search, ArrowRight, CheckCircle2, Lock, Cpu, Server, MessageSquare } from 'lucide-react';

export default function DomainsPage({ formatPrice }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const domainCategories = [
    {
      title: 'Budget & Popular Arrays',
      icon: <Zap color="var(--primary)" size={20} />,
      tlds: [
        { ext: '.fun', priceUSD: 1.49, popular: true },
        { ext: '.xyz', priceUSD: 1.99, popular: true },
        { ext: '.site', priceUSD: 2.49, popular: false },
        { ext: '.shop', priceUSD: 2.99, popular: false }
      ]
    },
    {
      title: 'Commercial Extensions',
      icon: <Server color="var(--secondary)" size={20} />,
      tlds: [
        { ext: '.com', priceUSD: 10.99, popular: true },
        { ext: '.net', priceUSD: 12.99, popular: false },
        { ext: '.org', priceUSD: 13.50, popular: false },
        { ext: '.io', priceUSD: 34.00, popular: true },
        { ext: '.gg', priceUSD: 29.99, popular: true }
      ]
    },
    {
      title: 'Developer Frameworks',
      icon: <Cpu color="var(--success)" size={20} />,
      tlds: [
        { ext: '.tech', priceUSD: 4.99, popular: false },
        { ext: '.cloud', priceUSD: 3.99, popular: false },
        { ext: '.host', priceUSD: 5.99, popular: true },
        { ext: '.bot', priceUSD: 18.00, popular: true }
      ]
    },
    {
      title: 'Localized Geocentric TLDs',
      icon: <Globe color="var(--warning)" size={20} />,
      tlds: [
        { ext: '.in', priceUSD: 6.99, popular: true },
        { ext: '.us', priceUSD: 7.99, popular: false },
        { ext: '.uk', priceUSD: 7.49, popular: false },
        { ext: '.co.in', priceUSD: 4.50, popular: false }
      ]
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const clean = searchQuery.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    setSearchResult({
      name: clean.includes('.') ? clean : `${clean}.com`,
      available: true
    });
  };

  return (
    <section style={{ padding: '4rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">Network Routing Architecture</div>
          <h1 className="section-title">Secure & Anchor Your Global Digital Footprint</h1>
          <p className="section-desc">
            High-speed domain registration, automated WHOIS privacy shielding, and direct pointer configuration routing flawlessly into your NexifyHost server architecture.
          </p>
        </div>

        {/* Live Domain Search Bar */}
        <div
          style={{
            maxWidth: '750px',
            margin: '0 auto 4rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glow)',
            borderRadius: '24px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 15px 45px rgba(0, 242, 254, 0.15)'
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ flexGrow: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px' }} />
              <input
                type="text"
                placeholder="Search your domain name (e.g. nexifyhost.gg)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.6rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '14px' }}>
              Check Availability <ArrowRight size={16} />
            </button>
          </form>

          {searchResult && (
            <div
              style={{
                marginTop: '1.25rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} color="var(--success)" />
                <span style={{ color: '#fff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {searchResult.name} is AVAILABLE!
                </span>
              </div>
              <a href="https://discord.gg/hMeGraR7nc" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                Register via Discord Ticket
              </a>
            </div>
          )}
        </div>

        {/* Feature Badges Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}
        >
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Lock size={22} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>Automatic WHOIS Privacy Shielding</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Protects personal registrant data from public WHOIS database scrapers.</p>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
              <Zap size={22} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>Instant Automated Profile Activation</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Instantaneous TLD DNS zone provisioning upon ticket verification.</p>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <Globe size={22} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>Direct Pointer Configuration Routing</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Routes flawlessly into your active Minecraft, VPS, or Discord Bot nodes.</p>
            </div>
          </div>
        </div>

        {/* TLD Extension Categories Grid */}
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff', marginBottom: '1.75rem' }}>
          ◈ Domain Extensions & Pricing
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {domainCategories.map((cat, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.85rem' }}>
                {cat.icon}
                <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>{cat.title}</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cat.tlds.map((tld, tIdx) => (
                  <div
                    key={tIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {tld.ext}
                      </span>
                      {tld.popular && (
                        <span style={{ background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.4)', color: '#fff', fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '50px', fontWeight: 700 }}>
                          POPULAR
                        </span>
                      )}
                    </div>
                    <span style={{ fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      {formatPrice(tld.priceUSD)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Discord Registration CTA */}
        <div style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-glow)', padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
          <MessageSquare size={32} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', color: '#fff' }}>
            Ready to Register Your Custom Domain?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Open a ticket in <strong>#tickets</strong> to check active custom extension availability and live investment parameters.
          </p>
          <a href="https://discord.gg/hMeGraR7nc" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Open Ticket in #tickets
          </a>
        </div>
      </div>
    </section>
  );
}

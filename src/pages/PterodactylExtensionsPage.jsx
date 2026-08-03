import React, { useState } from 'react';
import { Box, Search, ShieldCheck, Zap, Cpu, Database, Layout, Lock, MessageSquare, Check } from 'lucide-react';

export default function PterodactylExtensionsPage({ formatPrice }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const extensionCategories = [
    {
      id: 'themes',
      title: 'Premium Themes & Interface Designs',
      items: [
        { name: 'Abyss Theme (Purple/Amber/Crimson/Emerald)', priceUSD: 6.00 },
        { name: 'Ark Modern Theme', priceUSD: 7.00 },
        { name: 'Catppuccin Panel Design', priceUSD: 6.50 },
        { name: 'Darkenate Executive Theme', priceUSD: 7.00 },
        { name: 'Euphoria UI Template', priceUSD: 6.50 },
        { name: 'Kaelix Prime Interface', priceUSD: 7.50 },
        { name: 'Lemem Custom Theme', priceUSD: 5.00 },
        { name: 'M3dactyl Material Design', priceUSD: 6.00 },
        { name: 'Nebula Core UI', priceUSD: 8.00 },
        { name: 'Recolor Framework Theme', priceUSD: 4.00 },
        { name: 'Slate Clean Theme', priceUSD: 5.50 },
        { name: 'Slice Modern Layout', priceUSD: 6.00 },
        { name: 'Stellar Cosmic Theme', priceUSD: 7.00 },
        { name: 'XL Panel Panoramic Theme', priceUSD: 7.00 }
      ]
    },
    {
      id: 'admin',
      title: 'Administrative & Logging Suite',
      items: [
        { name: 'Admin Audit Logs', priceUSD: 5.00 },
        { name: 'Activity Purges', priceUSD: 4.00 },
        { name: 'Better Admin Panel', priceUSD: 6.00 },
        { name: 'Blue Announcements System', priceUSD: 4.50 },
        { name: 'Console Logs Viewer', priceUSD: 3.50 },
        { name: 'MC Logs Integration', priceUSD: 4.00 },
        { name: 'Night Admin Panel', priceUSD: 5.50 },
        { name: 'Pterodactyl Panel Ban', priceUSD: 6.00 },
        { name: 'Ultra Dark Admin Overlay', priceUSD: 5.50 }
      ]
    },
    {
      id: 'server-db',
      title: 'Server & Database Management',
      items: [
        { name: 'Automated System Backups', priceUSD: 7.50 },
        { name: 'Configuration File Editor', priceUSD: 5.00 },
        { name: 'Custom Server Sorting', priceUSD: 3.00 },
        { name: 'Database Import/Export Tool', priceUSD: 6.50 },
        { name: 'MySQL Auto-Backup Utility', priceUSD: 7.50 },
        { name: 'Panel Address Override', priceUSD: 4.00 },
        { name: 'Pull Files Downloader', priceUSD: 4.50 },
        { name: 'Saga Auto-Suspension', priceUSD: 8.00 },
        { name: 'Server ID Allocator', priceUSD: 3.00 },
        { name: 'Server Importer Engine', priceUSD: 9.00 },
        { name: 'Server Splitter Framework', priceUSD: 9.50 },
        { name: 'Show Node IDs Mod', priceUSD: 2.50 },
        { name: 'Trash Bin Recovery System', priceUSD: 6.00 },
        { name: 'URL Downloader Utility', priceUSD: 5.00 },
        { name: 'VM Info & Metrics', priceUSD: 5.00 }
      ]
    },
    {
      id: 'optimization',
      title: 'System Performance & Resource Optimization',
      items: [
        { name: 'Pterodactyl CPU Burst Controller', priceUSD: 10.00 },
        { name: 'Pterodactyl RAM Burst Controller', priceUSD: 10.00 },
        { name: 'Real-Time Resource Manager', priceUSD: 8.50 },
        { name: 'Node Infrastructure Manager', priceUSD: 7.00 }
      ]
    },
    {
      id: 'minecraft',
      title: 'Advanced Minecraft Toolkits',
      items: [
        { name: 'Minecraft Mod Manager', priceUSD: 11.00 },
        { name: 'Minecraft Player Manager', priceUSD: 8.00 },
        { name: 'Minecraft Plugin Manager', priceUSD: 12.00 },
        { name: 'MC Player Tracking Matrix', priceUSD: 6.50 },
        { name: 'MC Plugins Sync Tool', priceUSD: 7.00 },
        { name: 'MC Tools Core Panel', priceUSD: 7.50 },
        { name: 'Modrinth Native Browser', priceUSD: 10.00 },
        { name: 'MOTD Visual Maker', priceUSD: 4.00 },
        { name: 'Saga Minecraft Modpack Installer', priceUSD: 12.00 },
        { name: 'Saga Server Properties UI', priceUSD: 6.50 },
        { name: 'Server Icon Importer', priceUSD: 3.50 },
        { name: 'Server Properties Manager', priceUSD: 5.50 },
        { name: 'Vanilla Tweaks Installer', priceUSD: 6.00 },
        { name: 'Version Changer Suite', priceUSD: 8.50 },
        { name: 'Votifier Testing Utility', priceUSD: 4.50 }
      ]
    },
    {
      id: 'ui',
      title: 'UI Elements & Layout Enhancements',
      items: [
        { name: 'Blue Tables UI Modifier', priceUSD: 3.00 },
        { name: 'Custom CSS Injection Tool', priceUSD: 4.00 },
        { name: 'Monaco Advanced Code Editor', priceUSD: 5.50 },
        { name: 'No-Pagination Endless Scrolling', priceUSD: 3.50 },
        { name: 'Player Listing Displays', priceUSD: 4.00 },
        { name: 'Pteromonaco Code Suite', priceUSD: 5.00 },
        { name: 'Dynamic Server Backgrounds', priceUSD: 3.00 },
        { name: 'Sidebar Navigation Customizer', priceUSD: 3.50 },
        { name: 'Simple Favicon Manager', priceUSD: 2.00 },
        { name: 'Simple Footer Editor', priceUSD: 2.50 },
        { name: 'Snowflake Particle Overlay', priceUSD: 2.00 },
        { name: 'Startup Changer Utility', priceUSD: 3.50 },
        { name: 'Static & Panel Statistics Views', priceUSD: 4.50 }
      ]
    },
    {
      id: 'auth',
      title: 'Auth, Integrations & Routing',
      items: [
        { name: 'Discord Authentication Blueprint', priceUSD: 12.00 },
        { name: 'Social OAuth Secure Login', priceUSD: 8.00 },
        { name: 'Tawk.to Live Chat Integration', priceUSD: 4.50 },
        { name: 'Domain & Network Redirector', priceUSD: 4.00 },
        { name: 'Resource Threshold Alerts', priceUSD: 5.50 },
        { name: 'Network Subdomain Manager', priceUSD: 7.50 },
        { name: 'Subdomains Mapping Matrix', priceUSD: 6.00 },
        { name: 'CoreSystem Translations Module', priceUSD: 9.00 }
      ]
    }
  ];

  const filteredCategories = extensionCategories.map((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return null;
    const items = cat.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (items.length === 0) return null;
    return { ...cat, items };
  }).filter(Boolean);

  return (
    <section style={{ padding: '4rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">Panel Extensions & Modules</div>
          <h1 className="section-title">NexifyHost™ │ Panel Extension & Module Inventory</h1>
          <p className="section-desc">
            Enhance your Pterodactyl Game Panel with premium themes, administrative suites, automated backups, and advanced Minecraft management modules.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ maxWidth: '800px', margin: '0 auto 3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px' }} />
            <input
              type="text"
              placeholder="Search Pterodactyl extension or theme (e.g. Monaco Editor, Abyss Theme)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.8rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glow)',
                borderRadius: '14px',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              onClick={() => setActiveCategory('all')}
              className={`btn btn-sm ${activeCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Modules
            </button>
            {extensionCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`btn btn-sm ${activeCategory === c.id ? 'btn-primary' : 'btn-secondary'}`}
              >
                {c.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Inventory Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem' }}>
          {filteredCategories.map((cat, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fff', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.85rem' }}>
                ◈ {cat.title}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                {cat.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '12px',
                      padding: '0.9rem 1.25rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Box size={16} color="var(--primary)" />
                      <span style={{ color: '#fff', fontSize: '0.92rem', fontWeight: 600 }}>{item.name}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--success)', fontSize: '0.95rem' }}>
                        {formatPrice(item.priceUSD)}
                      </span>
                      <a href="https://discord.gg/hMeGraR7nc" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>
                        Get License
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* License Note & Discord Authorize CTA */}
        <div style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-glow)', padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
          <ShieldCheck size={36} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', color: '#fff' }}>
            Permanent Non-Expiring License Guarantee
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            All blueprint acquisitions grant a permanent, non-expiring infrastructure license with direct panel installation assistance.
          </p>
          <a href="https://discord.gg/hMeGraR7nc" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageSquare size={16} /> Open Ticket in #tickets to Authorize Setup
          </a>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Server,
  ChevronDown,
  Box,
  Zap,
  Bot,
  Calculator,
  Building,
  Info,
  Users,
  Mail,
  FileText,
  Globe,
  Menu,
  X,
  MessageSquare,
  ShoppingCart,
  Star,
  Cpu
} from 'lucide-react';
import CurrencySelector from './CurrencySelector.jsx';

export default function Navbar({
  currentPage,
  setCurrentPage,
  currency,
  setCurrency,
  livePing
}) {
  const [hostingOpen, setHostingOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [mobileHostingOpen, setMobileHostingOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const navRef = useRef(null);

  // Close dropdowns when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setHostingOpen(false);
        setShopOpen(false);
        setCompanyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (pageName) => {
    setCurrentPage(pageName);
    setHostingOpen(false);
    setShopOpen(false);
    setCompanyOpen(false);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <div className="status-online-pill">
            <span className="pulse-dot"></span>
            <span>SYSTEM ONLINE (99.99% Uptime SLA)</span>
          </div>
          <div className="announcement-text hide-mobile">
            High-Frequency AMD Ryzen 9 7950X Nodes Active & Fully Operational
          </div>
          <a
            href="https://discord.gg/hMeGraR7nc"
            target="_blank"
            rel="noopener noreferrer"
            className="announcement-discord-link"
          >
            Discord Community
          </a>
        </div>
      </div>

      {/* Top Navigation Header */}
      <header className="top-navigation-bar" ref={navRef}>
        <div className="nav-container">
          {/* Main Blue Logo */}
          <div className="nav-brand" onClick={() => handleNavClick('home')}>
            <div className="logo-glow"></div>
            <img src="/logo_blue.jpg" alt="Nexify Host Blue Logo" className="brand-logo-img" />
            <div className="brand-text">
              <span className="brand-primary">NEXIFY</span>
              <span className="brand-secondary">HOST</span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="desktop-nav-menu hide-mobile-nav">
            {/* 1st: Home */}
            <button
              type="button"
              className={`top-nav-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <Home size={15} />
              <span>Home</span>
            </button>

            {/* 2nd: Hosting DropDown */}
            <div
              className="nav-dropdown"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => {
                setHostingOpen(true);
                setShopOpen(false);
                setCompanyOpen(false);
              }}
            >
              <button
                type="button"
                className={`dropdown-trigger-btn ${hostingOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setHostingOpen((prev) => !prev);
                  setShopOpen(false);
                  setCompanyOpen(false);
                }}
              >
                <Server size={15} />
                <span>Hosting</span>
                <ChevronDown
                  className="chevron"
                  size={12}
                  style={{ transform: hostingOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                />
              </button>

              {hostingOpen && (
                <div
                  className="dropdown-menu-list"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#0b0f19',
                    border: '1px solid rgba(0, 242, 254, 0.5)',
                    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.98), 0 0 25px rgba(0, 242, 254, 0.3)',
                    borderRadius: '12px',
                    padding: '8px',
                    minWidth: '255px',
                    zIndex: 9999999,
                    gap: '4px'
                  }}
                >
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('minecraft-budget')}
                    style={{ '--hover-color': '#00f2fe' }}
                  >
                    <Box size={15} />
                    <span>Minecraft Budget Plans</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('minecraft-performance')}
                    style={{ '--hover-color': '#7c3aed' }}
                  >
                    <Zap size={15} />
                    <span>Minecraft Performance Plans</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('discord-bot')}
                    style={{ '--hover-color': '#5865f2' }}
                  >
                    <Bot size={15} />
                    <span>Discord Bot Hosting</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3rd: Shop Dropdown (Domains & Pterodactyl Extensions) */}
            <div
              className="nav-dropdown"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => {
                setShopOpen(true);
                setHostingOpen(false);
                setCompanyOpen(false);
              }}
            >
              <button
                type="button"
                className={`dropdown-trigger-btn ${shopOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShopOpen((prev) => !prev);
                  setHostingOpen(false);
                  setCompanyOpen(false);
                }}
              >
                <ShoppingCart size={15} />
                <span>Shop</span>
                <ChevronDown
                  className="chevron"
                  size={12}
                  style={{ transform: shopOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                />
              </button>

              {shopOpen && (
                <div
                  className="dropdown-menu-list"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#0b0f19',
                    border: '1px solid rgba(0, 242, 254, 0.5)',
                    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.98), 0 0 25px rgba(0, 242, 254, 0.3)',
                    borderRadius: '12px',
                    padding: '8px',
                    minWidth: '255px',
                    zIndex: 9999999,
                    gap: '4px'
                  }}
                >
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('domains')}
                    style={{ '--hover-color': '#00f2fe' }}
                  >
                    <Globe size={15} color="var(--primary)" />
                    <span>Domains TLD Network</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('pterodactyl-extensions')}
                    style={{ '--hover-color': '#7c3aed' }}
                  >
                    <Cpu size={15} color="var(--secondary)" />
                    <span>Pterodactyl Extensions</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4th: Calculator */}
            <button
              type="button"
              className={`top-nav-btn ${currentPage === 'calculator' ? 'active' : ''}`}
              onClick={() => handleNavClick('calculator')}
            >
              <Calculator size={15} />
              <span>Calculator</span>
            </button>

            {/* 5th: Reviews */}
            <button
              type="button"
              className={`top-nav-btn ${currentPage === 'feedbacks' ? 'active' : ''}`}
              onClick={() => handleNavClick('feedbacks')}
            >
              <Star size={15} fill="#00b67a" color="#00b67a" />
              <span>Feedbacks</span>
            </button>

            {/* 6th: Company DropDown (Brackets removed from Team) */}
            <div
              className="nav-dropdown"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => {
                setCompanyOpen(true);
                setHostingOpen(false);
                setShopOpen(false);
              }}
            >
              <button
                type="button"
                className={`dropdown-trigger-btn ${companyOpen ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCompanyOpen((prev) => !prev);
                  setHostingOpen(false);
                  setShopOpen(false);
                }}
              >
                <Building size={15} />
                <span>Company</span>
                <ChevronDown
                  className="chevron"
                  size={12}
                  style={{ transform: companyOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                />
              </button>

              {companyOpen && (
                <div
                  className="dropdown-menu-list"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#0b0f19',
                    border: '1px solid rgba(0, 242, 254, 0.5)',
                    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.98), 0 0 25px rgba(0, 242, 254, 0.3)',
                    borderRadius: '12px',
                    padding: '8px',
                    minWidth: '255px',
                    zIndex: 9999999,
                    gap: '4px'
                  }}
                >
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('about')}
                    style={{ '--hover-color': '#00f2fe' }}
                  >
                    <Info size={15} />
                    <span>About Us</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('team')}
                    style={{ '--hover-color': '#ef4444' }}
                  >
                    <Users size={15} />
                    <span>Team</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('contact')}
                    style={{ '--hover-color': '#f59e0b' }}
                  >
                    <Mail size={15} />
                    <span>Contact Us</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('terms')}
                    style={{ '--hover-color': '#9ca3af' }}
                  >
                    <FileText size={15} />
                    <span>Terms and Conditions</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item-btn"
                    onClick={() => handleNavClick('node-status')}
                    style={{ '--hover-color': '#10b981' }}
                  >
                    <Globe size={15} className="globe-icon-spin" color="var(--primary)" />
                    <span>Node Status ({livePing}ms)</span>
                  </button>
                </div>
              )}
            </div>

            {/* 7th: Node Status Badge */}
            <div
              className={`node-status-badge ${currentPage === 'node-status' ? 'active' : ''}`}
              onClick={() => handleNavClick('node-status')}
              style={{ cursor: 'pointer' }}
            >
              <Globe size={14} className="globe-icon-spin" />
              <span>Node Ping: <span className="live-ping-ticker">{livePing}ms</span></span>
            </div>
          </nav>

          {/* Right Header Actions */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CurrencySelector currency={currency} setCurrency={setCurrency} />

            {/* Mobile Navigation Toggle Button */}
            <button
              type="button"
              className="mobile-nav-toggle-btn show-mobile-only"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="mobile-nav-drawer">
            <div className="mobile-drawer-inner">
              <button
                type="button"
                className={`mobile-drawer-btn ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Home size={18} />
                  <span>Home</span>
                </div>
              </button>

              {/* Hosting Accordion */}
              <div className="mobile-accordion">
                <button
                  type="button"
                  className="mobile-drawer-btn"
                  onClick={() => setMobileHostingOpen(!mobileHostingOpen)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Server size={18} />
                    <span>Hosting Plans</span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{ transform: mobileHostingOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }}
                  />
                </button>

                {mobileHostingOpen && (
                  <div className="mobile-accordion-list">
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('minecraft-budget')}
                    >
                      <Box size={16} color="var(--primary)" />
                      <span>Minecraft Budget Plans</span>
                    </button>
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('minecraft-performance')}
                    >
                      <Zap size={16} color="var(--secondary)" />
                      <span>Minecraft Performance Plans</span>
                    </button>
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('discord-bot')}
                    >
                      <Bot size={16} color="#5865f2" />
                      <span>Discord Bot Hosting</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Shop Accordion */}
              <div className="mobile-accordion">
                <button
                  type="button"
                  className="mobile-drawer-btn"
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShoppingCart size={18} />
                    <span>Shop & Extensions</span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{ transform: mobileShopOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }}
                  />
                </button>

                {mobileShopOpen && (
                  <div className="mobile-accordion-list">
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('domains')}
                    >
                      <Globe size={16} color="var(--primary)" />
                      <span>Domains TLD Network</span>
                    </button>
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('pterodactyl-extensions')}
                    >
                      <Cpu size={16} color="var(--secondary)" />
                      <span>Pterodactyl Extensions</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Calculator */}
              <button
                type="button"
                className={`mobile-drawer-btn ${currentPage === 'calculator' ? 'active' : ''}`}
                onClick={() => handleNavClick('calculator')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Calculator size={18} />
                  <span>Calculator</span>
                </div>
              </button>

              {/* Feedbacks */}
              <button
                type="button"
                className={`mobile-drawer-btn ${currentPage === 'feedbacks' ? 'active' : ''}`}
                onClick={() => handleNavClick('feedbacks')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Star size={18} fill="#00b67a" color="#00b67a" />
                  <span>Feedbacks (Trustpilot)</span>
                </div>
              </button>

              {/* Mobile Company Accordion */}
              <div className="mobile-accordion">
                <button
                  type="button"
                  className="mobile-drawer-btn"
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Building size={18} />
                    <span>Company</span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{ transform: mobileCompanyOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }}
                  />
                </button>

                {mobileCompanyOpen && (
                  <div className="mobile-accordion-list">
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('about')}
                    >
                      <Info size={16} color="var(--primary)" />
                      <span>About Us</span>
                    </button>
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('team')}
                    >
                      <Users size={16} color="var(--danger)" />
                      <span>Team</span>
                    </button>
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('contact')}
                    >
                      <Mail size={16} color="var(--warning)" />
                      <span>Contact Us</span>
                    </button>
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('terms')}
                    >
                      <FileText size={16} color="var(--text-muted)" />
                      <span>Terms and Conditions</span>
                    </button>
                    <button
                      type="button"
                      className="mobile-sub-item"
                      onClick={() => handleNavClick('node-status')}
                    >
                      <Globe size={16} color="var(--success)" className="globe-icon-spin" />
                      <span>Node Status ({livePing}ms)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Node Status Badge */}
              <div
                className="mobile-node-badge"
                onClick={() => handleNavClick('node-status')}
                style={{ cursor: 'pointer' }}
              >
                <Globe size={16} className="globe-icon-spin" />
                <span>Live Node Ping: <strong style={{ color: 'var(--success)' }}>{livePing}ms</strong></span>
              </div>

              <a
                href="https://discord.gg/hMeGraR7nc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <MessageSquare size={16} /> Open Discord Ticket
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

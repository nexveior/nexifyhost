import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: '#fff', marginBottom: '0.75rem' }}>
              NEXIFY<span style={{ color: 'var(--primary)' }}>HOST</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '300px' }}>
              High-performance game, VPS, and cloud hosting infrastructure powered by AMD Ryzen 9 7950X.
            </p>
            <a
              href="https://discord.gg/hMeGraR7nc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <MessageSquare size={14} /> Discord Server
            </a>
          </div>

          <div className="footer-col">
            <h4>Hosting Solutions</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => { setCurrentPage('minecraft-budget'); window.scrollTo(0,0); }}>
                  Minecraft Budget Plans
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('minecraft-performance'); window.scrollTo(0,0); }}>
                  Minecraft Performance Plans
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('discord-bot'); window.scrollTo(0,0); }}>
                  Discord Bot Hosting
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => { setCurrentPage('calculator'); window.scrollTo(0,0); }}>
                  Hardware Calculator
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('team'); window.scrollTo(0,0); }}>
                  Engineering Team
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }}>
                  About Us
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal & Support</h4>
            <ul className="footer-links">
              <li>
                <a href="https://discord.gg/hMeGraR7nc" target="_blank" rel="noopener noreferrer">
                  Discord Ticket Support
                </a>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('terms'); window.scrollTo(0,0); }}>
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }}>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; 2026 Nexify Host. All rights reserved.
          </div>
          <div className="payment-methods">
            <span className="payment-badge">UPI / GPay</span>
            <span className="payment-badge">Credit Cards</span>
            <span class="payment-badge">PayPal</span>
            <span className="payment-badge">Crypto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

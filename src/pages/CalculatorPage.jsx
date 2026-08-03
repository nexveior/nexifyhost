import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export default function CalculatorPage({ formatPrice }) {
  const [ramGb, setRamGb] = useState(8);
  const [vcpuCores, setVcpuCores] = useState(4);
  const [storageGb, setStorageGb] = useState(60);

  const basePriceUSD = (ramGb * 0.35) + (vcpuCores * 0.50) + ((storageGb / 10) * 0.20);
  const displayPrice = formatPrice(basePriceUSD);

  return (
    <section className="configurator-section" style={{ paddingTop: '4rem' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// CUSTOM HARDWARE CALCULATOR</span>
          <h2 className="section-title">Configure Custom Specs</h2>
          <p className="section-desc">Adjust your exact DDR5 RAM, vCPU cores, and NVMe disk parameters with real-time world currency estimation.</p>
        </div>

        <div className="calc-wrapper">
          <div className="calc-controls">
            <div className="slider-group">
              <div className="slider-header">
                <span>DDR5 RAM Allocation</span>
                <span className="slider-val">{ramGb} GB RAM</span>
              </div>
              <input
                type="range"
                min="1"
                max="64"
                step="1"
                value={ramGb}
                onChange={(e) => setRamGb(parseInt(e.target.value))}
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span>Dedicated CPU Cores</span>
                <span className="slider-val">{vcpuCores} vCPU Cores</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={vcpuCores}
                onChange={(e) => setVcpuCores(parseInt(e.target.value))}
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span>Gen4 NVMe Storage</span>
                <span className="slider-val">{storageGb} GB NVMe</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={storageGb}
                onChange={(e) => setStorageGb(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="calc-summary">
            <h3 className="summary-title">Hardware Summary</h3>

            <div className="summary-item">
              <span>DDR5 Memory:</span>
              <span>{ramGb} GB DDR5</span>
            </div>
            <div className="summary-item">
              <span>CPU Allocation:</span>
              <span>{vcpuCores} Cores @ 5.7GHz</span>
            </div>
            <div className="summary-item">
              <span>NVMe Storage:</span>
              <span>{storageGb} GB Gen4 NVMe</span>
            </div>
            <div className="summary-item">
              <span>DDoS Mitigation:</span>
              <span style={{ color: 'var(--success)' }}>1 Tbps+ Enterprise Shield</span>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className="total-price">{displayPrice}</div>
              <a
                href="https://discord.gg/hMeGraR7nc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Request Custom Build via Discord <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

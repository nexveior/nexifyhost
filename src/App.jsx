import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import HomePage from './pages/HomePage.jsx';
import MinecraftBudgetPage from './pages/MinecraftBudgetPage.jsx';
import MinecraftPerformancePage from './pages/MinecraftPerformancePage.jsx';
import DiscordBotPage from './pages/DiscordBotPage.jsx';
import CalculatorPage from './pages/CalculatorPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import NodeStatusPage from './pages/NodeStatusPage.jsx';
import DomainsPage from './pages/DomainsPage.jsx';
import PterodactylExtensionsPage from './pages/PterodactylExtensionsPage.jsx';
import FeedbacksPage from "./pages/FeedbacksPage.jsx";

const currencyRates = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  INR: { symbol: '₹', rate: 83.2 },
  CAD: { symbol: 'CA$', rate: 1.36 },
  AUD: { symbol: 'AU$', rate: 1.52 },
  JPY: { symbol: '¥', rate: 155.4 },
  BRL: { symbol: 'R$', rate: 5.15 },
  BDT: { symbol: '৳', rate: 117.5 },
  PKR: { symbol: '₨', rate: 278.0 },
  IDR: { symbol: 'Rp', rate: 16200 },
  RUB: { symbol: '₽', rate: 91.5 },
  AED: { symbol: 'AED', rate: 3.67 },
  SAR: { symbol: 'SAR', rate: 3.75 }
};

const plansData = {
  'discord-bot': [
    {
      name: 'Basic Node',
      desc: 'Good for single-server bots',
      ram: '1 GB DDR5 RAM',
      cpu: '75% Dedicated CPU Allocation',
      disk: '5 GB Gen4 NVMe Storage',
      basePriceUSD: 0.60,
      featured: false
    },
    {
      name: 'Plus Matrix',
      desc: 'Handles multiple bots smoothly',
      ram: '2 GB DDR5 RAM',
      cpu: '100% Dedicated CPU Allocation',
      disk: '10 GB Gen4 NVMe Storage',
      basePriceUSD: 1.20,
      featured: false
    },
    {
      name: 'Pro Tier',
      desc: 'For larger bots & multi-server use',
      ram: '4 GB DDR5 RAM',
      cpu: '150% Dedicated CPU Allocation',
      disk: '15 GB Gen4 NVMe Storage',
      basePriceUSD: 2.40,
      featured: true
    },
    {
      name: 'Advanced Core',
      desc: 'For heavy bots & multiple instances',
      ram: '8 GB DDR5 RAM',
      cpu: '250% Dedicated CPU Allocation',
      disk: '25 GB Gen4 NVMe Storage',
      basePriceUSD: 4.70,
      featured: false
    },
    {
      name: 'Elite Nexus',
      desc: 'For large-scale bot networks',
      ram: '16 GB DDR5 RAM',
      cpu: '400% Dedicated CPU Allocation',
      disk: '40 GB Gen4 NVMe Storage',
      basePriceUSD: 9.40,
      featured: false
    },
    {
      name: 'Ultimate Overlord',
      desc: 'Maximum performance for power users',
      ram: '24 GB DDR5 RAM',
      cpu: '600% Dedicated CPU Allocation',
      disk: '60 GB Gen4 NVMe Storage',
      basePriceUSD: 14.00,
      featured: false
    },
    {
      name: 'Custom App Framework',
      desc: 'Tailored hardware resource frameworks engineered to specific project dimensions.',
      ram: 'Custom DDR5 RAM',
      cpu: 'Custom Dedicated CPU',
      disk: 'Bespoke Gen4 NVMe',
      basePriceUSD: null,
      featured: false
    }
  ],
  'minecraft-budget': [
    {
      name: 'Essential Engine',
      desc: 'Baseline architecture engineered for private staging setups and code sandboxing.',
      ram: '4 GB DDR5 RAM',
      cpu: '150% Dedicated CPU Allocation',
      disk: '20 GB Gen4 NVMe Storage',
      basePriceUSD: 0.99,
      featured: false
    },
    {
      name: 'Xenora Matrix',
      desc: 'Streamlined core infrastructure optimized for high-tick vanilla cooperative play.',
      ram: '8 GB DDR5 RAM',
      cpu: '250% Dedicated CPU Allocation',
      disk: '35 GB Gen4 NVMe Storage',
      basePriceUSD: 1.99,
      featured: false
    },
    {
      name: 'Apex Tier',
      desc: 'High-efficiency distribution built for expanding communities and production plugin setups.',
      ram: '12 GB DDR5 RAM',
      cpu: '350% Dedicated CPU Allocation',
      disk: '50 GB Gen4 NVMe Storage',
      basePriceUSD: 3.99,
      featured: true
    },
    {
      name: 'Quantum Core',
      desc: 'High-performance processing tier dedicated to continuous heavy compute workloads.',
      ram: '24 GB DDR5 RAM',
      cpu: '600% Dedicated CPU Allocation',
      disk: '100 GB Gen4 NVMe Storage',
      basePriceUSD: 6.99,
      featured: false
    },
    {
      name: 'Nova Nexus',
      desc: 'Ultimate resource pool optimized for heavy concurrent player processing loops.',
      ram: '32 GB DDR5 RAM',
      cpu: '800% Dedicated CPU Allocation',
      disk: '150 GB Gen4 NVMe Storage',
      basePriceUSD: 9.99,
      featured: false
    },
    {
      name: 'Enterprise Overlord',
      desc: 'Elite tier framework configured for massive modpacks and absolute network data throughput.',
      ram: '48 GB DDR5 RAM',
      cpu: '1200% Dedicated CPU Allocation',
      disk: '200 GB Gen4 NVMe Storage',
      basePriceUSD: 12.99,
      featured: false
    },
    {
      name: 'Custom Core Architecture',
      desc: 'Tailored hardware resource frameworks engineered to specific project dimensions.',
      ram: 'Custom DDR5 RAM',
      cpu: 'Custom Dedicated CPU',
      disk: 'Bespoke Gen4 NVMe',
      basePriceUSD: null,
      featured: false
    }
  ],
  'minecraft-performance': [
    {
      name: 'Vanguard Node',
      desc: 'High-priority baseline framework built for optimized private server testing.',
      ram: '4 GB DDR5 RAM',
      cpu: '200% Dedicated CPU Allocation',
      disk: '35 GB Gen4 NVMe Storage',
      basePriceUSD: 2.50,
      featured: false
    },
    {
      name: 'Catalyst Core',
      desc: 'Premium runtime execution environments engineered for clean cooperative play.',
      ram: '8 GB DDR5 RAM',
      cpu: '350% Dedicated CPU Allocation',
      disk: '60 GB Gen4 NVMe Storage',
      basePriceUSD: 5.00,
      featured: false
    },
    {
      name: 'Synapse Prime',
      desc: 'Advanced multi-thread structures tailored for complex, expanding plugin networks.',
      ram: '12 GB DDR5 RAM',
      cpu: '500% Dedicated CPU Allocation',
      disk: '90 GB Gen4 NVMe Storage',
      basePriceUSD: 7.55,
      featured: true
    },
    {
      name: 'Overdrive Matrix',
      desc: 'Lethal computing architecture dedicated to heavy, unyielding resource loads.',
      ram: '24 GB DDR5 RAM',
      cpu: '800% Dedicated CPU Allocation',
      disk: '160 GB Gen4 NVMe Storage',
      basePriceUSD: 15.10,
      featured: false
    },
    {
      name: 'Kinetic Horizon',
      desc: 'Absolute operational throughput optimized for massive community player bases.',
      ram: '32 GB DDR5 RAM',
      cpu: '1000% Dedicated CPU Allocation',
      disk: '220 GB Gen4 NVMe Storage',
      basePriceUSD: 20.15,
      featured: false
    },
    {
      name: 'Singularity Protocol',
      desc: 'Unrivaled high-tier power array designed to process dense modpacks and heavy ticks.',
      ram: '48 GB DDR5 RAM',
      cpu: '1600% Dedicated CPU Allocation',
      disk: '320 GB Gen4 NVMe Storage',
      basePriceUSD: 30.20,
      featured: false
    },
    {
      name: 'Custom Prowess Architecture',
      desc: 'Tailored hardware resource frameworks engineered to specific project dimensions.',
      ram: 'Custom DDR5 RAM',
      cpu: 'Custom Dedicated CPU',
      disk: 'Bespoke Gen4 NVMe',
      basePriceUSD: null,
      featured: false
    }
  ]
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currency, setCurrency] = useState('USD');
  const [livePing, setLivePing] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      const ping = Math.floor(Math.random() * (16 - 11 + 1)) + 11;
      setLivePing(ping);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (priceUSD) => {
    if (priceUSD === null || priceUSD === undefined) return 'Bespoke Budget';
    const curr = currencyRates[currency] || currencyRates.USD;
    const converted = priceUSD * curr.rate;

    if (currency === 'USD' || currency === 'EUR' || currency === 'GBP') {
      return `${curr.symbol}${converted.toFixed(2)} / mo`;
    } else {
      return `${curr.symbol}${Math.round(converted).toLocaleString()} / mo`;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} formatPrice={formatPrice} />;
      case 'minecraft-budget':
        return <MinecraftBudgetPage formatPrice={formatPrice} plansData={plansData} />;
      case 'minecraft-performance':
        return <MinecraftPerformancePage formatPrice={formatPrice} plansData={plansData} />;
      case 'discord-bot':
        return <DiscordBotPage formatPrice={formatPrice} plansData={plansData} />;
      case 'calculator':
        return <CalculatorPage formatPrice={formatPrice} />;
      case 'team':
        return <TeamPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsPage />;
      case 'node-status':
        return <NodeStatusPage livePing={livePing} />;
      case 'domains':
        return <DomainsPage formatPrice={formatPrice} />;
      case 'pterodactyl-extensions':
        return <PterodactylExtensionsPage formatPrice={formatPrice} />;
      case 'feedbacks':
        return <FeedbacksPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} formatPrice={formatPrice} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="grid-background"></div>

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currency={currency}
        setCurrency={setCurrency}
        livePing={livePing}
      />

      <main style={{ flexGrow: 1 }}>
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

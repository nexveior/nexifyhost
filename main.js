/* -------------------------------------------------------------
 * NEXIFY HOST - INTERACTIVE MULTI-PAGE JAVASCRIPT MODULE
 * Handles Multi-Page Navigation, World Currency Engine,
 * 1-Second Live Ping Ticker, User Review Submissions,
 * Custom Hardware Calculator, and Discord Ticket Links
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // World Currency Exchange Rates relative to USD ($)
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

  const state = {
    selectedCurrency: localStorage.getItem('nexify_currency') || 'USD',
    activeTab: 'minecraft-budget',
    ramGb: 8,
    vcpuCores: 4,
    storageGb: 60,
  };

  // Exact Hosting Plans Data
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

  // Convert Price to Selected World Currency
  function formatPrice(priceUSD) {
    if (priceUSD === null || priceUSD === undefined) return 'Bespoke Budget';
    const curr = currencyRates[state.selectedCurrency] || currencyRates.USD;
    const converted = priceUSD * curr.rate;

    if (state.selectedCurrency === 'USD' || state.selectedCurrency === 'EUR' || state.selectedCurrency === 'GBP') {
      return `${curr.symbol}${converted.toFixed(2)} / mo`;
    } else {
      return `${curr.symbol}${Math.round(converted).toLocaleString()} / mo`;
    }
  }

  // Render Hosting Plans
  const plansContainer = document.getElementById('plansContainer');
  const tabButtons = document.querySelectorAll('.tab-btn');

  function renderPlans(categoryKey) {
    if (!plansContainer) return;
    state.activeTab = categoryKey;
    const plans = plansData[categoryKey] || plansData['minecraft-budget'];

    plansContainer.innerHTML = plans.map(plan => {
      const priceText = formatPrice(plan.basePriceUSD);

      return `
        <div class="plan-card ${plan.featured ? 'featured' : ''}">
          ${plan.featured ? '<span style="position:absolute; top:-12px; right:20px; background:linear-gradient(135deg, var(--primary), var(--secondary)); color:#fff; font-size:0.75rem; font-weight:700; padding:0.25rem 0.85rem; border-radius:50px;">MOST POPULAR</span>' : ''}
          <h3 class="plan-name">${plan.name}</h3>
          <p class="plan-desc">${plan.desc}</p>
          <div class="plan-price-box">
            <span class="price-val">${priceText}</span>
          </div>
          <ul class="plan-features">
            <li><i data-lucide="cpu"></i> ${plan.cpu}</li>
            <li><i data-lucide="hard-drive"></i> ${plan.ram}</li>
            <li><i data-lucide="server"></i> ${plan.disk}</li>
            <li><i data-lucide="shield-check"></i> Enterprise DDoS Shield</li>
            <li><i data-lucide="zap"></i> 24/7 Uptime Guaranteed</li>
          </ul>
          <a href="https://discord.gg/hMeGraR7nc" target="_blank" class="btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}" style="width:100%;">
            Purchase via Discord Ticket <i data-lucide="external-link"></i>
          </a>
          <p class="ticket-note">Open a ticket in Discord channel to order or request custom specs</p>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  window.renderSpecificCategory = function(catKey) {
    renderPlans(catKey);
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPlans(btn.getAttribute('data-category'));
    });
  });

  // World Currency Selector Listener
  const currencySelect = document.getElementById('worldCurrencySelect');
  if (currencySelect) {
    currencySelect.value = state.selectedCurrency;
    currencySelect.addEventListener('change', (e) => {
      state.selectedCurrency = e.target.value;
      localStorage.setItem('nexify_currency', state.selectedCurrency);
      renderPlans(state.activeTab);
      updateCalculator();
      showToast(`Switched currency to ${state.selectedCurrency}`);
    });
  }

  // 1-Second Live Node Ping Ticker Simulation
  const livePingVal = document.getElementById('livePingVal');
  if (livePingVal) {
    setInterval(() => {
      const ping = Math.floor(Math.random() * (16 - 11 + 1)) + 11;
      livePingVal.textContent = `${ping}ms`;
    }, 1000);
  }

  // Bulletproof Dropdown Menu Toggle (Hover & Click)
  document.querySelectorAll('.dropdown-trigger-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.closest('.nav-dropdown');
      document.querySelectorAll('.nav-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
      });
      if (dropdown) dropdown.classList.toggle('active');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
  });

  // Custom Hardware Slider Calculator
  const ramSlider = document.getElementById('ramSlider');
  const cpuSlider = document.getElementById('cpuSlider');
  const diskSlider = document.getElementById('diskSlider');

  const ramVal = document.getElementById('ramVal');
  const cpuVal = document.getElementById('cpuVal');
  const diskVal = document.getElementById('diskVal');

  const calcRamDisplay = document.getElementById('calcRamDisplay');
  const calcCpuDisplay = document.getElementById('calcCpuDisplay');
  const calcDiskDisplay = document.getElementById('calcDiskDisplay');
  const calcTotalPrice = document.getElementById('calcTotalPrice');

  function updateCalculator() {
    if (!ramSlider || !cpuSlider || !diskSlider) return;

    state.ramGb = parseInt(ramSlider.value);
    state.vcpuCores = parseInt(cpuSlider.value);
    state.storageGb = parseInt(diskSlider.value);

    if (ramVal) ramVal.textContent = `${state.ramGb} GB RAM`;
    if (cpuVal) cpuVal.textContent = `${state.vcpuCores} vCPU Cores`;
    if (diskVal) diskVal.textContent = `${state.storageGb} GB NVMe`;

    if (calcRamDisplay) calcRamDisplay.textContent = `${state.ramGb} GB DDR5`;
    if (calcCpuDisplay) calcCpuDisplay.textContent = `${state.vcpuCores} Cores @ 5.7GHz`;
    if (calcDiskDisplay) calcDiskDisplay.textContent = `${state.storageGb} GB Gen4 NVMe`;

    const basePriceUSD = (state.ramGb * 0.35) + (state.vcpuCores * 0.50) + ((state.storageGb / 10) * 0.20);
    const displayPrice = formatPrice(basePriceUSD);

    if (calcTotalPrice) {
      calcTotalPrice.textContent = displayPrice;
    }
  }

  [ramSlider, cpuSlider, diskSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', updateCalculator);
  });

  // User Reviews & Submissions
  const userReviewsGrid = document.getElementById('userReviewsGrid');
  const submitReviewForm = document.getElementById('submitReviewForm');

  const defaultReviews = [
    {
      name: 'Aarav Sharma',
      role: 'Owner, CraftKingdom SMP',
      rating: 5,
      text: 'Nexify Host gives me solid 20 TPS on my 80+ player Minecraft SMP. Zero lag and sub-12ms ping!'
    },
    {
      name: 'Rohan Verma',
      role: 'Discord Bot Developer',
      rating: 5,
      text: 'Upgraded my bot cluster to Basic Node and Plus Matrix. Response times dropped significantly.'
    },
    {
      name: 'Vikram Patel',
      role: 'FiveM Host',
      rating: 5,
      text: 'Customer support on Discord is 10/10. Founder nexxy and the team helped transfer our plugins instantly.'
    }
  ];

  function loadReviews() {
    if (!userReviewsGrid) return;
    const saved = localStorage.getItem('nexify_user_reviews');
    let reviews = defaultReviews;

    if (saved) {
      try { reviews = JSON.parse(saved); } catch (err) {}
    }

    userReviewsGrid.innerHTML = reviews.map(rev => {
      const starIcons = Array(rev.rating).fill('<i data-lucide="star"></i>').join('');
      const initial = rev.name ? rev.name.charAt(0).toUpperCase() : 'U';

      return `
        <div class="review-card">
          <div class="stars">${starIcons}</div>
          <p class="review-text">"${rev.text}"</p>
          <div class="reviewer">
            <div class="avatar-circle">${initial}</div>
            <div>
              <div class="reviewer-name">${rev.name}</div>
              <div class="reviewer-role">${rev.role}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  if (submitReviewForm) {
    submitReviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('revName').value.trim();
      const roleInput = document.getElementById('revRole').value.trim();
      const ratingInput = parseInt(document.getElementById('revRating').value);
      const textInput = document.getElementById('revText').value.trim();

      if (!nameInput || !textInput) return;

      const newRev = {
        name: nameInput,
        role: roleInput || 'Community Member',
        rating: ratingInput,
        text: textInput
      };

      const saved = localStorage.getItem('nexify_user_reviews');
      let reviews = defaultReviews;
      if (saved) {
        try { reviews = JSON.parse(saved); } catch (err) {}
      }

      reviews.unshift(newRev);
      localStorage.setItem('nexify_user_reviews', JSON.stringify(reviews));

      submitReviewForm.reset();
      loadReviews();
      showToast('⭐ Thank you! Your review has been published.');
    });
  }

  // Toast Function
  const toastContainer = document.getElementById('toastContainer');
  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${msg}</span>`;
    toastContainer.appendChild(toast);

    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Initial renders
  renderPlans(state.activeTab);
  updateCalculator();
  loadReviews();
});

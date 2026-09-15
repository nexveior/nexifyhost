/* ------------------------------------------------------------------ */
/*  NexifyHost — central site configuration                           */
/*  Minecraft (primary) · Bot Hosting · Game Servers · Domains         */
/* ------------------------------------------------------------------ */

export const site = {
  brandName: "Nexify",
  brandAccent: "Host",
  discord: "https://discord.gg/ezydpvUF7J",
  trustpilot: "#",
  gamePanel: "#",
  statusPage: "/status",
};

export const banner = {
  show: true,
  text: "Free plans up for grabs — invite friends in our Discord to unlock one",
};

/* ---------------------------- CURRENCY ---------------------------- */

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // multiplier from INR
  decimals: number;
}

/** INR is the base currency (rate 1) and the site default. */
export const currencies: Currency[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 1, decimals: 0 },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 0.012, decimals: 2 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.011, decimals: 2 },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    rate: 0.0094,
    decimals: 2,
  },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 0.044, decimals: 2 },
  {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    rate: 0.018,
    decimals: 2,
  },
  {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    rate: 0.016,
    decimals: 2,
  },
  {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    rate: 0.016,
    decimals: 2,
  },
  {
    code: "BRL",
    symbol: "R$",
    name: "Brazilian Real",
    rate: 0.065,
    decimals: 2,
  },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 1.75, decimals: 0 },
];

export const defaultCurrency = "INR";

/* ------------------------- FREE PLAN NOTE ------------------------- */

export const freeOffer = {
  title: "Free plans, earned not bought",
  short: "Free plans available via Discord invites",
  description:
    "We hand out free servers to active community members. Invite friends to our Discord and unlock a free plan — no card, no catch.",
  cta: "Unlock via Discord",
};

/* ------------------------------ HERO ------------------------------ */

export const hero = {
  badge: "Minecraft Server Hosting",
  titlePrefix: "Premium",
  titleAccent: "Minecraft",
  titleSuffix: "Hosting",
  subtitle:
    "Lag-free Minecraft servers on high-clock Ryzen CPUs and NVMe storage. Java & Bedrock, one-click modpacks, free DDoS protection — online in under 60 seconds.",
  primaryCta: { label: "View Plans", href: "/minecraft" },
  secondaryCta: {
    label: "Join our Discord",
    href: "https://discord.gg/ezydpvUF7J",
  },
  stats: [
    { icon: "clock", value: "99.9%", label: "Uptime SLA" },
    { icon: "users", value: "12K+", label: "Servers Hosted" },
    { icon: "shield", value: "2.4Tbps", label: "DDoS Protection" },
    { icon: "zap", value: "<50ms", label: "Avg. Latency" },
  ],
  highlights: [
    "Java & Bedrock",
    "One-click modpacks",
    "Instant setup",
    "Free plans via Discord",
  ],
};

export const partners = [
  { name: "Intel" },
  { name: "AMD" },
  { name: "Pterodactyl" },
  { name: "Cloudflare" },
  { name: "Hetzner" },
];

/* ----------------------------- PLANS ------------------------------ */

export interface Plan {
  name: string;
  ram?: string;
  price: number | string; // in INR or custom CTA label
  popular?: boolean;
  specs: string[];
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  cpu: string;
  bestFor: string;
  plans: Plan[];
}

/* ------------------- MINECRAFT (primary service) ------------------ */

export const minecraft = {
  badge: "Minecraft Hosting",
  title: "Choose Your Plan",
  subtitle:
    "Three families of Minecraft servers — pick the power level that fits your community and budget.",
  categories: [
    {
      id: "budget",
      name: "Budget",
      tagline: "Affordable servers for small SMPs",
      description:
        "The cheapest way to get a stable Minecraft server online. Ideal for vanilla worlds and small friend groups that don't need heavy plugins.",
      image: "/images/budget.webp",
      accent: "#22C55E",
      cpu: "Ryzen 5 3600 · 4.2 GHz",
      bestFor: "Vanilla & small SMP · up to ~15 players",
      plans: [
        {
          name: "Aether",
          ram: "2 GB",
          price: 30,
          specs: [
            "2 GB DDR5 RAM",
            "65% Dedicated CPU Allocation",
            "15 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Zephyr",
          ram: "4 GB",
          price: 60,
          popular: true,
          specs: [
            "4 GB DDR5 RAM",
            "120% Dedicated CPU Allocation",
            "30 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Nyx",
          ram: "6 GB",
          price: 90,
          specs: [
            "6 GB DDR5 RAM",
            "180% Dedicated CPU Allocation",
            "45 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Helix",
          ram: "8 GB",
          price: 120,
          specs: [
            "8 GB DDR5 RAM",
            "250% Dedicated CPU Allocation",
            "60 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Solaris",
          ram: "12 GB",
          price: 180,
          specs: [
            "12 GB DDR5 RAM",
            "300% Dedicated CPU Allocation",
            "90 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Vortex",
          ram: "24 GB",
          price: 360,
          specs: [
            "24 GB DDR5 RAM",
            "400% Dedicated CPU Allocation",
            "180 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Echelon",
          ram: "48 GB",
          price: 720,
          specs: [
            "48 GB DDR5 RAM",
            "800% Dedicated CPU Allocation",
            "360 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Custom Architecture",
          ram: "Custom",
          price: "Create Ticket",
          specs: [
            "Custom RAM",
            "Custom CPU Allocation",
            "Custom NVMe Storage",
            "Tailored hardware resource framework",
            "Custom deployment options",
          ],
        },
      ],
    },
    {
      id: "standard",
      name: "Standard",
      tagline: "Balanced power for growing communities",
      description:
        "Our most popular family. Higher clock speeds and dedicated resources for plugin-heavy servers, modpacks and communities that are growing fast.",
      image: "/images/standard.webp",
      accent: "#2563EB",
      cpu: "Ryzen 7 5800X · 4.7 GHz",
      bestFor: "Plugins & modpacks · up to ~60 players",
      plans: [
        {
          name: "Essential Engine",
          ram: "4 GB",
          price: 89,
          specs: [
            "4 GB DDR5 RAM",
            "150% Dedicated CPU Allocation",
            "20 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Xenora Matrix",
          ram: "8 GB",
          price: 175,
          specs: [
            "8 GB DDR5 RAM",
            "250% Dedicated CPU Allocation",
            "35 GB Gen4 NVMe Storage",
          ],
          popular: true,
        },
        {
          name: "Apex Tier",
          ram: "12 GB",
          price: 351,
          specs: [
            "12 GB DDR5 RAM",
            "350% Dedicated CPU Allocation",
            "50 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Quantum Core",
          ram: "24 GB",
          price: 615,
          specs: [
            "24 GB DDR5 RAM",
            "600% Dedicated CPU Allocation",
            "100 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Nova Nexus",
          ram: "32 GB",
          price: 879,
          specs: [
            "32 GB DDR5 RAM",
            "800% Dedicated CPU Allocation",
            "150 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Enterprise Overlord",
          ram: "48 GB",
          price: 1143,
          specs: [
            "48 GB DDR5 RAM",
            "1200% Dedicated CPU Allocation",
            "200 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Custom Core Architecture",
          ram: "Custom",
          price: "Create Ticket",
          specs: [
            "Custom RAM",
            "Custom CPU Allocation",
            "Custom NVMe Storage",
            "Tailored hardware resource framework",
            "Custom deployment options",
            "Global Locations",
          ],
        },
      ],
    },
    {
      id: "performance",
      name: "Performance",
      tagline: "Maximum TPS for large networks",
      description:
        "Top-bin Ryzen 9 hardware with Gen4 NVMe for the heaviest modpacks, big networks and public servers that must never drop a tick.",
      image: "/images/premium.webp",
      accent: "#F59E0B",
      cpu: "Ryzen 9 7950X · 5.7 GHz",
      bestFor: "Networks & heavy modpacks · 100+ players",
      plans: [
        {
          name: "Vanguard Node",
          ram: "4 GB",
          price: 220,
          specs: [
            "4 GB DDR5 RAM",
            "200% Dedicated CPU Allocation",
            "35 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Catalyst Core",
          ram: "8 GB",
          price: 440,
          specs: [
            "8 GB DDR5 RAM",
            "350% Dedicated CPU Allocation",
            "60 GB Gen4 NVMe Storage",
          ],
          popular: true,
        },
        {
          name: "Synapse Prime",
          ram: "12 GB",
          price: 664,
          specs: [
            "12 GB DDR5 RAM",
            "500% Dedicated CPU Allocation",
            "90 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Overdrive Matrix",
          ram: "24 GB",
          price: 1329,
          specs: [
            "24 GB DDR5 RAM",
            "800% Dedicated CPU Allocation",
            "160 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Kinetic Horizon",
          ram: "32 GB",
          price: 1773,
          specs: [
            "32 GB DDR5 RAM",
            "1000% Dedicated CPU Allocation",
            "220 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Singularity Protocol",
          ram: "48 GB",
          price: 2658,
          specs: [
            "48 GB DDR5 RAM",
            "1600% Dedicated CPU Allocation",
            "320 GB Gen4 NVMe Storage",
          ],
        },
        {
          name: "Custom Prowess Architecture",
          ram: "Custom",
          price: "Create Ticket",
          specs: [
            "Custom RAM",
            "Custom CPU Allocation",
            "Custom NVMe Storage",
            "Tailored hardware resource framework",
            "Custom deployment options",
            "Global Locations",
          ],
        },
      ],
    },
  ] as Category[],
  footerText: "Need something bigger or custom?",
  footerLink: "Talk to us on Discord",
};

/* -------------------------- BOT HOSTING --------------------------- */

export const botHosting = {
  badge: "Bot Hosting",
  title: "Discord Bot Hosting",
  subtitle:
    "Keep your bot online 24/7 on always-on infrastructure. Deploy from Git, watch logs live, and let auto-restart handle the rest.",
  runtimes: [
    {
      name: "Node.js",
      image: "/images/node.webp",
      note: "discord.js · v18–v22",
    },
    {
      name: "Python",
      image: "/images/python.webp",
      note: "discord.py · 3.9–3.12",
    },
    { name: "Java", image: "/images/java.webp", note: "JDA · 17 & 21" },
    { name: "Go", image: "/images/go.svg", note: "discordgo · latest" },
    { name: "PHP", image: "/images/php.webp", note: "DiscordPHP · 8.x" },
    { name: "Lua", image: "/images/lua.svg", note: "Discordia · 5.4" },
  ],
  plans: [
    {
      name: "Basic Node",
      ram: "1 GB",
      price: 54,
      specs: [
        "1 GB DDR5 RAM",
        "75% Dedicated CPU Allocation",
        "5 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Plus Matrix",
      ram: "2 GB",
      price: 108,
      popular: true,
      specs: [
        "2 GB DDR5 RAM",
        "100% Dedicated CPU Allocation",
        "10 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Pro Tier",
      ram: "4 GB",
      price: 216,
      specs: [
        "4 GB DDR5 RAM",
        "150% Dedicated CPU Allocation",
        "15 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Advanced Core",
      ram: "8 GB",
      price: 423,
      specs: [
        "8 GB DDR5 RAM",
        "250% Dedicated CPU Allocation",
        "25 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Elite Nexus",
      ram: "16 GB",
      price: 846,
      specs: [
        "16 GB DDR5 RAM",
        "400% Dedicated CPU Allocation",
        "40 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Ultimate Overlord",
      ram: "24 GB",
      price: 1260,
      specs: [
        "24 GB DDR5 RAM",
        "600% Dedicated CPU Allocation",
        "60 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Custom App Framework",
      ram: "Custom",
      price: "Create Ticket",
      specs: [
        "Custom RAM",
        "Custom CPU Allocation",
        "Custom NVMe Storage",
        "Tailored hardware resource framework",
        "Bespoke budget & specs",
        "Custom project parameters",
      ],
    },
  ] as Plan[],
  features: [
    {
      icon: "code",
      title: "Any Language",
      description:
        "Node.js, Python, Java, Go, PHP and Lua images ready to go — or bring your own.",
    },
    {
      icon: "git",
      title: "Git Deploys",
      description:
        "Push to your repo and your bot redeploys automatically. Roll back in one click.",
    },
    {
      icon: "heart",
      title: "Auto-Restart",
      description:
        "Crash watchdogs bring your bot back within seconds, any time of day.",
    },
    {
      icon: "terminal",
      title: "Live Console",
      description:
        "Stream logs in real time and run commands directly from the panel.",
    },
    {
      icon: "database",
      title: "Free Database",
      description:
        "MongoDB or MySQL included on higher plans — no external service needed.",
    },
    {
      icon: "clock",
      title: "24/7 Uptime",
      description:
        "Always-on nodes with monitoring so your bot never silently disappears.",
    },
  ],
};

/* ------------------- GAME SERVERS (general) ----------------------- */

export const gameServers = {
  badge: "Game Servers",
  title: "General Game Hosting",
  subtitle:
    "One flexible plan family for everything beyond Minecraft — pick your RAM, we handle the rest. Popular titles supported on request.",
  supported: [
    "Rust",
    "ARK: Survival",
    "Counter-Strike 2",
    "Garry's Mod",
    "Valheim",
    "Palworld",
    "Terraria",
    "Project Zomboid",
  ],
  note: "Don't see your game? Ask us on Discord — if the server software runs on Linux, we can host it.",
  plans: [
    {
      name: "Ignite",
      ram: "4 GB",
      price: 269,
      specs: [
        "4 GB DDR5 RAM",
        "150% Dedicated CPU Allocation",
        "20 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Velocity",
      ram: "8 GB",
      price: 449,
      popular: true,
      specs: [
        "8 GB DDR5 RAM",
        "250% Dedicated CPU Allocation",
        "35 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Titan",
      ram: "12 GB",
      price: 719,
      specs: [
        "12 GB DDR5 RAM",
        "350% Dedicated CPU Allocation",
        "50 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Phantom",
      ram: "24 GB",
      price: 1079,
      specs: [
        "24 GB DDR5 RAM",
        "600% Dedicated CPU Allocation",
        "100 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Infinity",
      ram: "32 GB",
      price: 1439,
      specs: [
        "32 GB DDR5 RAM",
        "800% Dedicated CPU Allocation",
        "150 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Dominion",
      ram: "48 GB",
      price: 1889,
      specs: [
        "48 GB DDR5 RAM",
        "1200% Dedicated CPU Allocation",
        "200 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Ascendant",
      ram: "64 GB",
      price: 2519,
      specs: [
        "64 GB DDR5 RAM",
        "1600% Dedicated CPU Allocation",
        "300 GB Gen4 NVMe Storage",
      ],
    },
    {
      name: "Custom Forge",
      ram: "Custom",
      price: "Create Ticket",
      specs: [
        "Custom RAM",
        "Custom CPU Allocation",
        "Custom NVMe Storage",
        "Tailored hardware resource framework",
        "Custom server configuration",
        "Custom Quote",
      ],
    },
  ] as Plan[],
};

/* ---------------------------- DOMAINS ----------------------------- */

export const domains = {
  badge: "Domains",
  title: "Grab Your Domain",
  subtitle:
    "We register a hand-picked set of the most useful TLDs for gaming communities — free DNS management and instant setup on every one.",
  note: "This is the full list we currently register. Need a TLD that isn't here? Ask on Discord and we'll try to add it.",
  tlds: [
    {
      tld: ".fun",
      price: "149",
      popular: true,
      note: "Perfect for gaming servers",
    },
    {
      tld: ".xyz",
      price: 249,
      popular: true,
      note: "Affordable and modern",
    },
    {
      tld: ".site",
      price: 379,
      note: "Simple all-purpose choice",
    },
    {
      tld: ".shop",
      price: 449,
      note: "Perfect for online stores",
    },
    {
      tld: ".com",
      price: 999,
      popular: true,
      note: "The classic — best for brands",
    },
    {
      tld: ".net",
      price: 1099,
      note: "Networks and infrastructure",
    },
    {
      tld: ".org",
      price: 1049,
      note: "Communities and projects",
    },
    {
      tld: ".io",
      price: 1299,
      note: "Built for tech and startups",
    },
    {
      tld: ".gg",
      price: 899,
      popular: true,
      note: "Made for gaming communities",
    },
    {
      tld: ".tech",
      price: 599,
      note: "For developers and technology",
    },
    {
      tld: ".cloud",
      price: 749,
      note: "Cloud and infrastructure projects",
    },
    {
      tld: ".host",
      price: 799,
      note: "Perfect for hosting services",
    },
    {
      tld: ".bot",
      price: 699,
      note: "Ideal for bots and automation",
    },
    {
      tld: ".in",
      price: 699,
      popular: true,
      note: "Great for Indian communities",
    },
    {
      tld: ".us",
      price: 749,
      note: "For US-based projects",
    },
    {
      tld: ".uk",
      price: 799,
      note: "For UK-based projects",
    },
    {
      tld: ".co.in",
      price: 649,
      note: "Great for Indian businesses",
    },
  ],
  features: [
    {
      icon: "lock",
      title: "Free WHOIS Privacy",
      description:
        "Your personal details stay hidden from public WHOIS lookups.",
    },
    {
      icon: "settings",
      title: "Full DNS Control",
      description:
        "A, AAAA, CNAME, MX, SRV and TXT records — perfect for Minecraft SRV setups.",
    },
    {
      icon: "zap",
      title: "Instant Activation",
      description:
        "Domains are live within minutes and connect to your server in one click.",
    },
  ],
};

/* ---------------------------- FEATURES ---------------------------- */

export const features = {
  badge: "Why NexifyHost",
  title: "Built for Minecraft",
  subtitle:
    "Every part of our stack is tuned for one thing — keeping your Minecraft world running at 20 TPS.",
  items: [
    {
      icon: "cpu",
      title: "High-Clock CPUs",
      description:
        "Ryzen chips up to 5.7 GHz — Minecraft is single-thread hungry, so clock speed is king.",
    },
    {
      icon: "zap",
      title: "Instant Setup",
      description:
        "Your server is online within 60 seconds of checkout, pre-configured and ready to join.",
    },
    {
      icon: "shield",
      title: "Free DDoS Protection",
      description:
        "Minecraft-aware filtering absorbs attacks at the edge so your players never get kicked — always on, always included, no configuration needed.",
      wide: true,
    },
    {
      icon: "plug",
      title: "1-Click Plugins & Mods",
      description:
        "Install from thousands of plugins, mods and full modpacks straight from the panel.",
    },
    {
      icon: "archive",
      title: "Automatic Backups",
      description:
        "Scheduled offsite backups with one-click restore keep every world safe.",
    },
    {
      icon: "settings",
      title: "Full Panel Control",
      description:
        "File manager, console, schedulers, sub-users and version switching — all included.",
    },
    {
      icon: "chart",
      title: "Instant Upgrades",
      description:
        "Add RAM or CPU as your community grows — applied instantly, no world migration.",
    },
  ],
};

/* ------------------------- PANEL SHOWCASE ------------------------- */

export const showcase = {
  badge: "Our Panel",
  title: "Experience Our Platform",
  subtitle: "A custom-built control panel that puts every tool one click away.",
  autoAdvance: 5000,
  cards: [
    {
      icon: "terminal",
      title: "Shell Access",
      description:
        "Manage your server directly through our own custom shell — no third-party tools required.",
    },
    {
      icon: "plug",
      title: "Plugin Manager",
      description:
        "Browse and install thousands of Spigot & Paper plugins with a single click.",
    },
    {
      icon: "archive",
      title: "Modpack Manager",
      description:
        "One-click Forge, Fabric and CurseForge modpack installs with automatic version handling.",
    },
    {
      icon: "heart",
      title: "TPS Analytics",
      description:
        "Live TPS, RAM, CPU and player charts with detailed historical logs.",
    },
  ],
};

/* --------------------------- LOCATIONS ---------------------------- */

export const locations = {
  badge: "Network",
  title: "A Truly Global Network",
  subtitle:
    "Anycast edge points across five continents keep ping low no matter where your players connect from.",
  markers: [
    { name: "New York", lat: 40.71, lng: -74.0 },
    { name: "São Paulo", lat: -23.55, lng: -46.63 },
    { name: "Mexico City", lat: 19.43, lng: -99.13 },
    { name: "Istanbul", lat: 41.0, lng: 28.97 },
    { name: "Cairo", lat: 30.04, lng: 31.23 },
    { name: "Mumbai", lat: 19.07, lng: 72.87 },
    { name: "Dhaka", lat: 23.81, lng: 90.41 },
    { name: "Beijing", lat: 39.9, lng: 116.4 },
    { name: "Osaka", lat: 34.69, lng: 135.5 },
    { name: "Manila", lat: 14.59, lng: 120.98 },
  ],
};

/* ------------------------------ FAQ ------------------------------- */

export const faq = {
  title: "Frequently Asked Questions",
  subtitle:
    "Everything you need to know before launching. Still unsure? Our team is one message away.",
  items: [
    {
      question: "How do I get a free plan?",
      answer:
        "Free plans are community rewards rather than a public tier — invite friends to our Discord and you can unlock one through our invite rewards. Hop into the server, check the rewards channel, and our team will set you up. No credit card is ever required.",
    },
    {
      question:
        "What's the difference between Budget, Standard and Performance?",
      answer:
        "They differ by CPU and storage class. Budget runs on Ryzen 5 (4.2 GHz) for vanilla and light plugin servers. Standard uses Ryzen 7 (4.7 GHz) for plugin-heavy servers and modpacks. Performance runs top-bin Ryzen 9 (5.7 GHz) with Gen4 NVMe for large networks and the heaviest modpacks.",
    },
    {
      question: "How much RAM do I actually need?",
      answer:
        "As a rough guide: 2–4 GB for vanilla or light plugins with up to 15 players, 6–8 GB for medium modpacks or 30+ players, and 12 GB or more for large modpacks and networks. If you're unsure, start smaller — upgrading is instant and never requires a migration.",
    },
    {
      question: "Which languages can I host my Discord bot in?",
      answer:
        "We provide ready-made images for Node.js, Python, Java, Go, PHP and Lua, with Git deploys and auto-restart on every plan. If you need a runtime we don't list, ask on Discord — custom images are usually no problem.",
    },
    {
      question: "Do you support games other than Minecraft?",
      answer:
        "Yes — our general game hosting plans cover titles like Rust, ARK, CS2, Garry's Mod, Valheim, Palworld and more. If the server software runs on Linux, we can usually host it, so just ask.",
    },
    {
      question: "Can I buy a domain from you?",
      answer:
        "We register a curated set of popular TLDs including .com, .in, .xyz, .fun and more, all with free WHOIS privacy and full DNS control — including SRV records so players can join your Minecraft server without typing a port.",
    },
  ],
};

/* --------------------------- LEGAL PAGES -------------------------- */

export const legalDropdown = [
  {
    name: "Terms of Service",
    href: "/terms-of-services",
    description: "Our service agreement and usage terms",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
    description: "How we handle and protect your data",
  },
];

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export const legalDocs: Record<string, LegalDoc> = {
  "terms-of-services": {
    title: "Terms of Service",
    updated: "Last updated: August 2026",
    intro:
      "These Terms of Service govern your use of NexifyHost services, infrastructure and related products. By creating an account, purchasing a service or continuing to use our infrastructure, you agree to these terms.",

    sections: [
      {
        heading: "1. Services",
        paragraphs: [
          "NexifyHost provides Minecraft server hosting, Discord bot hosting, game server hosting, VPS and dedicated infrastructure, domain registration and related digital services.",
          "Services are provisioned according to the specifications displayed at the time of purchase. NexifyHost may improve, upgrade, reconfigure or migrate infrastructure when necessary, provided that the core service specifications are not materially reduced.",
          "Services are provided on an as-is and as-available basis. Infrastructure, availability and features may change as NexifyHost maintains and improves its systems.",
        ],
      },

      {
        heading: "2. Account Responsibility",
        paragraphs: [
          "You are responsible for keeping your account credentials, passwords, API keys, SSH keys and other authentication information secure.",
          "You are responsible for all activity performed through your account and services, including activity performed by sub-users or other people to whom you provide access.",
          "You must provide accurate registration information and keep it reasonably up to date. Accounts are non-transferable unless explicitly approved by NexifyHost.",
        ],
      },

      {
        heading: "3. Infrastructure Integrity & Acceptable Use",
        paragraphs: [
          "You may not use NexifyHost infrastructure in a manner that intentionally compromises, destabilizes or interferes with the infrastructure or services of NexifyHost or other customers.",
          "Unauthorized resource saturation, network manipulation, intentional service overloading, hypervisor exploitation, resource-limit bypassing or similar activity is prohibited.",
          "You may not use the service to host malware, phishing systems, botnet command-and-control infrastructure, DDoS scripts, malicious traffic systems, unauthorized cryptomining or other harmful software.",
          "Pirated, nulled, leaked, cracked or otherwise unauthorized software and illegal assets are prohibited.",
          "Activities designed to bypass execution limits, resource restrictions or platform controls are prohibited.",
        ],
      },

      {
        heading: "4. Fair Resource Usage",
        paragraphs: [
          "Shared infrastructure operates under a fair-share resource model. Customers must use CPU, RAM, disk I/O and network resources reasonably within the capabilities of their purchased service.",
          "Disproportionate CPU usage, excessive disk I/O, network congestion, memory leaks, automated loops or poorly optimized configurations that negatively affect shared infrastructure may result in throttling, isolation or suspension.",
          "Customers may be required to optimize harmful mods, entities, plugins, configurations or workloads after receiving a warning.",
        ],
      },

      {
        heading: "5. Network & Security Restrictions",
        paragraphs: [
          "Open mail relays, spam infrastructure, unauthorized open proxies, malicious proxy farms, packet flooding, network scanning and similar abusive network activity are prohibited.",
          "Customers may not manipulate BGP routing, intentionally abuse IP reputation, bypass network security controls or use infrastructure to conduct unauthorized attacks.",
          "Grey-hat scraping, proxy operations or similar high-risk activity may require prior verification and written authorization.",
          "An IP address or service associated with malicious traffic, spam, attacks or other serious abuse may be isolated or suspended.",
        ],
      },

      {
        heading: "6. Commercial Use & Redistribution",
        paragraphs: [
          "Subleasing, white-labeling, redistribution or reselling NexifyHost services is prohibited unless specifically authorized through a separate agreement.",
          "Commercial self-promotion, unsolicited external links, portfolio distribution and B2B solicitation through NexifyHost communities or infrastructure require appropriate authorization.",
          "Unsolicited direct messages targeting NexifyHost customers, staff or personnel are prohibited. Partnerships and cross-promotional activities should be coordinated through NexifyHost management.",
        ],
      },

      {
        heading: "7. Support & Service Triage",
        paragraphs: [
          "Technical, billing and service issues must be submitted through the official NexifyHost support or ticket system.",
          "Customers should not bypass established support channels by directly contacting engineers or other staff members for operational requests.",
          "Support requests are handled according to severity, service impact and applicable contractual or service-level priority.",
        ],
      },

      {
        heading: "8. Service Availability & Maintenance",
        paragraphs: [
          "NexifyHost may perform maintenance, upgrades, migrations, emergency repairs and infrastructure changes when necessary.",
          "Where reasonably possible, planned maintenance may be communicated through appropriate service channels.",
          "NexifyHost does not guarantee uninterrupted availability unless a specific service-level agreement explicitly provides otherwise.",
        ],
      },

      {
        heading: "9. Payments & Currency",
        paragraphs: [
          "Customers are responsible for paying all applicable service charges, taxes and other fees associated with their purchases.",
          "NexifyHost may operate using a primary billing currency. Customers are responsible for exchange-rate differences, bank charges, intermediary fees, remittance costs and applicable taxes.",
          "International payment methods may involve gateway, cross-border or foreign-exchange costs. Where an approved international refund is issued, applicable processing or conversion costs may be deducted.",
          "Volatile, restricted or otherwise high-risk payment mechanisms may be subject to additional conditions and may be considered final where disclosed before payment.",
        ],
      },

      {
        heading: "10. Refund Policy",
        paragraphs: [
          "NexifyHost services are generally non-refundable after provisioning or engineering work has begun, except where a refund is specifically permitted under the applicable refund guidelines.",
          "Change of mind, budget changes, failure to use a service or dissatisfaction with a customer's own configuration do not automatically qualify for a refund.",
          "Dedicated servers, VPS services, domains and other operational services may be non-refundable once successfully provisioned and confirmed operational.",
          "Custom development, technical provisioning, modpacks, plugins, configuration work, commercial add-ons, licensing keys and intellectual-property-related work may become non-refundable once engineering or fulfillment begins.",
          "For eligible shared Minecraft hosting, application hosting and bot hosting services, refund requests may be considered within the applicable refund window where a significant issue caused by NexifyHost prevents normal service operation.",
          "Third-party infrastructure outages, customer configuration problems, abuse violations and customer-caused issues generally do not qualify for refunds.",
          "Approved refunds or service credits may require several business days to process depending on the payment provider.",
          "Customers should contact NexifyHost support before initiating a payment dispute or chargeback. Unauthorized chargebacks may result in service termination and forfeiture of associated services or data.",
        ],
      },

      {
        heading: "11. Abuse & Service Suspension",
        paragraphs: [
          "NexifyHost may temporarily isolate, throttle or suspend services involved in resource abuse, malicious activity, network attacks or activities that threaten infrastructure stability.",
          "Examples include automated overload loops, memory abuse, cryptocurrency mining, packet flooding, unauthorized scanning, phishing, malicious traffic and attempts to bypass platform restrictions.",
          "Serious or malicious activity may result in immediate service decommissioning without a recovery guarantee.",
        ],
      },

      {
        heading: "12. Intellectual Property & Legal Compliance",
        paragraphs: [
          "Customers must have appropriate rights, licenses and permissions for all software, files, content and intellectual property hosted on NexifyHost infrastructure.",
          "Piracy, copyright infringement, leaked software, nulled products, unauthorized distribution and intellectual-property theft are prohibited.",
          "Valid legal, copyright, DMCA or cybersecurity claims may result in temporary suspension while NexifyHost investigates the matter.",
          "Customers are responsible for complying with applicable laws and regulations relating to their hosted content and activities.",
        ],
      },

      {
        heading: "13. Service Expiration & Data Deletion",
        paragraphs: [
          "Services may be suspended when an invoice expires or a renewal payment fails.",
          "Suspended Minecraft, bot and development workspaces may be retained for up to 48 hours after suspension.",
          "VPS and dedicated infrastructure backups may be retained for up to 72 hours.",
          "After the applicable retention period expires, data may be permanently and unrecoverably deleted.",
          "Customers are responsible for maintaining independent backups of important data.",
        ],
      },

      {
        heading: "14. Age & Account Eligibility",
        paragraphs: [
          "Account owners must generally be at least 16 years old or have the legal capacity required to enter into the applicable agreement.",
          "Where minors use services with parental or guardian involvement, the responsible parent or guardian must ensure compliance with these terms.",
          "False registration information, fraudulent credentials or identity misrepresentation may result in account closure.",
        ],
      },

      {
        heading: "15. Administrative Rights",
        paragraphs: [
          "NexifyHost reserves the right to deny, cancel, restrict or refuse service where necessary to protect its infrastructure, users, staff or business operations.",
          "Where termination occurs without customer fault, NexifyHost may provide applicable prorated credit and a limited period for database or service-data export where technically possible.",
          "Severe threats, harassment, abuse or serious misconduct toward staff may result in immediate termination and loss of the normal retrieval window.",
        ],
      },

      {
        heading: "16. Third-Party Services",
        paragraphs: [
          "NexifyHost may rely on third-party payment processors, domain registries, infrastructure providers, network providers and other service providers.",
          "Third-party outages or failures outside NexifyHost's reasonable control may affect service availability and may not qualify for refunds or compensation.",
        ],
      },

      {
        heading: "17. Limitation of Liability",
        paragraphs: [
          "NexifyHost is not responsible for indirect, incidental, consequential or secondary losses, including loss of revenue, business opportunities, project value or expected profits.",
          "Services are provided as-is and as-available unless a separate written agreement states otherwise.",
          "To the maximum extent permitted by applicable law, NexifyHost's aggregate liability for an affected service is limited to the direct amount paid for that service during the applicable current monthly billing interval.",
        ],
      },

      {
        heading: "18. Customer Indemnification",
        paragraphs: [
          "Customers are responsible for their own content, applications, configurations and activities and agree to indemnify NexifyHost against claims, losses or liabilities arising from their unlawful activity, violation of these terms or infringement of third-party rights.",
        ],
      },

      {
        heading: "19. Terms Changes",
        paragraphs: [
          "NexifyHost may update these Terms of Service when necessary to reflect changes in services, infrastructure, legal requirements or operational policies.",
          "Continued use of NexifyHost services after an updated version becomes effective constitutes acceptance of the revised terms where permitted by applicable law.",
        ],
      },

      {
        heading: "20. Governing Rules & Support",
        paragraphs: [
          "Customers are expected to comply with applicable laws, Discord Terms of Service and Discord Community Guidelines when using NexifyHost-related communities or services.",
          "Questions regarding these terms, billing, refunds or service disputes should be submitted through the official NexifyHost support ticket system.",
        ],
      },
    ],
  },

  "privacy-policy": {
    title: "Privacy Policy",
    updated: "Last updated: August 2026",
    intro:
      "This Privacy Policy explains what information NexifyHost collects, why it is collected, how it is used and the choices available to customers regarding their information.",

    sections: [
      {
        heading: "1. Information We Collect",
        paragraphs: [
          "Account information may include your email address, username, account identifiers and securely stored authentication information such as hashed passwords.",
          "Billing information may include transaction references and billing details required by payment processors. Full payment-card numbers are not stored directly on NexifyHost servers when payment processing is handled by external payment providers.",
          "For domain registrations, we may collect registrant information required by the applicable domain registry.",
          "Operational information may include server resource metrics, panel actions, service logs, security logs and technical information required to operate and support your services.",
        ],
      },

      {
        heading: "2. How We Use Information",
        paragraphs: [
          "We use collected information to create accounts, provision and maintain services, process payments, provide customer support, prevent fraud and abuse, maintain infrastructure security and communicate essential service information.",
          "Technical logs and resource information may be used to troubleshoot incidents, investigate abuse and maintain infrastructure reliability.",
          "If you participate in Discord invite rewards or similar programs, we may process your Discord username and invite counts solely for eligibility verification and administration.",
        ],
      },

      {
        heading: "3. Data Sharing",
        paragraphs: [
          "NexifyHost does not sell personal data.",
          "Information may be shared with service providers that are necessary to operate the service, including payment gateways, domain registries, fraud-prevention providers, infrastructure providers and other operational processors.",
          "Information may also be disclosed when required by applicable law, court order, legal process or where reasonably necessary to protect users, staff, infrastructure or network security.",
        ],
      },

      {
        heading: "4. Data Processing & Privacy Responsibilities",
        paragraphs: [
          "Where customers process personal information through their own hosted applications, the customer is responsible for determining the appropriate legal basis, notices, permissions and security measures required by applicable privacy laws.",
          "Depending on the service and applicable law, NexifyHost may act as a data processor or service provider while the customer remains responsible for the data and purposes of processing within their application.",
          "Customers processing personal information are responsible for complying with applicable privacy laws, which may include GDPR, CCPA or other regional data-protection requirements.",
        ],
      },

      {
        heading: "5. Data Security",
        paragraphs: [
          "NexifyHost takes reasonable operational and technical measures to protect information and infrastructure against unauthorized access, misuse and security incidents.",
          "Customers are responsible for securing their own applications, directories, databases, passwords, API keys and SSH credentials.",
          "NexifyHost is not responsible for data loss or compromise caused by insecure customer applications, unpatched software, vulnerable plugins, exposed credentials or compromised customer accounts.",
          "Customers operating critical production services should maintain independent and off-site backups.",
        ],
      },

      {
        heading: "6. Logs & Operational Monitoring",
        paragraphs: [
          "NexifyHost may maintain technical, security and operational logs necessary to provide services, troubleshoot incidents, detect abuse and protect the network.",
          "Server resource metrics and service activity may be reviewed when required for infrastructure management, security investigations, support or enforcement of the Terms of Service.",
        ],
      },

      {
        heading: "7. Data Retention",
        paragraphs: [
          "Information may be retained for as long as reasonably necessary to provide services, maintain operational records, resolve disputes, comply with legal obligations and protect NexifyHost infrastructure.",
          "When services expire or are terminated, service data may be retained for a limited recovery period before permanent deletion according to the applicable service retention policy.",
          "Suspended Minecraft, bot and development workspaces may be retained for up to 48 hours, while VPS and dedicated infrastructure backups may be retained for up to 72 hours, after which data may be permanently deleted.",
        ],
      },

      {
        heading: "8. Government & Legal Requests",
        paragraphs: [
          "NexifyHost may disclose or preserve information where required by valid legal process, government request, court order or applicable law.",
          "Where legally permitted, NexifyHost may restrict, suspend or otherwise protect affected services while responding to lawful requests or investigating security and compliance matters.",
        ],
      },

      {
        heading: "9. Third-Party Processors",
        paragraphs: [
          "Third-party providers may process information on NexifyHost's behalf for services such as payment processing, domain registration, infrastructure, fraud prevention, communications and security.",
          "These providers may have their own privacy policies and contractual obligations governing how information is handled.",
        ],
      },

      {
        heading: "10. Customer Security Responsibilities",
        paragraphs: [
          "Customers must protect passwords, SSH keys, database credentials, API tokens and other sensitive authentication information.",
          "Customers should promptly report suspected account compromise or unauthorized access through the official support system.",
          "NexifyHost may restrict or throttle applications that present a significant security or infrastructure risk while an incident is investigated.",
        ],
      },

      {
        heading: "11. International Data & Infrastructure",
        paragraphs: [
          "Depending on the service, infrastructure and third-party provider involved, information may be processed or stored in different countries or regions.",
          "Customers are responsible for ensuring that their own use of hosted services complies with applicable data-transfer, privacy and regulatory requirements.",
        ],
      },

      {
        heading: "12. Your Choices",
        paragraphs: [
          "Customers may contact NexifyHost through the official support system regarding questions about account information, service data or privacy-related matters.",
          "Some information may need to be retained where required for billing, security, legal compliance, fraud prevention or legitimate operational purposes.",
        ],
      },

      {
        heading: "13. Privacy Policy Changes",
        paragraphs: [
          "NexifyHost may update this Privacy Policy when its services, data-processing practices or legal requirements change.",
          "The latest version published on the NexifyHost website will represent the current Privacy Policy.",
        ],
      },
    ],
  },
};

/* ----------------------------- FOOTER ----------------------------- */

export const footer = {
  tagline:
    "Premium Minecraft hosting, Discord bot hosting, game servers and domains — built for communities of every size.",
  columns: [
    {
      title: "Hosting",
      links: [
        { label: "Minecraft — Budget", href: "/minecraft/budget" },
        { label: "Minecraft — Standard", href: "/minecraft/standard" },
        { label: "Minecraft — Performance", href: "/minecraft/performance" },
        { label: "Discord Bot Hosting", href: "/bots" },
        { label: "Game Servers", href: "/gameservers" },
        { label: "Domains", href: "/domains" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Server Status", href: site.statusPage },
        { label: "Control Panel", href: site.gamePanel },
        { label: "Discord Community", href: site.discord },
        { label: "Free Plans (Invites)", href: site.discord },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms-of-services" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Refund Policy", href: "/terms-of-services" },
        { label: "Fair Usage", href: "/terms-of-services" },
      ],
    },
  ],
};

/* --------------------------- STATUS PAGE -------------------------- */

export const status = {
  badge: "Trust Center",
  title: "Live Service",
  accent: "Status",
  subtitle:
    "Real-time availability across every layer of our platform. This page refreshes automatically and is powered by the same probes that page our on-call engineers.",
  refreshSeconds: 30,
  services: [
    {
      id: "panel",
      name: "Game Panel",
      desc: "Dashboard, console & shell access",
      uptime: "99.98%",
      latency: 42,
      seed: 3,
    },
    {
      id: "mc",
      name: "Minecraft Nodes",
      desc: "Budget · Standard · Performance fleets",
      uptime: "99.95%",
      latency: 38,
      seed: 7,
    },
    {
      id: "bots",
      name: "Bot Hosting Nodes",
      desc: "Always-on Discord bot workers",
      uptime: "99.91%",
      latency: 51,
      seed: 11,
    },
    {
      id: "games",
      name: "Game Server Nodes",
      desc: "Dockerized multi-game runtimes",
      uptime: "99.97%",
      latency: 44,
      seed: 17,
    },
    {
      id: "dns",
      name: "Domains & DNS",
      desc: "Registrar, DNS zones & SSL issuance",
      uptime: "100.0%",
      latency: 23,
      seed: 23,
    },
    {
      id: "api",
      name: "Public API & Billing",
      desc: "Client API, orders & provisioning",
      uptime: "99.99%",
      latency: 35,
      seed: 29,
    },
  ],
  regions: [
    { name: "Mumbai Edge", ms: 11 },
    { name: "Singapore Edge", ms: 38 },
    { name: "Frankfurt Core", ms: 92 },
    { name: "New York Core", ms: 138 },
    { name: "São Paulo Edge", ms: 196 },
  ],
  incidents: [
    {
      date: "Jan 20, 2026",
      title: "Scheduled migration — node MC-EU-03",
      body: "Kernel and NVMe driver upgrade on one Frankfurt Minecraft node. Zero-downtime live migration was executed across a two-hour maintenance window.",
      tag: "Maintenance",
      tone: "amber" as const,
    },
    {
      date: "Jan 12, 2026",
      title: "Bot worker restart loop after faulty deploy",
      body: "A runtime image caused repeated restarts on a subset of bot hosting workers. Rollback completed in 45 minutes; no bot data or configurations were affected.",
      tag: "Resolved",
      tone: "emerald" as const,
    },
    {
      date: "Dec 28, 2025",
      title: "Upstream DDoS filtering flapping",
      body: "One transit provider briefly re-routed around our edge filters. Mitigation engaged automatically and connectivity normalized within 18 minutes.",
      tag: "Mitigated",
      tone: "emerald" as const,
    },
  ],
};

/* ------------------- BLUEPRINTS & EXTENSIONS ----------------------- */

export interface Extension {
  icon: string;
  name: string;
  price: number; // USD
  desc: string;
  flagship?: boolean;
}

export const blueprints = {
  badge: "Panel Store",
  title: "Blueprints",
  accent: "& Extensions",
  subtitle:
    "Production-grade extensions for our game panel — hand-built, security-reviewed and tuned to work together. Install once, our team maintains compatibility with every panel release.",
  note: "All extension prices are listed in USD.",
  categories: [
    {
      id: "ux",
      name: "UI, UX & Presentation",
      tagline:
        "Thirteen focused upgrades that make the panel feel like a native product.",
      accent: "#2563EB",
      items: [
        {
          icon: "table",
          name: "Blue Tables UI Modifier",
          price: 3.0,
          desc: "Responsive blue-accent table theme with sticky headers, zebra rows and compact mode.",
        },
        {
          icon: "brush",
          name: "Custom CSS Injection Tool",
          price: 4.0,
          desc: "Inject scoped stylesheets safely, with live preview, versioning and one-click rollback.",
        },
        {
          icon: "code",
          name: "Monaco Advanced Code Editor",
          price: 5.5,
          desc: "Upgrade every file editor to Monaco with IntelliSense, minimap and multi-cursor.",
        },
        {
          icon: "infinity",
          name: "No-Pagination Endless Scrolling",
          price: 3.5,
          desc: "Seamless infinite scroll in place of pagination — filters keep their live context.",
        },
        {
          icon: "users",
          name: "Player Listing Displays",
          price: 4.0,
          desc: "Real-time online player cards with avatars, ping and session duration.",
        },
        {
          icon: "package",
          name: "Pteromonaco Code Suite",
          price: 5.0,
          desc: "Monaco plus tabbed editing, syntax themes and editor code actions, bundled.",
        },
        {
          icon: "image",
          name: "Dynamic Server Backgrounds",
          price: 3.0,
          desc: "Animated, server-aware ambient backgrounds for the dashboard and login screen.",
        },
        {
          icon: "sidebar",
          name: "Sidebar Navigation Customizer",
          price: 3.5,
          desc: "Drag to reorder, pin and group sidebar navigation per user profile.",
        },
        {
          icon: "star",
          name: "Simple Favicon Manager",
          price: 2.0,
          desc: "Upload and swap panel favicons with instant CDN cache invalidation.",
        },
        {
          icon: "footer",
          name: "Simple Footer Editor",
          price: 2.5,
          desc: "Edit footer text, links and legal rows from the admin UI — zero code changes.",
        },
        {
          icon: "snowflake",
          name: "Snowflake Particle Overlay",
          price: 2.0,
          desc: "Configurable seasonal particle overlays with density and drift controls.",
        },
        {
          icon: "rocket",
          name: "Startup Changer Utility",
          price: 3.5,
          desc: "Switch between pre-built startup command profiles per game version in one click.",
        },
        {
          icon: "chart",
          name: "Static & Panel Statistics Views",
          price: 4.5,
          desc: "Embeddable TPS, players and uptime widgets for the panel or external sites.",
        },
      ] as Extension[],
    },
    {
      id: "auth",
      name: "Authentication, Integrations & Routing",
      tagline:
        "Deeper platform capabilities — identity, chat, alerts and network automation.",
      accent: "#8B5CF6",
      items: [
        {
          icon: "key",
          name: "Discord Authentication Blueprint",
          price: 12.0,
          desc: "Full OAuth2 Discord SSO with role-based permissions and guild membership validation.",
          flagship: true,
        },
        {
          icon: "shield",
          name: "Social OAuth Secure Login",
          price: 8.0,
          desc: "Google and GitHub sign-in with MFA-ready session management.",
        },
        {
          icon: "chat",
          name: "Tawk.to Live Chat Integration",
          price: 4.5,
          desc: "Embed Tawk.to with authenticated user context passed straight into tickets.",
        },
        {
          icon: "redirect",
          name: "Domain & Network Redirector",
          price: 4.0,
          desc: "Smart multi-domain redirects with path preservation and SSL handling.",
        },
        {
          icon: "bell",
          name: "Resource Threshold Alerts",
          price: 5.5,
          desc: "CPU, RAM and disk alerts delivered via panel notifications and webhooks.",
        },
        {
          icon: "globe",
          name: "Network Subdomain Manager",
          price: 7.5,
          desc: "Bulk-create, assign and release SRV and A records tied to allocations.",
        },
        {
          icon: "map",
          name: "Subdomains Mapping Matrix",
          price: 6.0,
          desc: "Visual map of every subdomain to its server, port and ownership state.",
        },
        {
          icon: "languages",
          name: "CoreSystem Translations Module",
          price: 9.0,
          desc: "Panel-wide i18n with per-user locales, crowd-editable packs and RTL support.",
        },
      ] as Extension[],
    },
  ],
  licensing: {
    icon: "shield",
    title: "One license, forever",
    body: "Every extension and module includes a permanent, non-expiring license for the purchased component. No recurring license renewal is required.",
  },
};

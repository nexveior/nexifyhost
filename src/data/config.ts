/* ------------------------------------------------------------------ */
/*  NexifyHost — central site configuration                           */
/*  Minecraft (primary) · Bot Hosting · Game Servers · Domains         */
/* ------------------------------------------------------------------ */

export const site = {
  brandName: "Nexify",
  brandAccent: "Host",
  logo: "https://nexifyhosting.vercel.app/images/logo.webp",
  discord: "https://discord.gg/ezydpvUF7J",
  trustpilot: "https://www.trustpilot.com/review/nexifyhost.fun",
  gamePanel: "https://control.nexifyhost.fun/auth/login",
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
  flag: string;
  rate: number; // multiplier from INR
  decimals: number;
}

/** INR is the base currency (rate 1) and the site default. */
export const currencies: Currency[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "IN", rate: 1, decimals: 0 },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "US", rate: 0.012, decimals: 2 },
  { code: "EUR", symbol: "€", name: "Euro", flag: "EU", rate: 0.011, decimals: 2 },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "GB", rate: 0.0094, decimals: 2 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "AE", rate: 0.044, decimals: 2 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "AU", rate: 0.018, decimals: 2 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "CA", rate: 0.016, decimals: 2 },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "SG", rate: 0.016, decimals: 2 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", flag: "BR", rate: 0.065, decimals: 2 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "JP", rate: 1.75, decimals: 0 },
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
  secondaryCta: { label: "Join our Discord", href: "https://discord.gg/ezydpvUF7J" },
  stats: [
    { icon: "clock", value: "99.9%", label: "Uptime SLA" },
    { icon: "users", value: "12K+", label: "Servers Hosted" },
    { icon: "shield", value: "2.4Tbps", label: "DDoS Protection" },
    { icon: "zap", value: "<50ms", label: "Avg. Latency" },
  ],
  highlights: ["Java & Bedrock", "One-click modpacks", "Instant setup", "Free plans via Discord"],
};

export const partners = [
  { name: "Intel", logo: "https://nexifyhosting.vercel.app/images/intel.svg" },
  { name: "AMD", logo: "https://nexifyhosting.vercel.app/images/amd.svg" },
  { name: "Pterodactyl", logo: "https://nexifyhosting.vercel.app/images/pterodactyl.svg" },
  { name: "Cloudflare", logo: "https://nexifyhosting.vercel.app/images/cloudflare.svg" },
  { name: "Hetzner", logo: "https://nexifyhosting.vercel.app/images/hetzner.svg" },
];

/* ----------------------------- PLANS ------------------------------ */

export interface Plan {
  name: string;
  ram?: string;
  price: number | string; // INR value, or a custom label like "Create Ticket"
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
      image: "https://nexifyhosting.vercel.app/images/budget.webp",
      accent: "#22C55E",
      cpu: "Ryzen 5 3600 · 4.2 GHz",
      bestFor: "Vanilla & small SMP · up to ~15 players",
      plans: [
        {
          name: "Aether",
          ram: "2 GB",
          price: 30,
          specs: ["2 GB DDR5 RAM", "65% Dedicated CPU Allocation", "15 GB Gen4 NVMe Storage"],
        },
        {
          name: "Zephyr",
          ram: "4 GB",
          price: 60,
          popular: true,
          specs: ["4 GB DDR5 RAM", "120% Dedicated CPU Allocation", "30 GB Gen4 NVMe Storage"],
        },
        {
          name: "Nyx",
          ram: "6 GB",
          price: 90,
          specs: ["6 GB DDR5 RAM", "180% Dedicated CPU Allocation", "45 GB Gen4 NVMe Storage"],
        },
        {
          name: "Helix",
          ram: "8 GB",
          price: 120,
          specs: ["8 GB DDR5 RAM", "250% Dedicated CPU Allocation", "60 GB Gen4 NVMe Storage"],
        },
        {
          name: "Solaris",
          ram: "12 GB",
          price: 180,
          specs: ["12 GB DDR5 RAM", "300% Dedicated CPU Allocation", "90 GB Gen4 NVMe Storage"],
        },
        {
          name: "Vortex",
          ram: "24 GB",
          price: 360,
          specs: ["24 GB DDR5 RAM", "400% Dedicated CPU Allocation", "180 GB Gen4 NVMe Storage"],
        },
        {
          name: "Echelon",
          ram: "48 GB",
          price: 720,
          specs: ["48 GB DDR5 RAM", "800% Dedicated CPU Allocation", "360 GB Gen4 NVMe Storage"],
        },
        {
          name: "Custom Architecture",
          ram: "Custom",
          price: "Create Ticket",
          specs: ["Custom RAM", "Custom CPU Allocation", "Custom NVMe Storage", "Tailored hardware resource framework", "Custom deployment options"],
        },
      ],
    },
    {
      id: "standard",
      name: "Standard",
      tagline: "Balanced power for growing communities",
      description:
        "Our most popular family. Higher clock speeds and dedicated resources for plugin-heavy servers, modpacks and communities that are growing fast.",
      image: "https://nexifyhosting.vercel.app/images/standard.webp",
      accent: "#2563EB",
      cpu: "Ryzen 7 5800X · 4.7 GHz",
      bestFor: "Plugins & modpacks · up to ~60 players",
      plans: [
        {
          name: "Essential Engine",
          ram: "4 GB",
          price: 89,
          specs: ["4 GB DDR5 RAM", "150% Dedicated CPU Allocation", "20 GB Gen4 NVMe Storage"],
        },
        {
          name: "Xenora Matrix",
          ram: "8 GB",
          price: 175,
          popular: true,
          specs: ["8 GB DDR5 RAM", "250% Dedicated CPU Allocation", "35 GB Gen4 NVMe Storage"],
        },
        {
          name: "Apex Tier",
          ram: "12 GB",
          price: 351,
          specs: ["12 GB DDR5 RAM", "350% Dedicated CPU Allocation", "50 GB Gen4 NVMe Storage"],
        },
        {
          name: "Quantum Core",
          ram: "24 GB",
          price: 615,
          specs: ["24 GB DDR5 RAM", "600% Dedicated CPU Allocation", "100 GB Gen4 NVMe Storage"],
        },
        {
          name: "Nova Nexus",
          ram: "32 GB",
          price: 879,
          specs: ["32 GB DDR5 RAM", "800% Dedicated CPU Allocation", "150 GB Gen4 NVMe Storage"],
        },
        {
          name: "Enterprise Overlord",
          ram: "48 GB",
          price: 1143,
          specs: ["48 GB DDR5 RAM", "1200% Dedicated CPU Allocation", "200 GB Gen4 NVMe Storage"],
        },
        {
          name: "Custom Core Architecture",
          ram: "Custom",
          price: "Create Ticket",
          specs: ["Custom RAM", "Custom CPU Allocation", "Custom NVMe Storage", "Tailored hardware resource framework", "Custom deployment options"],
        },
      ],
    },
    {
      id: "performance",
      name: "Performance",
      tagline: "Maximum TPS for large networks",
      description:
        "Top-bin Ryzen 9 hardware with Gen4 NVMe for the heaviest modpacks, big networks and public servers that must never drop a tick.",
      image: "https://nexifyhosting.vercel.app/images/premium.webp",
      accent: "#F59E0B",
      cpu: "Ryzen 9 7950X · 5.7 GHz",
      bestFor: "Networks & heavy modpacks · 100+ players",
      plans: [
        {
          name: "Vanguard Node",
          ram: "4 GB",
          price: 220,
          specs: ["4 GB DDR5 RAM", "200% Dedicated CPU Allocation", "35 GB Gen4 NVMe Storage"],
        },
        {
          name: "Catalyst Core",
          ram: "8 GB",
          price: 440,
          popular: true,
          specs: ["8 GB DDR5 RAM", "350% Dedicated CPU Allocation", "60 GB Gen4 NVMe Storage"],
        },
        {
          name: "Synapse Prime",
          ram: "12 GB",
          price: 664,
          specs: ["12 GB DDR5 RAM", "500% Dedicated CPU Allocation", "90 GB Gen4 NVMe Storage"],
        },
        {
          name: "Overdrive Matrix",
          ram: "24 GB",
          price: 1329,
          specs: ["24 GB DDR5 RAM", "800% Dedicated CPU Allocation", "160 GB Gen4 NVMe Storage"],
        },
        {
          name: "Kinetic Horizon",
          ram: "32 GB",
          price: 1773,
          specs: ["32 GB DDR5 RAM", "1000% Dedicated CPU Allocation", "220 GB Gen4 NVMe Storage"],
        },
        {
          name: "Singularity Protocol",
          ram: "48 GB",
          price: 2658,
          specs: ["48 GB DDR5 RAM", "1600% Dedicated CPU Allocation", "320 GB Gen4 NVMe Storage"],
        },
        {
          name: "Custom Prowess Architecture",
          ram: "Custom",
          price: "Create Ticket",
          specs: ["Custom RAM", "Custom CPU Allocation", "Custom NVMe Storage", "Tailored hardware resource framework", "Custom deployment options", "Global Locations"],
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
    { name: "Node.js", image: "https://nexifyhosting.vercel.app/images/node.webp", note: "discord.js · v18–v22" },
    { name: "Python", image: "https://nexifyhosting.vercel.app/images/python.webp", note: "discord.py · 3.9–3.12" },
    { name: "Java", image: "https://nexifyhosting.vercel.app/images/java.webp", note: "JDA · 17 & 21" },
    { name: "Go", image: "https://nexifyhosting.vercel.app/images/go.svg", note: "discordgo · latest" },
    { name: "PHP", image: "https://nexifyhosting.vercel.app/images/php.webp", note: "DiscordPHP · 8.x" },
    { name: "Lua", image: "https://nexifyhosting.vercel.app/images/lua.svg", note: "Discordia · 5.4" },
  ],
  plans: [
    {
      name: "Basic Node",
      ram: "1 GB",
      price: 54,
      specs: ["1 GB DDR5 RAM", "75% Dedicated CPU Allocation", "5 GB Gen4 NVMe Storage"],
    },
    {
      name: "Plus Matrix",
      ram: "2 GB",
      price: 108,
      popular: true,
      specs: ["2 GB DDR5 RAM", "100% Dedicated CPU Allocation", "10 GB Gen4 NVMe Storage"],
    },
    {
      name: "Pro Tier",
      ram: "4 GB",
      price: 216,
      specs: ["4 GB DDR5 RAM", "150% Dedicated CPU Allocation", "15 GB Gen4 NVMe Storage"],
    },
    {
      name: "Advanced Core",
      ram: "8 GB",
      price: 423,
      specs: ["8 GB DDR5 RAM", "250% Dedicated CPU Allocation", "25 GB Gen4 NVMe Storage"],
    },
    {
      name: "Elite Nexus",
      ram: "16 GB",
      price: 846,
      specs: ["16 GB DDR5 RAM", "400% Dedicated CPU Allocation", "40 GB Gen4 NVMe Storage"],
    },
    {
      name: "Ultimate Overlord",
      ram: "24 GB",
      price: 1260,
      specs: ["24 GB DDR5 RAM", "600% Dedicated CPU Allocation", "60 GB Gen4 NVMe Storage"],
    },
    {
      name: "Custom App Framework",
      ram: "Custom",
      price: "Create Ticket",
      specs: ["Custom RAM", "Custom CPU Allocation", "Custom NVMe Storage", "Tailored hardware resource framework", "Bespoke budget & specs", "Custom project parameters"],
    },
  ] as Plan[],
  features: [
    { icon: "code", title: "Any Language", description: "Node.js, Python, Java, Go, PHP and Lua images ready to go — or bring your own." },
    { icon: "git", title: "Git Deploys", description: "Push to your repo and your bot redeploys automatically. Roll back in one click." },
    { icon: "heart", title: "Auto-Restart", description: "Crash watchdogs bring your bot back within seconds, any time of day." },
    { icon: "terminal", title: "Live Console", description: "Stream logs in real time and run commands directly from the panel." },
    { icon: "database", title: "Free Database", description: "MongoDB or MySQL included on higher plans — no external service needed." },
    { icon: "clock", title: "24/7 Uptime", description: "Always-on nodes with monitoring so your bot never silently disappears." },
  ],
};

/* -------------------------- VPS HOSTING --------------------------- */

export const vps = {
  badge: "Virtual Servers",
  title: "VPS",
  accent: "Hosting",
  subtitle:
    "High-performance virtual servers located in Thailand. Powered by Intel® Xeon® processors and Gen4 NVMe storage for maximum reliability and speed.",
  plans: [
    {
      name: "2GiB",
      ram: "2GB DDR4",
      price: 299,
      specs: ["1 vCore", "20GB NVME SSD", "Dedicated IPv4", "Full Root Access"],
    },
    {
      name: "4GiB",
      ram: "4GB DDR4",
      price: 549,
      specs: ["2 vCores", "40GB NVME SSD", "Dedicated IPv4", "Full Root Access"],
    },
    {
      name: "8GiB",
      ram: "8GB DDR4",
      price: 899,
      popular: true,
      specs: ["4 vCores", "80GB NVME SSD", "Dedicated IPv4", "Full Root Access"],
    },
    {
      name: "16GiB",
      ram: "16GB DDR4",
      price: 1499,
      specs: ["6 vCores", "120GB NVME SSD", "Dedicated IPv4", "Full Root Access"],
    },
    {
      name: "32GiB",
      ram: "32GB DDR4",
      price: 2199,
      specs: ["8 vCores", "200GB NVME SSD", "Dedicated IPv4", "Full Root Access"],
    },
    {
      name: "64GiB",
      ram: "64GB DDR4",
      price: 4199,
      specs: ["16 vCores", "300GB NVME SSD", "Dedicated IPv4", "Full Root Access"],
    },
    {
      name: "Custom Plan",
      ram: "Custom",
      price: "Create Ticket",
      specs: ["Scalable Resources", "Tailored Hardware", "Bespoke Config", "Bulk Pricing"],
    },
  ] as Plan[],
  hardware: [
    { label: "CPU", value: "Intel® Xeon® E5-2670 v2" },
    { label: "RAM", value: "DDR4 ECC" },
    { label: "Storage", value: "Gen4 NVMe" },
    { label: "Location", value: "Thailand" },
    { label: "Network", value: "1 Gbps" },
    { label: "Virtualization", value: "KVM" },
    { label: "Access", value: "Full Root" },
    { label: "DDoS", value: "Standard Protection" },
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
      specs: ["4 GB DDR5 RAM", "150% Dedicated CPU Allocation", "20 GB Gen4 NVMe Storage"],
    },
    {
      name: "Velocity",
      ram: "8 GB",
      price: 449,
      popular: true,
      specs: ["8 GB DDR5 RAM", "250% Dedicated CPU Allocation", "35 GB Gen4 NVMe Storage"],
    },
    {
      name: "Titan",
      ram: "12 GB",
      price: 719,
      specs: ["12 GB DDR5 RAM", "350% Dedicated CPU Allocation", "50 GB Gen4 NVMe Storage"],
    },
    {
      name: "Phantom",
      ram: "24 GB",
      price: 1079,
      specs: ["24 GB DDR5 RAM", "600% Dedicated CPU Allocation", "100 GB Gen4 NVMe Storage"],
    },
    {
      name: "Infinity",
      ram: "32 GB",
      price: 1439,
      specs: ["32 GB DDR5 RAM", "800% Dedicated CPU Allocation", "150 GB Gen4 NVMe Storage"],
    },
    {
      name: "Dominion",
      ram: "48 GB",
      price: 1889,
      specs: ["48 GB DDR5 RAM", "1200% Dedicated CPU Allocation", "200 GB Gen4 NVMe Storage"],
    },
    {
      name: "Ascendant",
      ram: "64 GB",
      price: 2519,
      specs: ["64 GB DDR5 RAM", "1600% Dedicated CPU Allocation", "300 GB Gen4 NVMe Storage"],
    },
    {
      name: "Custom Forge",
      ram: "Custom",
      price: "Create Ticket",
      specs: ["Custom RAM", "Custom CPU Allocation", "Custom NVMe Storage", "Tailored hardware resource framework", "Custom server configuration", "Custom Quote"],
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
    { tld: ".fun", price: 149, popular: true, note: "Perfect for gaming servers" },
    { tld: ".xyz", price: 249, popular: true, note: "Affordable and modern" },
    { tld: ".site", price: 379, note: "Simple all-purpose choice" },
    { tld: ".shop", price: 449, note: "Perfect for online stores" },
    { tld: ".com", price: 999, popular: true, note: "The classic — best for brands" },
    { tld: ".net", price: 1099, note: "Networks and infrastructure" },
    { tld: ".org", price: 1049, note: "Communities and projects" },
    { tld: ".io", price: 1299, note: "Dev-favorite modern extension" },
    { tld: ".gg", price: 899, note: "Made for gaming brands" },
    { tld: ".tech", price: 599, note: "For technical communities" },
    { tld: ".cloud", price: 749, note: "Great for panels & proxies" },
    { tld: ".host", price: 799, note: "Made for hosting brands" },
    { tld: ".bot", price: 699, note: "Perfect for Discord bots" },
  ] as { tld: string; price: number | string; popular?: boolean; note: string }[],
  features: [
    { icon: "lock", title: "Free WHOIS Privacy", description: "Your personal details stay hidden from public WHOIS lookups." },
    { icon: "settings", title: "Full DNS Control", description: "A, AAAA, CNAME, MX, SRV and TXT records — perfect for Minecraft SRV setups." },
    { icon: "zap", title: "Instant Activation", description: "Domains are live within minutes and connect to your server in one click." },
  ],
};

/* ---------------------------- FEATURES ---------------------------- */

export const features = {
  badge: "Why NexifyHost",
  title: "Built for Minecraft",
  subtitle:
    "Every part of our stack is tuned for one thing — keeping your Minecraft world running at 20 TPS.",
  items: [
    { icon: "cpu", title: "High-Clock CPUs", description: "Ryzen chips up to 5.7 GHz — Minecraft is single-thread hungry, so clock speed is king." },
    { icon: "zap", title: "Instant Setup", description: "Your server is online within 60 seconds of checkout, pre-configured and ready to join." },
    {
      icon: "shield",
      title: "Free DDoS Protection",
      description: "Minecraft-aware filtering absorbs attacks at the edge so your players never get kicked — always on, always included, no configuration needed.",
      wide: true,
    },
    { icon: "plug", title: "1-Click Plugins & Mods", description: "Install from thousands of plugins, mods and full modpacks straight from the panel." },
    { icon: "archive", title: "Automatic Backups", description: "Scheduled offsite backups with one-click restore keep every world safe." },
    { icon: "settings", title: "Full Panel Control", description: "File manager, console, schedulers, sub-users and version switching — all included." },
    { icon: "chart", title: "Instant Upgrades", description: "Add RAM or CPU as your community grows — applied instantly, no world migration." },
  ],
};

/* ------------------------- PANEL SHOWCASE ------------------------- */

export const showcase = {
  badge: "Our Panel",
  title: "Experience Our Platform",
  subtitle: "A custom-built control panel that puts every tool one click away.",
  autoAdvance: 5000,
  cards: [
    { icon: "terminal", title: "Shell Access", description: "Manage your server directly through our own custom shell — no third-party tools required." },
    { icon: "plug", title: "Plugin Manager", description: "Browse and install thousands of Spigot & Paper plugins with a single click." },
    { icon: "archive", title: "Modpack Manager", description: "One-click Forge, Fabric and CurseForge modpack installs with automatic version handling." },
    { icon: "heart", title: "TPS Analytics", description: "Live TPS, RAM, CPU and player charts with detailed historical logs." },
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
  image: "https://nexifyhosting.vercel.app/images/faq.webp",
  items: [
    {
      question: "How do I get a free plan?",
      answer:
        "Free plans are community rewards rather than a public tier — invite friends to our Discord and you can unlock one through our invite rewards. Hop into the server, check the rewards channel, and our team will set you up. No credit card is ever required.",
    },
    {
      question: "What's the difference between Budget, Standard and Performance?",
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

/* --------------------------- STATUS PAGE -------------------------- */

export const status = {
  badge: "Trust Center",
  title: "Live Service",
  accent: "Status",
  subtitle:
    "Real-time availability across every layer of our platform. This page refreshes automatically and is powered by the same probes that page our on-call engineers.",
  refreshSeconds: 30,
  services: [
    { id: "panel", name: "Game Panel", desc: "Dashboard, console & shell access", uptime: "99.98%", latency: 42, seed: 3 },
    { id: "mc", name: "Minecraft Nodes", desc: "Budget · Standard · Performance fleets", uptime: "99.95%", latency: 38, seed: 7 },
    { id: "bots", name: "Bot Hosting Nodes", desc: "Always-on Discord bot workers", uptime: "99.91%", latency: 51, seed: 11 },
    { id: "games", name: "Game Server Nodes", desc: "Dockerized multi-game runtimes", uptime: "99.97%", latency: 44, seed: 17 },
    { id: "dns", name: "Domains & DNS", desc: "Registrar, DNS zones & SSL issuance", uptime: "100.0%", latency: 23, seed: 23 },
    { id: "api", name: "Public API & Billing", desc: "Client API, orders & provisioning", uptime: "99.99%", latency: 35, seed: 29 },
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
  price: number; // USD, one-time
  desc: string;
  flagship?: boolean;
}

export const extensions = {
  badge: "Panel Store",
  title: "Blueprints &",
  accent: "Extensions",
  subtitle:
    "Production-grade extensions for our game panel — hand-built, security reviewed and tuned to work together. Install once and our team keeps them compatible with every panel release.",
  note: "All extension prices are listed in USD and are one-time purchases.",
  categories: [
    {
      id: "ux",
      name: "UI, UX & Presentation",
      tagline: "Thirteen focused upgrades that make the panel feel like a native product.",
      accent: "#2563EB",
      items: [
        { icon: "table", name: "Blue Tables UI Modifier", price: 3.0, desc: "Responsive blue-accent table theme with sticky headers, zebra rows and compact mode." },
        { icon: "brush", name: "Custom CSS Injection Tool", price: 4.0, desc: "Inject scoped stylesheets safely, with live preview, versioning and one-click rollback." },
        { icon: "code", name: "Monaco Advanced Code Editor", price: 5.5, desc: "Upgrade every file editor to Monaco with IntelliSense, minimap and multi-cursor editing." },
        { icon: "infinity", name: "No-Pagination Endless Scrolling", price: 3.5, desc: "Seamless infinite scroll in place of pagination — filters keep their live context." },
        { icon: "users", name: "Player Listing Displays", price: 4.0, desc: "Real-time online player cards with avatars, ping and session duration." },
        { icon: "package", name: "Pteromonaco Code Suite", price: 5.0, desc: "Monaco plus tabbed editing, syntax themes and editor code actions, bundled." },
        { icon: "image", name: "Dynamic Server Backgrounds", price: 3.0, desc: "Animated, server-aware ambient backgrounds for the dashboard and login screen." },
        { icon: "sidebar", name: "Sidebar Navigation Customizer", price: 3.5, desc: "Drag to reorder, pin and group sidebar navigation per user profile." },
        { icon: "star", name: "Simple Favicon Manager", price: 2.0, desc: "Upload and swap panel favicons with instant CDN cache invalidation." },
        { icon: "footer", name: "Simple Footer Editor", price: 2.5, desc: "Edit footer text, links and legal rows from the admin UI — zero code changes." },
        { icon: "snowflake", name: "Snowflake Particle Overlay", price: 2.0, desc: "Configurable seasonal particle overlays with density and drift controls." },
        { icon: "rocket", name: "Startup Changer Utility", price: 3.5, desc: "Switch between pre-built startup command profiles per game version in one click." },
        { icon: "chart", name: "Static & Panel Statistics Views", price: 4.5, desc: "Embeddable TPS, players and uptime widgets for the panel or external sites." },
      ] as Extension[],
    },
    {
      id: "auth",
      name: "Authentication, Integrations & Routing",
      tagline: "Deeper platform capabilities — identity, chat, alerts and network automation.",
      accent: "#8B5CF6",
      items: [
        { icon: "key", name: "Discord Authentication Blueprint", price: 12.0, desc: "Full OAuth2 Discord SSO with role-based permissions and guild membership validation.", flagship: true },
        { icon: "shield", name: "Social OAuth Secure Login", price: 8.0, desc: "Google and GitHub sign-in with MFA-ready session management." },
        { icon: "chat", name: "Tawk.to Live Chat Integration", price: 4.5, desc: "Embed Tawk.to with authenticated user context passed straight into tickets." },
        { icon: "redirect", name: "Domain & Network Redirector", price: 4.0, desc: "Smart multi-domain redirects with path preservation and SSL handling." },
        { icon: "bell", name: "Resource Threshold Alerts", price: 5.5, desc: "CPU, RAM and disk alerts delivered via panel notifications and webhooks." },
        { icon: "globe", name: "Network Subdomain Manager", price: 7.5, desc: "Bulk-create, assign and release SRV and A records tied to allocations." },
        { icon: "map", name: "Subdomains Mapping Matrix", price: 6.0, desc: "Visual map of every subdomain to its server, port and ownership state." },
        { icon: "languages", name: "CoreSystem Translations Module", price: 9.0, desc: "Panel-wide i18n with per-user locales, crowd-editable packs and RTL support." },
      ] as Extension[],
    },
  ],
  licensing: {
    icon: "shield",
    title: "One license, forever",
    body: "Every extension and module includes a permanent, non-expiring license for the purchased component. No recurring license renewal is required.",
  },
};

/* --------------------------- LEGAL PAGES -------------------------- */

export const legalDropdown = [
  { name: "Terms of Service", href: "/terms-of-services", description: "Our service agreement and usage terms" },
  { name: "Privacy Policy", href: "/privacy-policy", description: "How we handle and protect your data" },
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
    updated: "Last updated: January 2026",
    intro:
      "These terms govern your use of NexifyHost services. By creating an account or ordering a service, you agree to everything below — please read it carefully.",
    sections: [
      {
        heading: "1. Services",
        paragraphs: [
          "NexifyHost provides Minecraft server hosting, Discord bot hosting, general game server hosting and domain registration. Services are provisioned automatically with the specifications shown at the time of order.",
          "We may improve, upgrade or reconfigure infrastructure at any time, provided your service specifications are not materially reduced.",
        ],
      },
      {
        heading: "2. Accounts",
        paragraphs: [
          "You are responsible for keeping your account credentials confidential and for everything that happens under your account. You must provide accurate information when registering and keep it up to date.",
          "Accounts are non-transferable. You may add sub-users to your panel at your own discretion and remain responsible for their actions.",
        ],
      },
      {
        heading: "3. Acceptable Use",
        paragraphs: [
          "You may not use our services for anything unlawful, including hosting malware, phishing pages, botnet command-and-control, unsolicited bulk email, or content that infringes the rights of others.",
          "Resource abuse that degrades service for other customers — including cryptocurrency mining or running workloads unrelated to your plan type — may lead to suspension.",
        ],
      },
      {
        heading: "4. Free Plans & Invite Rewards",
        paragraphs: [
          "Free plans are granted as community rewards, typically through Discord invite milestones, and remain at our discretion. They carry no uptime guarantee and receive community-level support.",
          "Abusing the reward system — including fake invites, alt accounts or self-invites — voids eligibility and may result in removal of the free service. Upgrading to a paid plan is instant and preserves your data.",
        ],
      },
      {
        heading: "5. Payments & Refunds",
        paragraphs: [
          "Paid services are billed in advance on a monthly cycle. Prices are set in INR; other currencies shown on the site are indicative conversions and the final charge is processed in INR.",
          "First-time orders are eligible for a refund request within 72 hours of provisioning. Domain registrations, renewals and upgrades are non-refundable.",
        ],
      },
      {
        heading: "6. Domains",
        paragraphs: [
          "Domain registrations are subject to the policies of the relevant registry and ICANN where applicable. You are responsible for providing accurate registrant details and for renewing before expiry.",
          "We register only the TLDs listed on our domains page. Transfers in and out are supported subject to standard registry lock periods.",
        ],
      },
      {
        heading: "7. Service Level",
        paragraphs: [
          "We target 99.9% monthly uptime for network and power on paid plans. Unplanned outages below this target may be eligible for service credit on request.",
          "Scheduled maintenance is announced in advance on our status page and Discord, and does not count toward downtime calculations.",
        ],
      },
      {
        heading: "8. Termination & Liability",
        paragraphs: [
          "You may cancel at any time from the client area; services remain active until the end of the paid period. We may suspend or terminate services immediately for violation of these terms or abuse reports.",
          "Services are provided 'as is'. Our total liability for any claim is limited to the amounts you paid for the affected service in the 3 months preceding the event.",
        ],
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    updated: "Last updated: January 2026",
    intro:
      "This policy explains what information NexifyHost collects, why we collect it, and the choices you have. We keep it as short and readable as we legally can.",
    sections: [
      {
        heading: "1. Data We Collect",
        paragraphs: [
          "Account data: your email address, username and hashed password. Billing data: transaction references and the billing details required by our payment processors — full card numbers never touch our servers.",
          "For domain registrations we collect the registrant details required by the registry. Usage data: server resource metrics, panel actions and log files needed to operate and support your services.",
        ],
      },
      {
        heading: "2. How We Use It",
        paragraphs: [
          "We use collected data to provision and maintain your services, process payments, prevent abuse, respond to support requests, and send essential service communications such as maintenance notices.",
          "If you participate in Discord invite rewards, we process your Discord username and invite counts solely to verify eligibility.",
        ],
      },
      {
        heading: "3. Sharing",
        paragraphs: [
          "We do not sell personal data. Data is shared only with the processors strictly needed to run the service — payment gateways, domain registries, fraud-prevention tools and infrastructure providers.",
          "We may disclose information where required by law, court order, or to protect the safety of our users and network.",
        ],
      },
      {
        heading: "4. Retention",
        paragraphs: [
          "Account data is retained while your account is active. Server contents are deleted following termination as described in our Terms of Service, and backups rotate out within 30 days.",
          "Minimal billing and domain records are kept for the period required by applicable law and registry rules.",
        ],
      },
      {
        heading: "5. Security",
        paragraphs: [
          "We protect data with TLS encryption in transit, encryption and strict access controls at rest, isolated service containers, and mandatory two-factor authentication for staff systems.",
          "No system is perfectly secure; if a breach affects your data we will notify you without undue delay.",
        ],
      },
      {
        heading: "6. Your Rights",
        paragraphs: [
          "You may access, correct or export your account data at any time from the client area, and request deletion of your account by contacting support.",
          "Depending on your jurisdiction you may have additional rights, including to object to processing or lodge a complaint with a supervisory authority.",
        ],
      },
      {
        heading: "7. Cookies",
        paragraphs: [
          "We use essential cookies for authentication and preferences (like your theme and currency choice), and privacy-respecting aggregate analytics. You can block non-essential cookies without losing core functionality.",
        ],
      },
      {
        heading: "8. Contact",
        paragraphs: [
          "Questions about this policy or your data? Reach us anytime on Discord or through a support ticket — a real engineer will respond.",
        ],
      },
    ],
  },
};

/* ----------------------------- FOOTER ----------------------------- */

export const footer = {
  tagline:
    "Premium Minecraft hosting, Discord bot hosting, game servers and domains — built for communities of every size.",
  closingTitle: "Infrastructure you can build on.",
  closingText:
    "From a first private server to a growing public community, NexifyHost delivers dependable performance, transparent pricing and responsive technical support at every stage.",
  trademarkNotice:
    "NexifyHost is an independent hosting provider and is not affiliated with Mojang Studios, Microsoft or Discord Inc. All product names and trademarks belong to their respective owners.",
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
        { label: "Panel Extensions", href: "/extensions" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Server Status", href: site.statusPage },
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

import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Users2,
  Bot,
  Gamepad2,
  Globe,
  Blocks,
} from "lucide-react";
import {
  minecraft,
  botHosting,
  gameServers,
  domains,
  site,
} from "../data/config";
import SectionHeading from "./SectionHeading";
import { href } from "../router";
import { useCurrency } from "../hooks/useCurrency";

export default function Pricing() {
  const { format } = useCurrency();

  const minFrom = (arr: { price: number | string }[]) => {
    const numericPrices = arr
      .map((p) => p.price)
      .filter(
        (price): price is number => typeof price === "number" && price > 0,
      );
    return Math.min(...numericPrices);
  };

  const otherServices = [
    {
      id: "bots",
      icon: Bot,
      name: "Discord Bot Hosting",
      desc: "Node.js, Python, Java, Go, PHP & Lua images with Git deploys and auto-restart.",
      from: minFrom(botHosting.plans),
      unit: "/mo",
      accent: "#5865F2",
      href: "/bots",
    },
    {
      id: "gameservers",
      icon: Gamepad2,
      name: "Game Servers",
      desc: "Rust, ARK, CS2, Valheim, Palworld and more — one flexible plan family.",
      from: minFrom(gameServers.plans),
      unit: "/mo",
      accent: "#8B5CF6",
      href: "/gameservers",
    },
    {
      id: "domains",
      icon: Globe,
      name: "Domains",
      desc: "A curated set of TLDs with free WHOIS privacy and full DNS control.",
      from: minFrom(domains.tlds),
      unit: "/yr",
      accent: "#0EA5E9",
      href: "/domains",
    },
  ];

  return (
    <section
      id="plans"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void overflow-hidden transition-colors duration-300"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          align="center"
          badge={minecraft.badge}
          title={minecraft.title}
          subtitle={minecraft.subtitle}
        />

        {/* ---- Minecraft plan families (primary) ---- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {minecraft.categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={href(`/minecraft/${cat.id}`)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="card-shell group relative flex flex-col overflow-hidden"
              style={{ borderColor: `${cat.accent}44` }}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={cat.image}
                  alt={`${cat.name} plans`}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/15 to-transparent dark:from-[#0d0f16]/95 dark:via-[#0d0f16]/15" />
                <div
                  className="absolute inset-0 mix-blend-overlay"
                  style={{ backgroundColor: cat.accent, opacity: 0.18 }}
                />
              </div>
              <div className="relative p-5 pb-0">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-orbitron tracking-widest uppercase"
                  style={{
                    color: cat.accent,
                    backgroundColor: `${cat.accent}14`,
                  }}
                >
                  <Blocks className="w-2.5 h-2.5" /> Minecraft
                </span>
                <h3 className="mt-4 font-orbitron font-bold text-lg text-slate-900 dark:text-white transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 transition-colors">
                  {cat.tagline}
                </p>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 text-xs">
                    from
                  </span>
                  <span className="font-orbitron text-2xl font-bold text-slate-900 dark:text-white transition-colors">
                    {format(minFrom(cat.plans))}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-xs">
                    /mo
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                  {cat.description}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 transition-colors">
                    <Cpu
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: cat.accent }}
                    />
                    {cat.cpu}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 transition-colors">
                    <Users2
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: cat.accent }}
                    />
                    {cat.bestFor}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/8 flex items-center justify-between transition-colors">
                  <span className="text-[11px] font-orbitron tracking-wider text-slate-500 dark:text-slate-400">
                    {cat.plans.length} PLANS
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 font-orbitron text-[11px] font-semibold tracking-wider"
                    style={{ color: cat.accent }}
                  >
                    View plans
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ---- other services ---- */}
        <div className="mt-14">
          <h3 className="text-center font-orbitron text-sm font-semibold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-6">
            We also offer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherServices.map((s, i) => (
              <motion.a
                key={s.id}
                href={href(s.href)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-shell group p-5 flex items-start gap-4"
              >
                <span
                  className="w-12 h-12 rounded-lg flex-shrink-0 border flex items-center justify-center"
                  style={{
                    color: s.accent,
                    borderColor: `${s.accent}44`,
                    backgroundColor: `${s.accent}14`,
                  }}
                >
                  <s.icon className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-orbitron text-sm font-semibold text-slate-900 dark:text-white transition-colors">
                    {s.name}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    {s.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-orbitron font-semibold tracking-wider text-slate-700 dark:text-slate-200">
                    from {format(s.from)}
                    <span className="text-slate-400 dark:text-slate-500">
                      {s.unit}
                    </span>
                    <ArrowRight
                      className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                      style={{ color: s.accent }}
                    />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors"
        >
          {minecraft.footerText}{" "}
          <a
            href={site.discord}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-400 transition-colors"
          >
            {minecraft.footerLink}
          </a>
        </motion.p>
      </div>
    </section>
  );
}

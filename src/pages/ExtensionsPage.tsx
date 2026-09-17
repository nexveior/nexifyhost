import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Brush,
  Code2,
  Crown,
  FileText,
  Globe2,
  Image as ImageIcon,
  Infinity as InfinityIcon,
  KeyRound,
  Languages,
  Map as MapIcon,
  MessageSquare,
  Navigation,
  Package,
  PanelLeft,
  Puzzle,
  Rocket,
  ShieldCheck,
  Snowflake,
  Star,
  Table2,
  Users,
  MessageCircle,
} from "lucide-react";
import { extensions, site, type Extension } from "../data/config";
import PageHero from "../components/PageHero";

const icons: Record<string, typeof Puzzle> = {
  table: Table2,
  brush: Brush,
  code: Code2,
  infinity: InfinityIcon,
  users: Users,
  package: Package,
  image: ImageIcon,
  sidebar: PanelLeft,
  star: Star,
  footer: FileText,
  snowflake: Snowflake,
  rocket: Rocket,
  chart: BarChart3,
  key: KeyRound,
  shield: ShieldCheck,
  chat: MessageSquare,
  redirect: Navigation,
  bell: BellRing,
  globe: Globe2,
  map: MapIcon,
  languages: Languages,
};

const usd = (n: number) => `$${n.toFixed(2)}`;

function ExtensionCard({
  item,
  index,
  accent,
}: {
  item: Extension;
  index: number;
  accent: string;
}) {
  const Icon = icons[item.icon] ?? Puzzle;
  const flagship = item.flagship === true;
  const cardAccent = flagship ? "#F59E0B" : accent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35) }}
      className={`card-shell group relative flex flex-col gap-3 p-4 sm:p-5 ${
        flagship ? "!border-amber-500/50" : ""
      }`}
    >
      {flagship && (
        <span className="absolute -top-2.5 left-4 z-10 inline-flex items-center gap-1 bg-amber-500 text-white text-[9px] font-orbitron font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full shadow-lg shadow-amber-500/40">
          <Crown className="w-2.5 h-2.5" /> Flagship
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <span
          className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors duration-300"
          style={{ backgroundColor: `${cardAccent}14`, borderColor: `${cardAccent}44` }}
        >
          <Icon className="w-5 h-5" style={{ color: cardAccent }} />
        </span>
        <span className="font-orbitron font-bold text-sm sm:text-base text-slate-900 dark:text-white tabular-nums transition-colors">
          {usd(item.price)}
        </span>
      </div>

      <div>
        <h3 className="font-orbitron text-[13px] sm:text-sm font-semibold text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {item.name}
        </h3>
        <p className="mt-1.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
          {item.desc}
        </p>
      </div>

      <a
        href={site.discord}
        className="mt-auto inline-flex items-center gap-1.5 font-orbitron text-[10px] font-semibold tracking-wider transition-colors"
        style={{ color: cardAccent }}
      >
        Get it on Discord
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </motion.div>
  );
}

export default function ExtensionsPage() {
  const totalItems = extensions.categories.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );
  const cheapest = Math.min(
    ...extensions.categories.flatMap((category) => category.items.map((item) => item.price)),
  );

  return (
    <>
      <PageHero
        badge={extensions.badge}
        title={extensions.title}
        accent={extensions.accent}
        subtitle={extensions.subtitle}
      >
        <a
          href={site.discord}
          className="button-primary inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg font-orbitron text-xs sm:text-sm font-semibold tracking-wider"
        >
          <MessageCircle className="w-4 h-4" />
          Purchase via Discord
        </a>
        <span className="chip-badge">{totalItems} extensions</span>
        <span className="chip-badge">from {usd(cheapest)} one-time</span>
      </PageHero>

      {extensions.categories.map((category) => (
        <section
          key={category.id}
          className={`${
            category.id === "ux" ? "extensions-section" : ""
          } relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 ${
            category.id === "ux"
              ? "bg-[#f2f5fb] dark:bg-void"
              : "bg-[#eaeef7] dark:bg-[#0c0e14]"
          } overflow-hidden transition-colors duration-300`}
        >
          <div
            className="absolute -top-32 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none opacity-50"
            style={{
              background: `radial-gradient(circle, ${category.accent}30, transparent 65%)`,
              right: category.id === "ux" ? "-10%" : "auto",
              left: category.id === "ux" ? "auto" : "-10%",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="mb-8 sm:mb-9 flex flex-wrap items-end justify-between gap-3 sm:gap-4"
            >
              <div>
                <div
                  className="chip-badge mb-4"
                  style={{ borderColor: `${category.accent}55`, color: category.accent }}
                >
                  <Puzzle className="w-3.5 h-3.5" />
                  Extensions
                </div>
                <h2 className="font-orbitron font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white transition-colors">
                  {category.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl transition-colors">
                  {category.tagline}
                </p>
              </div>
              <span className="font-orbitron text-[10px] sm:text-xs tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
                {category.items.length} items
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {category.items.map((item, index) => (
                <ExtensionCard
                  key={item.name}
                  item={item}
                  index={index}
                  accent={category.accent}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Licensing */}
      <section className="relative py-14 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void overflow-hidden transition-colors duration-300">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="card-shell !border-emerald-500/40 relative overflow-hidden p-5 sm:p-8 text-center"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[240px] rounded-full blur-3xl pointer-events-none bg-emerald-500/12" />
            <span className="relative mx-auto w-11 h-11 rounded-xl bg-emerald-500/12 border border-emerald-500/35 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </span>
            <h2 className="relative font-orbitron font-bold text-xl sm:text-2xl text-slate-900 dark:text-white transition-colors">
              {extensions.licensing.title}
            </h2>
            <p className="relative mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto transition-colors">
              {extensions.licensing.body}
            </p>
            <p className="relative mt-2 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
              {extensions.note} Updates and panel-compatibility guarantees are handled by our team at
              no extra cost.
            </p>
            <a
              href={site.discord}
              className="relative button-primary mt-6 inline-flex items-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3.5 rounded-lg font-orbitron text-xs sm:text-sm font-semibold tracking-wider"
            >
              Browse &amp; purchase on Discord
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

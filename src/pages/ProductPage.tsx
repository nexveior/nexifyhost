import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Code2,
  GitBranch,
  HeartPulse,
  Terminal,
  Shield,
  Clock,
  KeyRound,
  Database,
  Layers,
  Camera,
  BarChart3,
  Cpu,
  Settings,
  Wrench,
  Lock,
  Archive,
  Zap,
  Cloud,
  Mail,
} from "lucide-react";
import { productPages, site } from "../data/config";
import PageHero from "../components/PageHero";
import TierCard from "../components/TierCard";
import SectionHeading from "../components/SectionHeading";
import NotFound from "./NotFound";

const featureIcons: Record<string, typeof Zap> = {
  code: Code2,
  git: GitBranch,
  heart: HeartPulse,
  terminal: Terminal,
  shield: Shield,
  clock: Clock,
  key: KeyRound,
  database: Database,
  layers: Layers,
  camera: Camera,
  chart: BarChart3,
  cpu: Cpu,
  settings: Settings,
  wrench: Wrench,
  lock: Lock,
  archive: Archive,
  zap: Zap,
  cloud: Cloud,
  mail: Mail,
};

export default function ProductPage({ slug }: { slug: string }) {
  const product = productPages[slug];
  if (!product) return <NotFound />;

  return (
    <>
      <PageHero
        badge={product.badge}
        title={product.title}
        accent={product.accent}
        subtitle={product.subtitle}
      >
        <a
          href={site.gamePanel}
          className="button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </a>
        <span className="chip-badge">From ₹{product.fromPrice.toLocaleString("en-IN")} / month</span>
      </PageHero>

      {/* tiers */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="absolute top-10 -left-32 w-80 h-80 blob-primary rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            align="center"
            badge="Plans"
            title="Pick Your Size"
            subtitle="Transparent monthly pricing. Upgrade, downgrade or cancel anytime from the client area."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {product.tiers.map((t, i) => (
              <TierCard key={t.name} tier={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eaeef7] dark:bg-[#0c0e14] transition-colors duration-300">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeading
            badge="Included"
            title="Built-In, Not Bolted On"
            subtitle="Every feature below ships standard on all plans."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((f, i) => {
              const Icon = featureIcons[f.icon] ?? Zap;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="card-shell group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-5 flex-1">
                      <h3 className="font-orbitron text-base font-semibold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {f.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                        {f.description}
                      </p>
                    </div>
                    <div className="w-11 h-11 border-l border-b border-slate-200 dark:border-white/8 group-hover:border-blue-500/40 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 transition-colors">
              Not sure which plan fits? We'll size it with you — free, no commitment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={site.gamePanel}
                className="button-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
              >
                Start Now — ₹{product.fromPrice.toLocaleString("en-IN")}/mo
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={site.discord}
                className="button-secondary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider text-slate-800 dark:text-white"
              >
                <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Talk To Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

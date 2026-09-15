import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Code2,
  GitBranch,
  HeartPulse,
  Terminal,
  Database,
  Clock,
  Zap,
} from "lucide-react";
import { botHosting, site } from "../data/config";
import PageHero from "../components/PageHero";
import PlanCard from "../components/PlanCard";
import SectionHeading from "../components/SectionHeading";

const icons: Record<string, typeof Zap> = {
  code: Code2,
  git: GitBranch,
  heart: HeartPulse,
  terminal: Terminal,
  database: Database,
  clock: Clock,
};

export default function BotHostingPage() {
  return (
    <>
      <PageHero
        badge={botHosting.badge}
        title="Discord Bot"
        accent="Hosting"
        subtitle={botHosting.subtitle}
      >
        <a
          href={site.gamePanel}
          className="button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
        >
          Host Your Bot
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href={site.discord}
          className="button-secondary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider text-slate-800 dark:text-white"
        >
          <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Ask Us
        </a>
      </PageHero>

      {/* runtimes */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeading
            align="center"
            badge="Runtimes"
            title="Ready-Made Images"
            subtitle="Pick your language and deploy — every image is pre-configured, patched and ready for production bots."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {botHosting.runtimes.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card-shell group p-5 flex flex-col items-center text-center gap-3"
              >
                <span className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <img
                    src={r.image}
                    alt={`${r.name} runtime`}
                    loading="lazy"
                    draggable={false}
                    className="w-14 h-14 object-contain"
                  />
                </span>
                <div>
                  <h3 className="font-orbitron text-sm font-semibold text-slate-900 dark:text-white transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 transition-colors">
                    {r.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* plans */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eaeef7] dark:bg-[#0c0e14] overflow-hidden transition-colors duration-300">
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            align="center"
            badge="Plans"
            title="Bot Hosting Plans"
            subtitle="Every plan includes auto-restart, live console and 24/7 uptime monitoring."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {botHosting.plans.map((p, i) => (
              <PlanCard key={p.name} plan={p} index={i} accent="#5865F2" />
            ))}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeading
            badge="Included"
            title="Everything Built In"
            subtitle="No add-ons, no surprise fees — every bot plan ships with the full toolkit."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {botHosting.features.map((f, i) => {
              const Icon = icons[f.icon] ?? Zap;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="card-shell group p-6"
                >
                  <span className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </span>
                  <h3 className="font-orbitron text-base font-semibold text-slate-900 dark:text-white mb-1.5 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    {f.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

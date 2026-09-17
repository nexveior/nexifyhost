import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Gamepad2 } from "lucide-react";
import { gameServers, site } from "../data/config";
import PageHero from "../components/PageHero";
import PlanCard from "../components/PlanCard";
import SectionHeading from "../components/SectionHeading";

export default function GameServersPage() {
  return (
    <>
      <PageHero
        badge={gameServers.badge}
        title="General Game"
        accent="Hosting"
        subtitle={gameServers.subtitle}
      >
        <a
          href={site.gamePanel}
          target="_blank"
          rel="noreferrer noopener"
          className="button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
        >
          Deploy Server
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href={site.discord}
          className="button-secondary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider text-slate-800 dark:text-white"
        >
          <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Request a Game
        </a>
      </PageHero>

      {/* plans */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            align="center"
            badge="Plans"
            title="Pick Your Size"
            subtitle="One flexible plan family — choose RAM and we handle installation, updates and protection."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {gameServers.plans.map((p, i) => (
              <PlanCard key={p.name} plan={p} index={i} accent="#8B5CF6" />
            ))}
          </div>
        </div>
      </section>

      {/* supported games */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eaeef7] dark:bg-[#0c0e14] transition-colors duration-300">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <SectionHeading
            align="center"
            badge="Supported"
            title="Popular Titles"
            subtitle="These run great on our nodes today — and the list keeps growing."
          />
          <div className="flex flex-wrap justify-center gap-2.5">
            {gameServers.supported.map((g, i) => (
              <motion.span
                key={g}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="card-shell inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium transition-colors"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                {g}
              </motion.span>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto transition-colors">
            {gameServers.note}
          </p>
          <a
            href={site.discord}
            className="button-secondary mt-6 inline-flex items-center gap-2.5 px-7 py-3 rounded-lg font-orbitron text-xs font-semibold tracking-wider text-slate-800 dark:text-white"
          >
            <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Request Your Game
          </a>
        </div>
      </section>
    </>
  );
}

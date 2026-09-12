import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Zap,
  Plug,
  Archive,
  Shield,
  Users,
  Terminal,
} from "lucide-react";
import { games, gameTiers, gameFeatures, site } from "../data/config";
import { href } from "../router";
import PageHero from "../components/PageHero";
import TierCard from "../components/TierCard";
import SectionHeading from "../components/SectionHeading";
import NotFound from "./NotFound";

const featureIcons: Record<string, typeof Zap> = {
  zap: Zap,
  plug: Plug,
  shield: Shield,
  users: Users,
  archive: Archive,
  terminal: Terminal,
};

export default function GameDetailPage({ gameId }: { gameId: string }) {
  const game = games.find((g) => g.id === gameId);
  if (!game) return <NotFound />;

  return (
    <>
      <PageHero
        badge="Game Server Hosting"
        title={`${game.name}`}
        accent="Servers"
        subtitle={`Launch your own ${game.name} server in under 60 seconds — NVMe performance, one-click installs and game-tuned DDoS protection included on every plan.`}
        accentColor={game.color}
      >
        <a
          href={site.gamePanel}
          className="button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
        >
          Deploy {game.name}
          <ArrowRight className="w-4 h-4" />
        </a>
        <a href={href("/games")} className="button-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider text-slate-800 dark:text-white">
          <ArrowLeft className="w-4 h-4" />
          All Games
        </a>
      </PageHero>

      {/* tiers */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="absolute top-10 -right-32 w-80 h-80 blob-primary rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            align="center"
            badge="Plans"
            title={`${game.name} Plans`}
            subtitle={`Start completely free — then scale up as your community grows. Every plan includes unlimited slots, full panel access and DDoS protection.`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {gameTiers.map((t, i) => (
              <TierCard key={t.name} tier={t} index={i} accentColor={game.color} />
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
            title="Everything You Need"
            subtitle={`Standard on every ${game.name} server — no hidden fees, no paid add-ons required.`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameFeatures.map((f, i) => {
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
              Ready to play? Your community could be online in the next minute.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={site.gamePanel}
                className="button-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
              >
                Deploy {game.name} Server
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={site.discord}
                className="button-secondary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider text-slate-800 dark:text-white"
              >
                <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Ask a Question
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

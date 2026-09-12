import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, MessageCircle, Zap, Archive, Plug } from "lucide-react";
import { games, site } from "../data/config";
import { href } from "../router";
import PageHero from "../components/PageHero";

const perks = [
  { icon: Plug, title: "One-Click Plugins", text: "Thousands of plugins and mods install in seconds." },
  { icon: Archive, title: "Modpack Library", text: "Curated modpacks with automatic version matching." },
  { icon: Zap, title: "Instant Deploys", text: "Servers go live in under 60 seconds, every time." },
];

export default function GamesPage() {
  return (
    <>
      <PageHero
        badge="Game Servers"
        title="Pick Your Game,"
        accent="We Handle the Rest"
        subtitle="High-performance servers for every community — instant setup, one-click mods and game-tuned DDoS protection on all 8 titles."
      >
        <a
          href="#game-grid"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("game-grid")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
        >
          Browse Games
          <ArrowRight className="w-4 h-4" />
        </a>
        <span className="chip-badge !border-emerald-500/40 !bg-emerald-500/10 !text-emerald-600 dark:!text-emerald-400">
          Free servers · Paid from ₹40/mo
        </span>
      </PageHero>

      {/* game grid */}
      <section id="game-grid" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {games.map((g, i) => (
              <motion.a
                key={g.id}
                href={href(`/games/${g.id}`)}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-shell group relative aspect-[4/3] overflow-hidden p-4 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: g.color }}
                  />
                  <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3 className="font-orbitron text-slate-900 dark:text-white text-base font-semibold">{g.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Free & paid {g.name} servers</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* perks strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-shell flex items-start gap-4 p-5"
              >
                <span className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </span>
                <div>
                  <h3 className="font-orbitron text-sm font-semibold text-slate-900 dark:text-white transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 transition-colors">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* help note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors"
          >
            Don't see your game?{" "}
            <a
              href={site.discord}
              className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4 decoration-blue-500/40"
            >
              <MessageCircle className="inline w-3.5 h-3.5 -mt-0.5" /> Ask us on Discord
            </a>{" "}
            — we add new titles constantly.
          </motion.p>
        </div>
      </section>
    </>
  );
}

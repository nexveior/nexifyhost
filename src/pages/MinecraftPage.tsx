import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Users2, MessageCircle, HardDrive } from "lucide-react";
import { minecraft, site } from "../data/config";
import PageHero from "../components/PageHero";
import PlanCard from "../components/PlanCard";
import { useCurrency } from "../hooks/useCurrency";

export default function MinecraftPage({ category }: { category?: string }) {
  const { format } = useCurrency();
  const initial = Math.max(
    0,
    minecraft.categories.findIndex((c) => c.id === category)
  );
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const i = minecraft.categories.findIndex((c) => c.id === category);
    if (i >= 0) setActive(i);
  }, [category]);

  const cat = minecraft.categories[active];
  const lowest = Math.min(
    ...minecraft.categories
      .flatMap((c) => c.plans)
      .map((p) => Number(p.price) || 0)
      .filter((n) => n > 0)
  );

  return (
    <>
      <PageHero
        badge="Minecraft Hosting"
        title="Minecraft Server"
        accent="Plans"
        subtitle="Three plan families built for every kind of world — from small SMPs to Ryzen 9 hardware powering 100+ player networks."
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
        <span className="chip-badge">From {format(lowest)}/mo</span>
      </PageHero>

      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void overflow-hidden transition-colors duration-300">
        {/* soft ambient glow only — no imagery */}
        <div className="absolute top-24 -right-40 w-[460px] h-[460px] blob-primary rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {minecraft.categories.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActive(i);
                    window.history.replaceState(null, "", `#/minecraft/${c.id}`);
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg font-orbitron text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 border ${
                    on
                      ? "text-white shadow-lg"
                      : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-blue-500/40"
                  }`}
                  style={
                    on
                      ? {
                          backgroundColor: c.accent,
                          borderColor: c.accent,
                          boxShadow: `0 8px 24px -8px ${c.accent}99`,
                        }
                      : undefined
                  }
                >
                  {c.name.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* category summary — text only */}
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="card-shell overflow-hidden mb-8"
            style={{ borderColor: `${cat.accent}44` }}
          >
            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-orbitron font-bold text-xl text-slate-900 dark:text-white transition-colors">
                  {cat.name} <span style={{ color: cat.accent }}>Plans</span>
                </h2>
                <span
                  className="text-[10px] font-orbitron font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md border"
                  style={{ color: cat.accent, borderColor: `${cat.accent}55`, backgroundColor: `${cat.accent}14` }}
                >
                  {cat.tagline}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl transition-colors">
                {cat.description}
              </p>
              <div className="mt-5 grid sm:grid-cols-3 gap-3">
                {[
                  { icon: Cpu, label: "Processor", value: cat.cpu },
                  { icon: Users2, label: "Best for", value: cat.bestFor },
                  { icon: HardDrive, label: "Storage", value: "NVMe SSD · daily backups" },
                ].map((s) => (
                  <div key={s.label} className="flex items-start gap-2.5">
                    <s.icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: cat.accent }} />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                        {s.label}
                      </div>
                      <div className="text-xs text-slate-700 dark:text-slate-200 mt-0.5 transition-colors">
                        {s.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* plans — Budget cards carry the family image, others are clean glass */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {cat.plans.map((p, i) => (
              <PlanCard
                key={`${cat.id}-${p.name}`}
                plan={p}
                index={i}
                accent={cat.accent}
                image={cat.image}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">
              All plans include unlimited player slots, free DDoS protection, one-click plugins &
              modpacks, and full panel access.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={site.gamePanel}
                target="_blank"
                rel="noreferrer noopener"
                className="button-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
              >
                Start from {format(lowest)}/mo
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

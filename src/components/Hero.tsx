import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, Shield, Zap, MessageCircle, Check } from "lucide-react";
import { hero, partners } from "../data/config";
import { href } from "../router";

const statIcons: Record<string, typeof Clock> = {
  clock: Clock,
  users: Users,
  shield: Shield,
  zap: Zap,
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] blob-primary rounded-full blur-3xl pointer-events-none opacity-70" />

      {/* ---------- content ---------- */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-40 pb-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="chip-badge mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-orbitron font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.14] text-slate-900 dark:text-white transition-colors duration-300"
          >
            {hero.titlePrefix}
            <span className="block">
              <span className="text-emerald-500 drop-shadow-[0_0_24px_rgba(34,197,94,0.35)]">
                {hero.titleAccent}
              </span>{" "}
              {hero.titleSuffix}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed transition-colors duration-300"
          >
            {hero.subtitle}
          </motion.p>

          {/* quick highlights */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.33, duration: 0.7 }}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
          >
            {hero.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                {h}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={href(hero.primaryCta.href)}
              className="button-primary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
            >
              {hero.primaryCta.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="button-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider text-slate-800 dark:text-white"
            >
              <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {hero.secondaryCta.label}
            </a>
          </motion.div>

          {/* minimal stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-5"
          >
            {hero.stats.map((s, i) => {
              const Icon = statIcons[s.icon];
              return (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 ${
                    i > 0 ? "sm:pl-7 sm:border-l border-slate-300/70 dark:border-white/10" : ""
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-orbitron font-bold text-slate-900 dark:text-white text-sm leading-none transition-colors">
                      {s.value}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1.5 tracking-[0.16em] uppercase">
                      {s.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ---------- partners strip ---------- */}
      <div className="relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-white/60 dark:bg-[#0a0b0f]/60 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 overflow-hidden">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-orbitron tracking-[0.25em] text-slate-400 dark:text-slate-500 uppercase whitespace-nowrap hidden md:block">
              Powered by
            </span>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-12">
                {[...partners, ...partners].map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className="flex h-9 w-32 items-center justify-center text-xs font-orbitron tracking-wide text-slate-500 dark:text-slate-400 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

/**
 * Shared inner-page hero with chip badge, Orbitron title with accent word
 * and subtitle.
 */
export default function PageHero({
  badge,
  title,
  accent,
  subtitle,
  accentColor,
  children,
}: {
  badge: string;
  title: string;
  accent?: string;
  subtitle: string;
  accentColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative pt-44 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
      {/* glows */}
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] blob-primary rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[380px] h-[380px] blob-secondary rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="chip-badge mb-5"
        >
          {accentColor && (
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          )}
          {badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-orbitron font-bold text-3xl sm:text-5xl text-slate-900 dark:text-white leading-[1.15] max-w-3xl transition-colors duration-300"
        >
          {title}{" "}
          {accent && (
            <span
              className="drop-shadow-[0_0_22px_rgba(37,99,235,0.35)]"
              style={{ color: accentColor ?? "#2563eb" }}
            >
              {accent}
            </span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16 }}
          className="mt-5 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed transition-colors duration-300"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

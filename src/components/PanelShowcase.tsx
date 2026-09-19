import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Plug, Archive, HeartPulse, Zap } from "lucide-react";
import { showcase } from "../data/config";

const icons: Record<string, typeof Zap> = {
  terminal: Terminal,
  plug: Plug,
  archive: Archive,
  heart: HeartPulse,
  zap: Zap,
};

export default function PanelShowcase() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setProgress((p) => Math.min(p + 2, 100)), 100);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setActive((a) => (a + 1) % showcase.cards.length);
      setProgress(0);
    }
  }, [progress]);

  const card = showcase.cards[active];

  return (
    <section
      id="panel"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#eaeef7] dark:bg-[#0c0e14] transition-colors duration-300"
    >
      <video
        src="/images/minecraft-sunset.3840x2160.mp4"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-10 dark:opacity-20 pointer-events-none"
      />
      <div className="absolute inset-0 bg-[#eaeef7]/80 dark:bg-[#0c0e14]/70 pointer-events-none" />
      <div className="absolute top-20 -left-40 w-96 h-96 blob-primary rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto rounded-3xl border border-white/50 bg-white/20 p-4 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/15 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="chip-badge mb-5">
            <Zap className="w-3.5 h-3.5" />
            {showcase.badge}
          </div>
          <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white transition-colors duration-300">
            Experience Our <span className="text-blue-600 dark:text-blue-400">Platform</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xl transition-colors duration-300">
            {showcase.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-3"
          >
            {showcase.cards.map((item, index) => {
              const Icon = icons[item.icon] ?? Zap;
              const isActive = index === active;
              return (
                <button
                  key={item.title}
                  onClick={() => {
                    setActive(index);
                    setProgress(0);
                  }}
                  className={`relative text-left overflow-hidden card-shell flex-1 ${
                    isActive ? "hover-gradient" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 p-5">
                      <h3 className="font-orbitron text-base font-semibold text-slate-900 dark:text-white mb-1.5 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors">
                        {item.description}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 border-l border-b flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? "border-blue-500/40 bg-blue-500/10"
                          : "border-slate-200 dark:border-white/8"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900/5 dark:bg-white/5">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex"
          >
            <div className="card-shell relative w-full overflow-hidden flex flex-col p-2">
              <div className="flex items-center gap-1.5 px-3 py-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900/10 dark:bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900/10 dark:bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500/60" />
                <span className="ml-3 text-[10px] font-mono text-slate-400 dark:text-slate-500 tracking-wide">
                  panel / {card.title.toLowerCase().replace(" ", "-")}
                </span>
              </div>
              <div className="relative flex-1 min-h-[260px] sm:min-h-[340px] rounded-md overflow-hidden flex items-center justify-center bg-blue-500/5">
                <img
                  src="https://nexifyhosting.vercel.app/images/panel-replica.svg"
                  alt="NexifyHost control panel preview"
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="font-orbitron text-slate-900 dark:text-white text-base font-semibold transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 transition-colors">
                  {card.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
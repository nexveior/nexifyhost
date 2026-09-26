import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { locations } from "../data/config";
import Globe from "./Globe";
import { useTheme } from "../hooks/useTheme";

export default function Locations() {
  const { theme } = useTheme();

  return (
    <section
      id="network"
      className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#eaeef7] dark:bg-[#0c0e14] overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] blob-primary rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* globe — fluid, centered, shrink-wrapped on phones */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="relative flex items-center justify-center order-2 lg:order-1"
        >
          <Globe dark={theme === "dark"} />
        </motion.div>

        {/* copy + location list — centered on mobile, left on desktop */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="chip-badge mb-5">{locations.badge}</div>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight transition-colors duration-300">
              A Truly Global{" "}
              <span className="text-blue-600 dark:text-blue-400 drop-shadow-[0_0_20px_rgba(37,99,235,0.35)]">
                Network
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 transition-colors duration-300">
              {locations.subtitle}
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 text-left">
            {locations.markers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-shell group flex items-center gap-2 px-3 py-2.5 sm:px-3.5"
              >
                <span className="relative flex w-2 h-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-500" />
                </span>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors font-medium truncate">
                  {m.name}
                </span>
                <MapPin className="w-3.5 h-3.5 text-blue-500/50 dark:text-blue-400/50 ml-auto flex-shrink-0 hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

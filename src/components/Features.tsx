import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Shield,
  HeartPulse,
  Settings,
  BarChart3,
  Cloud,
} from "lucide-react";
import { features } from "../data/config";
import SectionHeading from "./SectionHeading";

const icons: Record<string, typeof Cpu> = {
  cpu: Cpu,
  zap: Zap,
  shield: Shield,
  heart: HeartPulse,
  settings: Settings,
  chart: BarChart3,
  cloud: Cloud,
};

/**
 * Clean feature card — single icon chip that fills with blue on hover,
 * generous padding, no corner boxes or accent lines.
 */
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features.items)[number];
  index: number;
}) {
  const Icon = icons[feature.icon] ?? Cpu;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`card-shell group p-6 sm:p-7 ${feature.wide ? "md:col-span-2" : ""}`}
    >
      <span className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
      </span>
      <h3 className="font-orbitron text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 transition-colors">
        {feature.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function Features() {
  const row1 = features.items.slice(0, 3);
  const row2 = features.items.slice(3);

  return (
    <section
      id="features"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void overflow-hidden transition-colors duration-300"
    >
      {/* one soft glow only */}
      <div className="absolute top-24 -right-40 w-[480px] h-[480px] blob-primary rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          badge={features.badge}
          title={features.title}
          subtitle={features.subtitle}
        />

        <div className="flex flex-col gap-4">
          {/* row 1: 2 small + 1 wide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {row1.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
          {/* row 2: 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {row2.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

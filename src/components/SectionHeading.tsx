import { motion } from "framer-motion";

/**
 * Shared section heading — angled chip badge, Orbitron title with the
 * last word highlighted in blue, and a subtle subtitle.
 */
export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const words = title.split(" ");
  const last = words[words.length - 1];
  const rest = words.slice(0, -1).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`mb-10 sm:mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {badge && (
        <div className={`chip-badge mb-5 ${align === "center" ? "mx-auto" : ""}`}>{badge}</div>
      )}
      <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight transition-colors duration-300">
        {rest}{" "}
        <span className="text-blue-600 dark:text-blue-400 drop-shadow-[0_0_20px_rgba(37,99,235,0.35)]">
          {last}
        </span>
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl transition-colors duration-300 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

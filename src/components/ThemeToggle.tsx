import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`relative rounded-lg border flex items-center justify-center transition-colors overflow-hidden
        border-slate-300/70 dark:border-white/10
        bg-slate-900/[0.04] dark:bg-white/[0.04]
        text-slate-600 dark:text-slate-300
        hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400
        ${compact ? "w-9 h-9" : "w-9 h-9"}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -120, opacity: 0, scale: 0.4 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 120, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft, SearchX } from "lucide-react";
import { href } from "../router";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-20 bg-[#f2f5fb] dark:bg-void overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] blob-primary rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center mb-6">
          <SearchX className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="font-orbitron font-black text-6xl sm:text-8xl accent-gradient-text">404</h1>
        <p className="mt-4 font-orbitron text-lg sm:text-xl font-semibold text-slate-900 dark:text-white transition-colors">
          Chunk Not Found
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto transition-colors">
          The page you're looking for wandered off the map. Let's get you back to spawn.
        </p>
        <a
          href={href("/")}
          className="button-primary mt-8 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </motion.div>
    </section>
  );
}

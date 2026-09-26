import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Zap } from "lucide-react";
import { site } from "../data/config";
import { href } from "../router";

export default function CTA() {
  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#eaeef7] dark:bg-[#0c0e14] overflow-hidden transition-colors duration-300">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative card-shell !border-blue-500/30 overflow-hidden px-6 sm:px-14 py-14 sm:py-16 text-center"
        >
          {/* single interior glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] blob-primary rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="chip-badge mx-auto mb-6">
              <Zap className="w-3.5 h-3.5" />
              Get Started
            </div>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight transition-colors duration-300">
              Launch Your Server
              <br />
              <span className="accent-gradient-text">In Under 60 Seconds</span>
            </h2>
            <p className="mt-5 text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed transition-colors duration-300">
              Pick a plan, choose your location and go live instantly. Your community is waiting —
              we'll handle the infrastructure.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={href("/games")}
                className="button-primary group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
              >
                Browse Plans
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={site.discord}
                className="button-secondary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider text-slate-800 dark:text-white"
              >
                <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Talk To Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

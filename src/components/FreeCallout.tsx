import { motion } from "framer-motion";
import { Gift, ArrowRight, Users } from "lucide-react";
import { freeOffer, site } from "../data/config";

/**
 * Free-plan hint — free servers are unlocked through Discord invites
 * rather than sold as a public tier.
 */
export default function FreeCallout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="card-shell !border-emerald-500/40 relative overflow-hidden p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5"
    >
      <div className="absolute -top-20 -right-16 w-64 h-48 rounded-full blur-3xl pointer-events-none bg-emerald-500/15" />

      <span className="w-12 h-12 rounded-xl bg-emerald-500/12 border border-emerald-500/35 flex items-center justify-center flex-shrink-0">
        <Gift className="w-6 h-6 text-emerald-500" />
      </span>

      <div className="relative flex-1">
        <h3 className="font-orbitron font-bold text-base sm:text-lg text-slate-900 dark:text-white transition-colors">
          {freeOffer.title}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl transition-colors">
          {freeOffer.description}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          <Users className="w-3.5 h-3.5" />
          Invite friends → unlock a free server
        </p>
      </div>

      <a
        href={site.discord}
        className="relative group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-orbitron text-[11px] font-semibold tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex-shrink-0 shadow-lg shadow-emerald-600/30"
      >
        {freeOffer.cta}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </motion.div>
  );
}

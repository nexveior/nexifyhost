import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { site } from "../data/config";
import type { Plan } from "../data/config";
import { useCurrency } from "../hooks/useCurrency";

/**
 * Universal plan card used by Minecraft, bot hosting and game servers.
 * Prices are stored in INR and formatted through the active currency.
 */
export default function PlanCard({
  plan,
  index,
  accent = "#2563eb",
  image,
}: {
  plan: Plan;
  index: number;
  accent?: string;
  image?: string;
}) {
  const { format } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`card-shell relative flex flex-col overflow-visible ${
        plan.popular ? "!border-blue-500/50" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1 bg-blue-600 text-white text-[9px] font-orbitron font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-lg shadow-blue-600/40 whitespace-nowrap">
          <Sparkles className="w-2.5 h-2.5" />
          Popular
        </div>
      )}

      {image && (
        <div className="relative h-24 overflow-hidden rounded-t-[0.8rem]">
          <img
            src={image}
            alt={`${plan.name} plan`}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/25 to-transparent dark:from-[#0d0f16]/95 dark:via-[#0d0f16]/25" />
          <div
            className="absolute inset-0 mix-blend-overlay"
            style={{ backgroundColor: accent, opacity: 0.24 }}
          />
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-orbitron font-bold text-base text-slate-900 dark:text-white transition-colors">
            {plan.name}
          </h3>
          {plan.ram && (
            <span
              className="text-[10px] font-orbitron font-semibold px-2 py-1 rounded-md border"
              style={{ color: accent, borderColor: `${accent}55`, backgroundColor: `${accent}14` }}
            >
              {plan.ram}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="plan-card-price font-orbitron text-3xl font-bold text-slate-900 dark:text-white transition-colors">
            {typeof plan.price === "number" ? format(plan.price) : plan.price}
          </span>
          {typeof plan.price === "number" && (
            <span className="text-slate-400 dark:text-slate-500 text-xs">/mo</span>
          )}
        </div>

        <div className="my-4 h-px bg-slate-200 dark:bg-white/8 transition-colors" />

        <ul className="space-y-2 flex-1">
          {plan.specs.map((spec) => (
            <li
              key={spec}
              className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 transition-colors"
            >
              <span
                className="mt-0.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${accent}14`, borderColor: `${accent}55` }}
              >
                <Check className="w-2.5 h-2.5" style={{ color: accent }} />
              </span>
              {spec}
            </li>
          ))}
        </ul>

        <a
          href={site.gamePanel}
          target="_blank"
          rel="noreferrer noopener"
          className={`group/btn mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-orbitron text-[11px] font-semibold tracking-wider ${
            plan.popular ? "button-primary" : "button-secondary text-slate-800 dark:text-white"
          }`}
        >
          Order Now
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
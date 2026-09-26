import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Gift } from "lucide-react";
import { site } from "../data/config";

type TierPlan = {
  name: string;
  price: number | string;
  specs: string[];
  popular?: boolean;
};

/**
 * Tiered pricing card used on product & game pages.
 * Price of 0 renders as a green "Free" plan.
 */
export default function TierCard({
  tier,
  index,
  currency = "₹",
  accentColor,
}: {
  tier: TierPlan;
  index: number;
  currency?: string;
  accentColor?: string;
}) {
  const isFree = tier.price === 0;
  const isCustom = typeof tier.price === "string";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`card-shell relative flex flex-col overflow-visible group ${
        tier.popular ? "hover-gradient !border-blue-500/50 lg:-mt-4 lg:mb-4" : ""
      } ${isFree ? "!border-emerald-500/40" : ""}`}
    >
      {tier.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1 bg-blue-600 text-white text-[10px] font-orbitron font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg shadow-blue-600/40 whitespace-nowrap">
          <Sparkles className="w-3 h-3" /> Most Popular
        </div>
      )}
      {isFree && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-orbitron font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg shadow-emerald-600/40 whitespace-nowrap">
          <Gift className="w-3 h-3" /> 100% Free
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <h3 className="font-orbitron font-bold text-lg text-slate-900 dark:text-white transition-colors">
          {tier.name}
        </h3>

        <div className="mt-4 flex items-baseline gap-1">
          {isFree ? (
            <span className="font-orbitron text-3xl sm:text-4xl font-bold text-emerald-500">
              Free
            </span>
          ) : isCustom ? (
            <span className="font-orbitron text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {tier.price}
            </span>
          ) : (
            <>
              <span className="text-slate-500 dark:text-slate-400 text-sm">{currency}</span>
              <span
                className="font-orbitron text-3xl sm:text-4xl font-bold transition-colors"
                style={{ color: tier.popular ? (accentColor ?? "#2563eb") : undefined }}
              >
                <span className={tier.popular ? "" : "text-slate-900 dark:text-white"}>
                  {tier.price.toLocaleString("en-IN")}
                </span>
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-xs">/mo</span>
            </>
          )}
        </div>

        <div className="my-5 h-px bg-slate-200 dark:bg-white/8 transition-colors" />

        <ul className="space-y-2.5 flex-1">
          {tier.specs.map((s) => (
            <li
              key={s}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 transition-colors"
            >
              <span
                className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                  isFree
                    ? "bg-emerald-500/15 border-emerald-500/40"
                    : "bg-blue-500/15 border-blue-500/40"
                }`}
              >
                <Check
                  className={`w-2.5 h-2.5 ${
                    isFree ? "text-emerald-500" : "text-blue-600 dark:text-blue-400"
                  }`}
                />
              </span>
              {s}
            </li>
          ))}
        </ul>

        <a
          href={site.gamePanel}
          className={`group/btn mt-7 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-orbitron text-xs font-semibold tracking-wider ${
            tier.popular
              ? "button-primary"
              : "button-secondary text-slate-800 dark:text-white"
          }`}
        >
          {isFree ? "Claim Free Server" : "Deploy Now"}
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

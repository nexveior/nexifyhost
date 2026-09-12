import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { currencies } from "../data/config";
import { useCurrency } from "../hooks/useCurrency";

export default function CurrencySelector({ full = false }: { full?: boolean }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className={`relative ${full ? "w-full" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change currency"
        className={`flex items-center justify-between gap-1.5 rounded-lg border transition-colors
          border-slate-300/70 dark:border-white/10
          bg-slate-900/[0.04] dark:bg-white/[0.04]
          text-slate-600 dark:text-slate-300
          hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400
          ${full ? "w-full px-3 py-2.5" : "px-2.5 h-9"}`}
      >
        <span className="font-orbitron text-[11px] font-semibold tracking-wider">
          {currency.symbol} {currency.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={`absolute z-[100] mt-2 max-h-72 overflow-y-auto rounded-lg border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0d0f16]/95 backdrop-blur-xl shadow-2xl shadow-slate-900/10 dark:shadow-black/60 p-1.5 ${
              full ? "left-0 right-0" : "right-0 w-56"
            }`}
          >
            {currencies.map((c) => {
              const active = c.code === currency.code;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-colors ${
                    active
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="font-orbitron text-xs font-semibold w-14 flex-shrink-0">
                    {c.symbol} {c.code}
                  </span>
                  <span className="text-xs truncate flex-1">{c.name}</span>
                  {active && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                  {c.code === "INR" && !active && (
                    <span className="text-[9px] font-orbitron tracking-wider text-slate-400 dark:text-slate-500">
                      BASE
                    </span>
                  )}
                </button>
              );
            })}
            <p className="px-3 py-2 text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed border-t border-slate-200 dark:border-white/10 mt-1">
              Prices are set in INR. Other currencies are indicative conversions.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { currencies } from "../data/config";
import { useCurrency } from "../hooks/useCurrency";

function CurrencyFlag({ code, className = "" }: { code: string; className?: string }) {
  const shared = `overflow-hidden rounded-[3px] border border-black/10 shadow-sm ${className}`;

  if (code === "IN") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#ff9933" d="M0 0h24v5.33H0z" />
        <path fill="#fff" d="M0 5.33h24v5.34H0z" />
        <path fill="#138808" d="M0 10.67h24V16H0z" />
        <circle cx="12" cy="8" r="1.55" fill="none" stroke="#000080" strokeWidth=".45" />
        <circle cx="12" cy="8" r=".35" fill="#000080" />
      </svg>
    );
  }

  if (code === "US") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#fff" d="M0 0h24v16H0z" />
        {[0, 2.46, 4.92, 7.38, 9.84, 12.3, 14.76].map((y) => (
          <path key={y} fill="#b22234" d={`M0 ${y}h24v1.23H0z`} />
        ))}
        <path fill="#3c3b6e" d="M0 0h10.5v8.62H0z" />
        {[1.3, 3.8, 6.3].flatMap((y) =>
          [1.4, 3.3, 5.2, 7.1, 9].map((x) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r=".35" fill="#fff" />
          )),
        )}
      </svg>
    );
  }

  if (code === "EU") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#003399" d="M0 0h24v16H0z" />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={12 + Math.sin(angle) * 4.2}
              cy={8 - Math.cos(angle) * 4.2}
              r=".48"
              fill="#ffcc00"
            />
          );
        })}
      </svg>
    );
  }

  if (code === "GB") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#012169" d="M0 0h24v16H0z" />
        <path stroke="#fff" strokeWidth="3.2" d="m0 0 24 16M24 0 0 16" />
        <path stroke="#c8102e" strokeWidth="1.5" d="m0 0 24 16M24 0 0 16" />
        <path stroke="#fff" strokeWidth="5" d="M12 0v16M0 8h24" />
        <path stroke="#c8102e" strokeWidth="2.8" d="M12 0v16M0 8h24" />
      </svg>
    );
  }

  if (code === "AE") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#00732f" d="M6 0h18v5.33H6z" />
        <path fill="#fff" d="M6 5.33h18v5.34H6z" />
        <path fill="#000" d="M6 10.67h18V16H6z" />
        <path fill="#f00" d="M0 0h6v16H0z" />
      </svg>
    );
  }

  if (code === "AU") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#00008b" d="M0 0h24v16H0z" />
        <path stroke="#fff" strokeWidth="2" d="m0 0 10 7M10 0 0 7" />
        <path stroke="#fff" strokeWidth="3" d="M5 0v7M0 3.5h10" />
        <path stroke="#cf142b" strokeWidth="1.5" d="M5 0v7M0 3.5h10" />
        <g fill="#fff">
          <circle cx="17.5" cy="4" r=".7" />
          <circle cx="20" cy="8" r=".65" />
          <circle cx="15.5" cy="9.5" r=".65" />
          <circle cx="18" cy="13" r=".7" />
          <circle cx="7" cy="12" r="1" />
        </g>
      </svg>
    );
  }

  if (code === "CA") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#fff" d="M0 0h24v16H0z" />
        <path fill="#d80621" d="M0 0h5v16H0zM19 0h5v16h-5z" />
        <path
          fill="#d80621"
          d="m12 2 1.1 2.2 2-.8-.7 2 2.1.9-1.8 1.4 1.2 1.7-2.6-.4.3 3.1h-1.2l.2-3.1-2.5.4 1.2-1.7-1.8-1.4 2.1-.9-.7-2 2 .8L12 2Z"
        />
      </svg>
    );
  }

  if (code === "SG") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#ef3340" d="M0 0h24v8H0z" />
        <path fill="#fff" d="M0 8h24v8H0z" />
        <circle cx="6" cy="4" r="2.6" fill="#fff" />
        <circle cx="7.1" cy="3.5" r="2.25" fill="#ef3340" />
        {[4.8, 6.2, 7.4, 6.8, 5.3].map((x, i) => (
          <circle key={`${x}-${i}`} cx={x} cy={[2.2, 1.8, 2.8, 4.1, 4.2][i]} r=".28" fill="#fff" />
        ))}
      </svg>
    );
  }

  if (code === "BR") {
    return (
      <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
        <path fill="#009b3a" d="M0 0h24v16H0z" />
        <path fill="#ffdf00" d="m12 2 9 6-9 6-9-6 9-6Z" />
        <circle cx="12" cy="8" r="3.2" fill="#002776" />
        <path d="M9.2 7.4c2-.7 4.1-.4 5.8.8" fill="none" stroke="#fff" strokeWidth=".55" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className={shared} aria-hidden="true">
      <path fill="#fff" d="M0 0h24v16H0z" />
      <circle cx="12" cy="8" r="4.2" fill="#bc002d" />
    </svg>
  );
}

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
        className={`flex items-center justify-between border rounded-md transition-colors
          border-slate-300/70 dark:border-white/10
          bg-slate-900/[0.04] dark:bg-white/[0.04]
          text-slate-600 dark:text-slate-300
          hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400
          ${full
            ? "w-full px-2 py-2 min-h-8 gap-1.5"
            : "px-1 h-7 min-w-0 gap-0.5"}`}
      >
        <span className="flex items-center gap-1">
          <CurrencyFlag code={currency.flag} className={`${full ? "w-[16px] h-[11px]" : "w-[15px] h-[10px]"} flex-shrink-0`} />
          <span className="font-orbitron text-[9px] font-semibold tracking-wider leading-none">
            {currency.symbol}{full ? ` ${currency.code}` : ""}
          </span>
        </span>
        <ChevronDown
          className={`w-2.5 h-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={`absolute z-[100] mt-1.5 max-h-64 overflow-y-auto rounded-md border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0d0f16]/95 backdrop-blur-xl shadow-xl shadow-slate-900/10 dark:shadow-black/60 p-1 ${
              full ? "left-0 right-0" : "right-0 w-40"
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
                  className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-left transition-colors text-[11px] ${
                    active
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <CurrencyFlag code={c.flag} className="w-[18px] h-[12px] flex-shrink-0" />
                  <span className="font-orbitron text-[9.5px] font-semibold flex-shrink-0">
                    {c.symbol} {c.code}
                  </span>
                  <span className="text-[10px] truncate flex-1 ml-1">{c.name}</span>
                  {active && <Check className="w-2.5 h-2.5 flex-shrink-0" />}
                  {c.code === "INR" && !active && (
                    <span className="text-[8px] font-orbitron tracking-wider text-slate-400 dark:text-slate-500">
                      BASE
                    </span>
                  )}
                </button>
              );
            })}
            <p className="px-2 py-1.5 text-[9px] text-slate-400 dark:text-slate-500 leading-relaxed border-t border-slate-200 dark:border-white/10 mt-1">
              Prices are set in INR. Other currencies are indicative conversions.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

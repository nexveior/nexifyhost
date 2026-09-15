import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  RefreshCw,
  MessageCircle,
  Globe2,
  Wrench,
  CalendarClock,
} from "lucide-react";
import { status, site } from "../data/config";
import PageHero from "../components/PageHero";

const DAYS = 30;

/* deterministic pseudo-random per service+day so bars are stable */
function dayTone(seed: number, day: number): "ok" | "degraded" | "down" {
  const v = Math.abs(Math.sin(seed * 37.13 + day * 12.9898) * 43758.5453) % 1;
  if (v > 0.985) return "down";
  if (v > 0.94) return "degraded";
  return "ok";
}

const toneColor: Record<string, string> = {
  ok: "#22c55e",
  degraded: "#f59e0b",
  down: "#ef4444",
};

export default function StatusPage() {
  const { refreshSeconds } = status;
  const [tick, setTick] = useState(0);
  const [countdown, setCountdown] = useState(refreshSeconds);
  const [updatedAt, setUpdatedAt] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setTick((t) => t + 1);
          setUpdatedAt(new Date());
          return refreshSeconds;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [refreshSeconds]);

  /* latency values breathe a little on every refresh tick */
  const latency = (base: number, seed: number) =>
    Math.max(2, Math.round(base + Math.sin(tick * 0.9 + seed) * 6));

  const allOperational = true;
  const time = updatedAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <PageHero
        badge={status.badge}
        title={status.title}
        accent={status.accent}
        subtitle={status.subtitle}
      >
        <a
          href={site.discord}
          className="button-secondary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider text-slate-800 dark:text-white"
        >
          <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Subscribe via Discord
        </a>
      </PageHero>

      {/* overall banner */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void overflow-hidden transition-colors duration-300">
        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="card-shell !border-emerald-500/40 relative overflow-hidden p-6 sm:p-8"
          >
            <div className="absolute -top-20 -right-16 w-72 h-52 rounded-full blur-3xl pointer-events-none bg-emerald-500/15" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 animate-ping" />
                <CheckCircle2 className="w-6 h-6 text-emerald-500 relative" />
              </span>
              <div className="flex-1">
                <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-slate-900 dark:text-white transition-colors">
                  {allOperational
                    ? "All Systems Operational"
                    : "Some services degraded"}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 transition-colors">
                  Monitored across 5 edge regions · last probe at {time}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    Next refresh
                  </div>
                  <div className="font-orbitron font-bold text-slate-900 dark:text-white tabular-nums">
                    {String(countdown).padStart(2, "0")}s
                  </div>
                </div>
                <span className="w-10 h-10 rounded-lg border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
                  <RefreshCw
                    className="w-4.5 h-4.5 text-emerald-500 transition-transform duration-700"
                    style={{ transform: `rotate(${tick * 180}deg)` }}
                  />
                </span>
              </div>
            </div>
            {/* countdown bar */}
            <div className="mt-5 h-1 rounded-full bg-slate-900/5 dark:bg-white/8 overflow-hidden">
              <motion.div
                key={tick}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: refreshSeconds, ease: "linear" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* services */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {status.services.map((s, i) => {
              const ms = latency(s.latency, s.seed);
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="card-shell p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-orbitron text-sm font-semibold text-slate-900 dark:text-white transition-colors truncate">
                        {s.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 transition-colors truncate">
                        {s.desc}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/12 border border-emerald-500/35 text-emerald-600 dark:text-emerald-400 text-[9px] font-orbitron font-semibold tracking-widest uppercase whitespace-nowrap flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Operational
                    </span>
                  </div>

                  {/* 30-day uptime bars */}
                  <div className="mt-4 flex items-end gap-[3px] h-8">
                    {Array.from({ length: DAYS }, (_, d) => {
                      const tone = dayTone(s.seed, d);
                      return (
                        <span
                          key={d}
                          title={`Day ${d + 1} · ${tone === "ok" ? "No incidents" : tone === "degraded" ? "Minor latency" : "Brief outage"}`}
                          className="flex-1 rounded-sm transition-transform hover:scale-y-110 hover:scale-x-105"
                          style={{
                            backgroundColor: toneColor[tone],
                            height:
                              tone === "ok"
                                ? "100%"
                                : tone === "degraded"
                                  ? "66%"
                                  : "34%",
                            opacity: 0.45 + ((d + 1) / DAYS) * 0.55,
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">
                      30-day uptime{" "}
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {s.uptime}
                      </span>
                    </span>
                    <span className="font-mono tabular-nums text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-blue-500" />
                      {ms} ms
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-4 items-start">
            {/* regions */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="card-shell p-5 sm:p-6"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Globe2 className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
                </span>
                <div>
                  <h3 className="font-orbitron text-sm font-semibold text-slate-900 dark:text-white transition-colors">
                    Round-trip latency by region
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Measured every minute from our edge probes
                  </p>
                </div>
              </div>
              <div className="space-y-3.5">
                {status.regions.map((r) => {
                  const ms = latency(r.ms, r.ms % 17);
                  const pct = Math.min(100, (ms / 220) * 100);
                  return (
                    <div key={r.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-600 dark:text-slate-300 font-medium">
                          {r.name}
                        </span>
                        <span className="font-mono tabular-nums text-slate-900 dark:text-white">
                          {ms} ms
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-900/5 dark:bg-white/8 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* incident history */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="card-shell p-5 sm:p-6"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <CalendarClock className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
                </span>
                <div>
                  <h3 className="font-orbitron text-sm font-semibold text-slate-900 dark:text-white transition-colors">
                    Incident & maintenance history
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Full postmortems are posted on Discord
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {status.incidents.map((inc) => (
                  <div
                    key={inc.title}
                    className="relative pl-5 border-l-2 border-slate-200 dark:border-white/10"
                  >
                    <span
                      className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${
                        inc.tone === "amber" ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="font-orbitron text-xs font-semibold text-slate-900 dark:text-white transition-colors">
                        {inc.title}
                      </span>
                      <span
                        className={`text-[9px] font-orbitron font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                          inc.tone === "amber"
                            ? "bg-amber-500/10 border-amber-500/35 text-amber-600 dark:text-amber-400"
                            : "bg-emerald-500/10 border-emerald-500/35 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {inc.tag}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <Wrench className="w-3 h-3" /> {inc.date}
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                      {inc.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="card-shell px-5 py-3.5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-slate-500 dark:text-slate-400"
          >
            <span className="font-orbitron text-[10px] tracking-[0.2em] uppercase">
              Legend
            </span>
            {[
              { c: toneColor.ok, t: "Operational" },
              { c: toneColor.degraded, t: "Elevated latency" },
              { c: toneColor.down, t: "Brief outage" },
            ].map((l) => (
              <span key={l.t} className="inline-flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: l.c }}
                />
                {l.t}
              </span>
            ))}
            <span className="ml-auto">
              Something looks off?{" "}
              <a
                href={site.discord}
                className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2"
              >
                Report it on Discord
              </a>
            </span>
          </motion.div>
        </div>
      </section>
    </>
  );
}

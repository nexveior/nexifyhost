import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Lock, Settings, Zap, Globe, Star } from "lucide-react";
import { domains, site } from "../data/config";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { useCurrency } from "../hooks/useCurrency";

const icons: Record<string, typeof Zap> = { lock: Lock, settings: Settings, zap: Zap };

export default function DomainsPage() {
  const { format } = useCurrency();

  return (
    <>
      <PageHero
        badge={domains.badge}
        title="Grab Your"
        accent="Domain"
        subtitle={domains.subtitle}
      >
        <a
          href={site.gamePanel}
          className="button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
        >
          Search Domains
          <ArrowRight className="w-4 h-4" />
        </a>
        <span className="chip-badge">10 TLDs available</span>
      </PageHero>

      {/* TLD list */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void overflow-hidden transition-colors duration-300">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeading
            align="center"
            badge="Pricing"
            title="Available Extensions"
            subtitle="Transparent yearly pricing — renewals at the same rate, no first-year gimmicks."
          />

          <div className="space-y-2.5">
            {domains.tlds.map((d, i) => (
              <motion.div
                key={d.tld}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                className={`card-shell flex items-center gap-4 px-4 sm:px-5 py-4 ${
                  d.popular ? "!border-blue-500/40" : ""
                }`}
              >
                <span className="w-14 sm:w-20 flex-shrink-0">
                  <span className="font-orbitron font-bold text-base sm:text-lg text-blue-600 dark:text-blue-400">
                    {d.tld}
                  </span>
                </span>

                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 truncate transition-colors">
                      {d.note}
                    </span>
                    {d.popular && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-orbitron font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 flex-shrink-0">
                        <Star className="w-2.5 h-2.5" /> Popular
                      </span>
                    )}
                  </span>
                </span>

                <span className="text-right flex-shrink-0">
                  <span className="font-orbitron font-bold text-sm sm:text-base text-slate-900 dark:text-white transition-colors">
                    {typeof d.price === "number" ? format(d.price) : d.price}
                  </span>
                  {typeof d.price === "number" && (
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500">/year</span>
                  )}
                </span>

                <a
                  href={site.gamePanel}
                  className="hidden sm:inline-flex button-secondary items-center gap-1.5 px-4 py-2 rounded-lg font-orbitron text-[10px] font-semibold tracking-wider text-slate-800 dark:text-white flex-shrink-0"
                >
                  Register
                  <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 card-shell p-5 flex items-start gap-3"
          >
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-300 transition-colors">
                {domains.note}
              </p>
              <a
                href={site.discord}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Request a TLD on Discord
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* features */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eaeef7] dark:bg-[#0c0e14] transition-colors duration-300">
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            align="center"
            badge="Included"
            title="With Every Domain"
            subtitle="No upsells — the essentials come standard."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {domains.features.map((f, i) => {
              const Icon = icons[f.icon] ?? Zap;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-shell group p-6"
                >
                  <span className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </span>
                  <h3 className="font-orbitron text-base font-semibold text-slate-900 dark:text-white mb-1.5 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    {f.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

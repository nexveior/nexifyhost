import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Cpu, HardDrive, MapPin, Network, KeyRound, Shield } from "lucide-react";
import { vps, site } from "../data/config";
import PageHero from "../components/PageHero";
import PlanCard from "../components/PlanCard";
import SectionHeading from "../components/SectionHeading";
import { useCurrency } from "../hooks/useCurrency";

export default function VPSPage() {
  const { format } = useCurrency();
  const lowest = Math.min(
    ...vps.plans
      .map((p) => Number(p.price) || 0)
      .filter((n) => n > 0)
  );

  const specIcons: Record<string, any> = {
    CPU: Cpu,
    RAM: HardDrive,
    Storage: HardDrive,
    Location: MapPin,
    Network: Network,
    Virtualization: KeyRound,
    Access: KeyRound,
    DDoS: Shield,
  };

  return (
    <>
      <PageHero
        badge={vps.badge}
        title="Performance"
        accent="VPS Hosting"
        subtitle={vps.subtitle}
      >
        <a
          href={site.gamePanel}
          target="_blank"
          rel="noreferrer noopener"
          className="button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </a>
        <span className="chip-badge">From {format(lowest)}/mo</span>
      </PageHero>

      {/* plans */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeading
            align="center"
            badge="Plans"
            title="VPS Hosting Plans"
            subtitle="Choose the capacity you need. Scalable resources with dedicated IPv4 and full root access on every node."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
            {vps.plans.map((p, i) => (
              <PlanCard key={p.name} plan={p} index={i} accent="#3b82f6" />
            ))}
          </div>
        </div>
      </section>

      {/* hardware specs */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eaeef7] dark:bg-[#0c0e14] transition-colors duration-300">
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeading
            align="center"
            badge="Hardware"
            title="Plan Specifications"
            subtitle="Industry-standard components and optimized network routing for the best virtualized experience."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {vps.hardware.map((spec, i) => {
              const Icon = specIcons[spec.label] || Cpu;
              return (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card-shell p-5 flex flex-col items-center text-center gap-3"
                >
                  <span className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {spec.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {spec.value}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Need a custom plan or bulk pricing? Open a ticket in our Discord.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={site.discord}
                target="_blank"
                rel="noreferrer noopener"
                className="button-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                Open Ticket
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

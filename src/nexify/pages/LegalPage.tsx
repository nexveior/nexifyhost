import { motion } from "framer-motion";
import { FileText, ShieldCheck } from "lucide-react";
import { legalDocs } from "../data/config";
import PageHero from "../components/PageHero";
import NotFound from "./NotFound";

export default function LegalPage({ docKey }: { docKey: string }) {
  const doc = legalDocs[docKey];
  if (!doc) return <NotFound />;

  const Icon = docKey === "privacy-policy" ? ShieldCheck : FileText;

  return (
    <>
      <PageHero badge="Legal" title={doc.title} accent="" subtitle={doc.intro}>
        <span className="chip-badge">
          <Icon className="w-3.5 h-3.5" />
          {doc.updated}
        </span>
      </PageHero>

      <section className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          {doc.sections.map((s, i) => (
            <motion.div
              key={s.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
              className="card-shell p-6 sm:p-8"
            >
              <h2 className="font-orbitron text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3 transition-colors">
                <span className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[11px] text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                {s.heading.replace(/^\d+\.\s*/, "")}
              </h2>
              {s.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3 last:mb-0 transition-colors"
                >
                  {p}
                </p>
              ))}
            </motion.div>
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs text-slate-400 dark:text-slate-500 pt-4 transition-colors"
          >
            This document is provided for the NexifyHost recreation project. Replace with your own
            reviewed legal text before going live.
          </motion.p>
        </div>
      </section>
    </>
  );
}

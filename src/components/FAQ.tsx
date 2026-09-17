import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faq } from "../data/config";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void [overflow-x:clip] transition-colors duration-300"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-start">
        {/* The column stretches to the full FAQ height. The fixed-size image
            follows the viewport and stops when the FAQ section ends. */}
        <div className="hidden md:block self-stretch min-w-0">
          <div className="sticky top-28">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 blob-primary rounded-full blur-3xl opacity-70" />
              <img
                src={faq.image}
                alt="Server features illustration"
                loading="lazy"
                draggable={false}
                className="relative block h-[480px] w-full rounded-xl object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* accordion */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-9"
          >
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight transition-colors duration-300">
              Frequently Asked{" "}
              <span className="relative inline-block text-blue-600 dark:text-blue-400">
                Questions
                {/* hand-drawn underline flourish */}
                <svg
                  viewBox="0 0 220 12"
                  className="absolute -bottom-1.5 left-0 w-full text-blue-500/70"
                  fill="none"
                >
                  <path
                    d="M3 9C60 3.5 160 3.5 217 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 transition-colors duration-300">
              {faq.subtitle}
            </p>
          </motion.div>

          <div className="space-y-3">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`card-shell overflow-hidden ${isOpen ? "hover-gradient !border-blue-500/45" : ""}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left"
                  >
                    <span
                      className={`font-orbitron flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-sm border transition-colors ${
                        isOpen
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm sm:text-base font-semibold text-slate-900 dark:text-white transition-colors">
                      {item.question}
                    </span>
                    <span className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pl-[68px] text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

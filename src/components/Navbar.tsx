import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Blocks,
  Bot,
  Gamepad2,
  Globe,
  Cloud,
  Activity,
  FileText,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Star,
  MessageCircle,
  Cpu,
  Puzzle,
  User,
} from "lucide-react";
import { site, minecraft, legalDropdown } from "../data/config";
import { useRoute, href } from "../router";
import ThemeToggle from "./ThemeToggle";
import CurrencySelector from "./CurrencySelector";
import { useCurrency } from "../hooks/useCurrency";

const linkBase =
  "relative px-2.5 xl:px-3 py-3 text-[12px] xl:text-[13px] font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap rounded-lg hover:bg-slate-100/70 dark:hover:bg-white/5 after:content-[''] after:absolute after:-bottom-2 after:left-2 after:right-2 after:h-[2px] after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center cursor-pointer";
const linkIdle = "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400";
const linkActive = "text-blue-600 dark:text-blue-400 bg-blue-500/8 dark:bg-blue-500/10 after:scale-x-100";

export default function Navbar({ bannerVisible }: { bannerVisible: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { path } = useRoute();
  const { format } = useCurrency();

  const isActive = (p: string) => path === p || path.startsWith(`${p}/`);
  const navCls = (p: string) => `${linkBase} ${isActive(p) ? linkActive : linkIdle}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [path]);

  const services = [
    { icon: Bot, label: "Bot Hosting", path: "/bots" },
    { icon: Cloud, label: "VPS Hosting", path: "/vps" },
    { icon: Gamepad2, label: "Game Servers", path: "/gameservers" },
    { icon: Globe, label: "Domains", path: "/domains" },
    { icon: Puzzle, label: "Extensions", path: "/extensions" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        bannerVisible ? "top-[41px]" : "top-0"
      } ${
        scrolled
          ? "bg-white/85 dark:bg-[#10121b]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.15)] dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]"
          : "bg-white/60 dark:bg-[#10121b]/30 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 min-h-[72px]">
          {/* brand */}
          <a href={href("/")} className="flex items-center gap-2 sm:gap-3 flex-shrink-0 py-3 min-w-0 lg:w-[220px] xl:w-[250px]">
            <img
              src={site.logo}
              alt="NexifyHost logo"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain"
            />
            <span className="text-base sm:text-lg xl:text-xl font-bold text-slate-900 dark:text-white font-orbitron tracking-wide transition-colors whitespace-nowrap truncate">
              {site.brandName}
              <span className="text-blue-600 dark:text-blue-400">{site.brandAccent}</span>
            </span>
          </a>

          {/* desktop links */}
          <div className="hidden xl:flex items-center justify-center flex-1 min-w-0">
            {/* minecraft dropdown */}
            <div className="relative group">
              <a href={href("/minecraft")} className={navCls("/minecraft")}>
                <span>Minecraft</span>
                <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
              </a>
              <div className="absolute top-full left-0 w-[560px] max-w-[90vw] bg-white/95 dark:bg-[#0d0f16]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 border-t-2 border-t-blue-500 rounded-b-xl shadow-2xl shadow-slate-900/10 dark:shadow-black/60 opacity-0 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-300 p-3 z-50">
                <div className="grid grid-cols-3 gap-3">
                  {minecraft.categories.map((c) => {
                    const from = Math.min(
                      ...c.plans.map((p) => Number(p.price) || 0).filter((n) => n > 0)
                    );
                    return (
                      <a
                        key={c.id}
                        href={href(`/minecraft/${c.id}`)}
                        className="relative block rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-colors group/card"
                      >
                        <div className="relative h-20">
                          <img
                            src={c.image}
                            alt={c.name}
                            loading="lazy"
                            draggable={false}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div
                            className="absolute inset-0 mix-blend-overlay"
                            style={{ backgroundColor: c.accent, opacity: 0.25 }}
                          />
                          <div className="absolute inset-0 bg-black/45 group-hover/card:bg-black/30 transition-colors" />
                          <div className="absolute bottom-2 left-2.5">
                            <h3 className="text-white text-[13px] font-orbitron font-semibold">
                              {c.name}
                            </h3>
                            <p className="text-white/70 text-[9px]">From {format(from)}/mo</p>
                          </div>
                        </div>
                        <div className="p-2.5 bg-white dark:bg-transparent">
                          <p className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                            <Cpu className="w-3 h-3 flex-shrink-0" style={{ color: c.accent }} />
                            <span className="truncate">{c.cpu}</span>
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {services.map((s) => (
              <a key={s.path} href={href(s.path)} className={navCls(s.path)}>
                <span>{s.label}</span>
              </a>
            ))}

            <a href={href("/status")} className={`${linkBase} ${linkIdle}`}>
              <span>Status</span>
            </a>

            {/* legal dropdown */}
            <div className="relative group">
              <a
                href={href("/terms-of-services")}
                className={`${linkBase} ${
                  isActive("/terms-of-services") || isActive("/privacy-policy")
                    ? linkActive
                    : linkIdle
                }`}
              >
                <span>Legal</span>
                <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
              </a>
              <div className="absolute top-full left-0 w-[260px] bg-white/95 dark:bg-[#0d0f16]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 border-t-2 border-t-blue-500 rounded-b-xl shadow-2xl shadow-slate-900/10 dark:shadow-black/60 opacity-0 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-300 p-3 z-50">
                {legalDropdown.map((item) => (
                  <a
                    key={item.name}
                    href={href(item.href)}
                    className={`block p-3 rounded-lg border transition-colors ${
                      isActive(item.href)
                        ? "border-blue-500/40 bg-blue-500/10"
                        : "border-transparent hover:border-blue-500/40 hover:bg-blue-500/10"
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* right actions */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0 lg:w-[220px] xl:w-[250px] justify-end">
            <a
              href={site.discord}
              aria-label="Discord"
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>
            <a
              href={site.trustpilot}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Trustpilot"
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Star className="w-4.5 h-4.5" />
            </a>
            <CurrencySelector />
            <ThemeToggle />
            <a
              href={site.gamePanel}
              target="_blank"
              rel="noreferrer noopener"
              className="button-primary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-orbitron text-[10px] font-semibold tracking-wider whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              Dashboard
            </a>
          </div>

          {/* mobile toggle */}
          <div className="lg:hidden h-full py-3 flex items-center gap-2 flex-shrink-0">
            <CurrencySelector />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white dark:bg-[#10121b] border-t border-slate-200 dark:border-white/10 transition-colors"
          >
            <div className="px-4 py-4 space-y-1.5 max-h-[70vh] overflow-y-auto">
              {/* minecraft accordion */}
              <div className="flex">
                <a
                  href={href("/minecraft")}
                  className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-l-lg font-bold whitespace-nowrap transition-colors ${
                    isActive("/minecraft")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-500/10"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <Blocks className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Minecraft
                </a>
                <button
                  onClick={() => setOpenSection(openSection === "mc" ? null : "mc")}
                  aria-label="Toggle plans"
                  className="px-3 py-3 rounded-r-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${openSection === "mc" ? "rotate-90" : ""}`}
                  />
                </button>
              </div>
              <AnimatePresence>
                {openSection === "mc" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-3 space-y-2 py-2"
                  >
                    {minecraft.categories.map((c) => (
                      <a
                        key={c.id}
                        href={href(`/minecraft/${c.id}`)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-colors"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: c.accent }}
                        />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {c.name}
                        </span>
                        <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500">
                          from{" "}
                          {format(
                            Math.min(
                              ...c.plans.map((p) => Number(p.price) || 0).filter((n) => n > 0)
                            )
                          )}
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {services.map((s) => (
                <a
                  key={s.path}
                  href={href(s.path)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg font-bold whitespace-nowrap transition-colors ${
                    isActive(s.path)
                      ? "text-blue-600 dark:text-blue-400 bg-blue-500/10"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <s.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  {s.label}
                </a>
              ))}

              <a
                href={href("/status")}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 font-bold whitespace-nowrap transition-colors"
              >
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Status
              </a>



              {/* legal accordion */}
              <button
                onClick={() => setOpenSection(openSection === "legal" ? null : "legal")}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-3 font-bold whitespace-nowrap">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Legal
                </span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${openSection === "legal" ? "rotate-90" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openSection === "legal" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-11 pr-3"
                  >
                    {legalDropdown.map((item) => (
                      <a
                        key={item.name}
                        href={href(item.href)}
                        className="block py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold whitespace-nowrap transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* currency (full width on mobile) */}
              <div className="pt-2">
                <span className="block text-[10px] font-orbitron tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-2 px-1">
                  Currency
                </span>
                <CurrencySelector full />
              </div>

              <a
                href={site.gamePanel}
                target="_blank"
                rel="noreferrer noopener"
                className="button-primary mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-orbitron text-sm font-semibold tracking-wider w-full"
              >
                <User className="w-4 h-4" />
                Dashboard
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

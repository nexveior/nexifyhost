import { MessageCircle, Star, Activity } from "lucide-react";
import { site, footer } from "../data/config";

/** internal route paths ("/games") become hash links ("#/games"), externals pass through */
const link = (to: string) => (to.startsWith("/") ? `#${to}` : to);

export default function Footer() {
  return (
    <footer className="relative bg-[#e3e8f2] dark:bg-[#08090d] border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] blob-primary rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="footer-grid grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* brand */}
          <div className="col-span-2">
            <a href="#/" className="flex items-center gap-3">
              <img
                src={site.logo}
                alt="NexifyHost logo"
                loading="lazy"
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="text-xl font-bold text-slate-900 dark:text-white font-orbitron tracking-wide transition-colors">
                {site.brandName}
                <span className="text-blue-600 dark:text-blue-400">{site.brandAccent}</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs transition-colors">
              {footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              {[
                { icon: MessageCircle, href: site.discord, label: "Discord" },
                { icon: Star, href: site.trustpilot, label: "Trustpilot" },
                { icon: Activity, href: site.statusPage, label: "Status" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.03] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-orbitron text-slate-900 dark:text-white text-xs font-semibold tracking-[0.2em] uppercase mb-4 transition-colors">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={link(l.href)}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} NexifyHost. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
            </span>
            All systems operational
          </div>
        </div>

        {/* Professional closing statement shown last on every page. */}
        <div className="mt-6 pt-6 border-t border-slate-200/70 dark:border-white/5 text-center sm:text-left">
          <p className="font-orbitron text-xs font-semibold tracking-[0.14em] uppercase text-slate-700 dark:text-slate-300 transition-colors">
            {footer.closingTitle}
          </p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-500 dark:text-slate-400 transition-colors">
            {footer.closingText}
          </p>
          <p className="mt-3 max-w-4xl text-[10px] leading-relaxed text-slate-400 dark:text-slate-600 transition-colors">
            {footer.trademarkNotice}
          </p>
        </div>
      </div>
    </footer>
  );
}

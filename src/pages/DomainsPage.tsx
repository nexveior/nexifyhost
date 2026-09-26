import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  Globe2,
  LoaderCircle,
  Lock,
  MessageCircle,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Star,
  X,
  Zap,
} from "lucide-react";
import { domains, site } from "../data/config";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { useCurrency } from "../hooks/useCurrency";

type LookupState = "idle" | "checking" | "available" | "registered" | "unknown";

interface RdapEvent {
  eventAction?: string;
  eventDate?: string;
}

interface RdapResponse {
  ldhName?: string;
  handle?: string;
  status?: string[];
  nameservers?: { ldhName?: string }[];
  events?: RdapEvent[];
}

interface LookupResult {
  domain: string;
  state: Exclude<LookupState, "idle" | "checking">;
  data?: RdapResponse;
  note?: string;
}

interface IanaBootstrap {
  services?: [string[], string[]][];
}

const featureIcons: Record<string, typeof Zap> = {
  lock: Lock,
  settings: Settings,
  zap: Zap,
};

const normalizeLabel = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\..*$/, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const readableDate = (date?: string) => {
  if (!date) return "Not published";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Not published";
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const eventDate = (data: RdapResponse | undefined, actions: string[]) =>
  data?.events?.find((event) => actions.includes(event.eventAction ?? ""))?.eventDate;

async function lookupDomain(domain: string, signal: AbortSignal): Promise<LookupResult> {
  const tld = domain.split(".").at(-1)?.toLowerCase();
  if (!tld) return { domain, state: "unknown", note: "Invalid domain extension." };

  try {
    const bootstrapResponse = await fetch("https://data.iana.org/rdap/dns.json", {
      signal,
      cache: "force-cache",
    });
    if (!bootstrapResponse.ok) throw new Error("IANA bootstrap is unavailable.");

    const bootstrap = (await bootstrapResponse.json()) as IanaBootstrap;
    const service = bootstrap.services?.find(([tlds]) =>
      tlds.some((item) => item.toLowerCase() === tld),
    );
    const baseUrl = service?.[1]?.[0];
    if (!baseUrl) {
      return {
        domain,
        state: "unknown",
        note: `The .${tld} registry does not publish an RDAP endpoint through IANA.`,
      };
    }

    const endpoint = `${baseUrl.replace(/\/$/, "")}/domain/${encodeURIComponent(domain)}`;
    const response = await fetch(endpoint, {
      signal,
      headers: { Accept: "application/rdap+json, application/json" },
    });

    if (response.status === 404) {
      return {
        domain,
        state: "available",
        note: "No registration record was returned by the authoritative registry.",
      };
    }

    if (response.status === 429) {
      return {
        domain,
        state: "unknown",
        note: "The registry rate-limited this lookup. Please wait a moment and retry.",
      };
    }

    if (!response.ok) {
      return {
        domain,
        state: "unknown",
        note: `The registry returned HTTP ${response.status}.`,
      };
    }

    return {
      domain,
      state: "registered",
      data: (await response.json()) as RdapResponse,
      note: "An active registration record was found.",
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    return {
      domain,
      state: "unknown",
      note:
        "The registry blocked this browser lookup or the network is unavailable. Try the public RDAP link below.",
    };
  }
}

export default function DomainsPage() {
  const { format } = useCurrency();
  const inputRef = useRef<HTMLInputElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const [query, setQuery] = useState("");
  const [selectedTld, setSelectedTld] = useState(domains.tlds[0]?.tld ?? ".com");
  const [state, setState] = useState<LookupState>("idle");
  const [result, setResult] = useState<LookupResult | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const label = normalizeLabel(query);
  const inferredTld = domains.tlds.find((item) =>
    query.toLowerCase().trim().endsWith(item.tld),
  )?.tld;
  const activeTld = inferredTld ?? selectedTld;
  const selected = domains.tlds.find((item) => item.tld === activeTld) ?? domains.tlds[0];
  const fullDomain = label ? `${label}${activeTld}` : activeTld;

  const sortedTlds = useMemo(
    () => [...domains.tlds].sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular))),
    [],
  );

  const runLookup = async (event?: FormEvent) => {
    event?.preventDefault();
    if (label.length < 2 || label.length > 63 || label.startsWith("-") || label.endsWith("-")) {
      inputRef.current?.focus();
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setResult(null);
    setState("checking");

    try {
      if (inferredTld) setSelectedTld(inferredTld);
      const nextResult = await lookupDomain(`${label}${activeTld}`, controller.signal);
      setResult(nextResult);
      setState(nextResult.state);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setResult({
          domain: `${label}${activeTld}`,
          state: "unknown",
          note: "The lookup could not be completed. Please try again.",
        });
        setState("unknown");
      }
    }
  };

  const chooseTld = (tld: string) => {
    setSelectedTld(tld);
    setResult(null);
    setState("idle");
    inputRef.current?.focus();
    document.getElementById("domain-search")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const registrationDate = eventDate(result?.data, ["registration"]);
  const expirationDate = eventDate(result?.data, ["expiration"]);

  return (
    <>
      <PageHero
        badge={domains.badge}
        title="Find Your Perfect"
        accent="Domain"
        subtitle="Search live registry records, compare transparent annual pricing and connect your new name to a NexifyHost server in minutes."
      >
        <span className="chip-badge">{domains.tlds.length} curated extensions</span>
        <span className="chip-badge !border-emerald-500/40 !bg-emerald-500/10 !text-emerald-600 dark:!text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" /> Free privacy & DNS
        </span>
      </PageHero>

      {/* Search is the primary action, visually connected to the hero. */}
      <section className="relative -mt-5 pb-16 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.form
            id="domain-search"
            onSubmit={runLookup}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="card-shell !border-blue-500/35 p-2 sm:p-2.5 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="flex flex-1 min-w-0 items-center gap-3 px-3 rounded-lg bg-white/40 dark:bg-black/10 border border-slate-200/80 dark:border-white/8 focus-within:border-blue-500/50 transition-colors">
                <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    if (state !== "idle") {
                      setState("idle");
                      setResult(null);
                    }
                  }}
                  placeholder="yourbrand"
                  autoComplete="off"
                  spellCheck={false}
                  maxLength={90}
                  aria-label="Domain name"
                  className="w-full min-w-0 bg-transparent py-3.5 text-base sm:text-lg text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                />
              </label>

              <label className="relative sm:w-40">
                <span className="sr-only">Domain extension</span>
                <select
                  value={selectedTld}
                  onChange={(event) => {
                    setSelectedTld(event.target.value);
                    setState("idle");
                    setResult(null);
                  }}
                  className="w-full h-full min-h-12 appearance-none rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 pr-9 font-orbitron text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500/50"
                >
                  {domains.tlds.map((item) => (
                    <option key={item.tld} value={item.tld} className="bg-white text-slate-900">
                      {item.tld}
                    </option>
                  ))}
                </select>
                <Globe2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
              </label>

              <button
                type="submit"
                disabled={label.length < 2 || state === "checking"}
                className="button-primary min-h-12 inline-flex items-center justify-center gap-2 px-6 rounded-lg font-orbitron text-xs font-semibold tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {state === "checking" ? (
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {state === "checking" ? "Checking" : "Check domain"}
              </button>
            </div>

            <div className="px-2 sm:px-3 pt-2.5 flex flex-wrap justify-between gap-2 text-[10px] text-slate-400 dark:text-slate-500">
              <span>Letters, numbers and hyphens · 2–63 characters</span>
              <span className="font-mono truncate">{fullDomain}</span>
            </div>
          </motion.form>

          <AnimatePresence mode="wait">
            {state !== "idle" && (
              <motion.div
                key={`${state}-${result?.domain ?? fullDomain}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mt-5"
              >
                {state === "checking" ? (
                  <div className="card-shell p-5 sm:p-6 flex items-center gap-4">
                    <span className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                      <LoaderCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
                    </span>
                    <div>
                      <h2 className="font-orbitron text-sm font-semibold text-slate-900 dark:text-white">
                        Asking the authoritative registry
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Looking up {fullDomain} through the IANA RDAP directory…
                      </p>
                    </div>
                  </div>
                ) : result ? (
                  <div
                    className={`card-shell relative overflow-hidden p-5 sm:p-7 ${
                      state === "available"
                        ? "!border-emerald-500/45"
                        : state === "registered"
                          ? "!border-amber-500/40"
                          : "!border-slate-400/35"
                    }`}
                  >
                    <div
                      className={`absolute -top-20 -right-16 w-64 h-48 rounded-full blur-3xl pointer-events-none ${
                        state === "available"
                          ? "bg-emerald-500/15"
                          : state === "registered"
                            ? "bg-amber-500/12"
                            : "bg-slate-500/10"
                      }`}
                    />

                    <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
                      <span
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${
                          state === "available"
                            ? "bg-emerald-500/12 border-emerald-500/40 text-emerald-500"
                            : state === "registered"
                              ? "bg-amber-500/12 border-amber-500/40 text-amber-500"
                              : "bg-slate-500/10 border-slate-400/35 text-slate-500"
                        }`}
                      >
                        {state === "available" ? (
                          <Check className="w-6 h-6" />
                        ) : state === "registered" ? (
                          <X className="w-6 h-6" />
                        ) : (
                          <CircleAlert className="w-6 h-6" />
                        )}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                          Registry result
                        </p>
                        <h2 className="mt-1 font-orbitron text-lg sm:text-xl font-bold text-slate-900 dark:text-white break-all">
                          {result.domain}
                        </h2>
                        <p
                          className={`mt-1 text-sm font-semibold ${
                            state === "available"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : state === "registered"
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {state === "available"
                            ? "No active registry record found"
                            : state === "registered"
                              ? "This domain is already registered"
                              : "Availability could not be verified"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {result.note}
                        </p>
                      </div>

                      <div className="sm:text-right flex-shrink-0">
                        <p className="font-orbitron text-xl font-bold text-slate-900 dark:text-white">
                          {typeof selected.price === "number" ? format(selected.price) : selected.price}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">per year</p>
                      </div>
                    </div>

                    {state === "registered" && (
                      <div className="relative mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 dark:border-white/8 pt-5">
                        <div className="flex items-start gap-2.5">
                          <Clock3 className="w-4 h-4 text-amber-500 mt-0.5" />
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-slate-400">Registered</p>
                            <p className="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
                              {readableDate(registrationDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Clock3 className="w-4 h-4 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-slate-400">Expires</p>
                            <p className="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
                              {readableDate(expirationDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Server className="w-4 h-4 text-violet-500 mt-0.5" />
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-slate-400">Nameservers</p>
                            <p className="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
                              {result.data?.nameservers?.length ?? 0} published
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="relative mt-5 flex flex-wrap items-center gap-3">
                      {state === "available" && (
                        <a
                          href={site.discord}
                          className="button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-orbitron text-[11px] font-semibold tracking-wider"
                        >
                          Register via Discord
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={`https://rdap.org/domain/${encodeURIComponent(result.domain)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="button-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-orbitron text-[11px] font-semibold tracking-wider text-slate-800 dark:text-white"
                      >
                        Open public RDAP
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => void runLookup()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
                      >
                        Check again
                      </button>
                    </div>

                    {state === "available" && (
                      <p className="relative mt-3 text-[10px] text-slate-400 dark:text-slate-500">
                        A missing RDAP record is a strong availability signal, but reserved and premium names require final registrar confirmation.
                      </p>
                    )}
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Curated pricing grid replaces the long list. */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#eaeef7] dark:bg-[#0c0e14] overflow-hidden transition-colors duration-300">
        <div className="absolute top-12 -right-40 w-[420px] h-[420px] blob-primary rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            align="center"
            badge="Transparent pricing"
            title="Choose Your Extension"
            subtitle="Straightforward annual pricing with DNS management and privacy included. Pick an extension, then check your name above."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {sortedTlds.map((item, index) => (
              <motion.button
                key={item.tld}
                type="button"
                onClick={() => chooseTld(item.tld)}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.36) }}
                className={`card-shell group p-4 text-left ${
                  selectedTld === item.tld ? "!border-blue-500/60" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-orbitron font-bold text-xl text-blue-600 dark:text-blue-400">
                    {item.tld}
                  </span>
                  {item.popular && (
                    <span className="text-amber-500" title="Popular extension">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </span>
                  )}
                </div>
                <span className="mt-1 block text-[10px] text-slate-500 dark:text-slate-400 leading-snug min-h-7">
                  {item.note}
                </span>
                <span className="mt-3 flex items-end justify-between gap-2 border-t border-slate-200 dark:border-white/8 pt-3">
                  <span>
                    <span className="font-orbitron font-bold text-sm text-slate-900 dark:text-white">
                      {typeof item.price === "number" ? format(item.price) : item.price}
                    </span>
                    <span className="block text-[9px] text-slate-400">per year</span>
                  </span>
                  <span className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </span>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 card-shell p-5 flex items-start gap-3"
          >
            <Globe2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-300 transition-colors">
                {domains.note}
              </p>
              <a
                href={site.discord}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Request another TLD on Discord
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f2f5fb] dark:bg-void transition-colors duration-300">
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            align="center"
            badge="Included by default"
            title="Everything Your Domain Needs"
            subtitle="A clean ownership experience from registration to DNS — without surprise add-ons at checkout."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {domains.features.map((feature, index) => {
              const Icon = featureIcons[feature.icon] ?? Zap;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="card-shell group p-6"
                >
                  <span className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </span>
                  <h3 className="font-orbitron text-base font-semibold text-slate-900 dark:text-white mb-1.5 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <a
              href={site.discord}
              className="button-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-orbitron text-sm font-semibold tracking-wider"
            >
              <MessageCircle className="w-4 h-4" /> Talk to our domain team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
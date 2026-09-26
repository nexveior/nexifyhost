import { motion } from "framer-motion";
import { BadgeCheck, MessageCircle, Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { reviews, reviewStats, site, type Review } from "../data/config";

function Stars({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < rating
              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.45)]"
              : "text-slate-300 dark:text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-orbitron text-sm font-bold text-white shadow-lg shadow-blue-500/30 ring-2 ring-white/60 dark:ring-white/10">
      {name.replace(/[^a-z0-9]/gi, "").charAt(0).toUpperCase() || name.charAt(0).toUpperCase()}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.09 }}
      className={`card-shell group relative flex flex-col gap-4 p-6 sm:p-7 ${
        review.featured ? "md:col-span-2 lg:col-span-3 lg:flex-row lg:items-start lg:gap-8 lg:p-9" : ""
      }`}
    >
      {/* oversized quote glyph */}
      <Quote
        className={`shrink-0 text-blue-500/25 transition-colors duration-300 dark:text-blue-400/25 ${
          review.featured ? "absolute right-7 top-7 h-14 w-14" : "h-8 w-8"
        }`}
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Stars rating={review.rating} size={review.featured ? "w-5 h-5" : "w-4 h-4"} />
          {review.headline && (
            <span className="font-orbitron text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {review.headline}
            </span>
          )}
        </div>

        <p
          className={`text-slate-600 dark:text-slate-300 transition-colors duration-300 ${
            review.featured
              ? "text-base sm:text-lg leading-relaxed"
              : "text-sm sm:text-[15px] leading-relaxed"
          }`}
        >
          &ldquo;{review.quote}&rdquo;
        </p>

        <div className="mt-auto flex items-center gap-3 pt-2">
          <Avatar name={review.name} />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-orbitron text-sm font-bold text-slate-900 dark:text-white">
                {review.name}
              </span>
              <BadgeCheck className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" aria-label="Verified reviewer" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {review.date} &middot; {review.source} review
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function RatingBars() {
  const rows = [5, 4, 3, 2, 1] as const;

  return (
    <div className="flex w-full flex-col gap-1.5 sm:w-64">
      {rows.map((stars) => {
        const pct = reviewStats.distribution[stars];
        return (
          <div key={stars} className="flex items-center gap-2">
            <span className="flex w-8 items-center gap-0.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {stars}
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 + (5 - stars) * 0.07 }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
              />
            </div>
            <span className="w-8 text-right text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {pct}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Reviews() {
  const avg = reviewStats.average;

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#f2f5fb] px-4 py-24 transition-colors duration-300 dark:bg-void sm:px-6 sm:py-28 lg:px-8"
    >
      {/* soft ambient glow */}
      <div className="blob-primary pointer-events-none absolute -left-40 top-24 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl rounded-3xl border border-white/50 bg-white/20 p-4 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/15 sm:p-8">
        <SectionHeading
          badge={`Rated ${reviewStats.average} / 5`}
          title="Loved by Our Community"
          subtitle={`Trusted by ${reviewStats.total}+ customers — here's what a few of them have to say about Nexify.`}
        />

        {/* aggregate rating strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="card-shell mb-8 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex items-center gap-4">
              <span className="font-orbitron text-5xl font-black leading-none text-slate-900 dark:text-white drop-shadow-[0_0_20px_rgba(251,191,36,0.25)]">
                {avg.toFixed(1)}
              </span>
              <div className="flex flex-col gap-1.5">
                <Stars rating={Math.round(avg)} size="w-5 h-5" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {reviewStats.total}+ {reviewStats.audience} &middot; 5-star scale
                </span>
              </div>
            </div>
            <RatingBars />
          </div>
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary inline-flex items-center gap-2 rounded-lg px-5 py-3 font-orbitron text-xs font-semibold tracking-wider"
          >
            <MessageCircle className="h-4 w-4" />
            Share your review
          </a>
        </motion.div>

        {/* review cards — featured review spans the full width */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${review.date}-${i}`} review={review} index={i} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          A few highlights from {reviewStats.total}+ {reviewStats.audience} &mdash; read them all in our{" "}
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 underline decoration-blue-500/40 underline-offset-2 transition-colors hover:text-blue-500 dark:text-blue-400"
          >
            Discord community
          </a>
          .
        </p>
      </div>
    </section>
  );
}

import Hero from "../components/Hero";
import Features from "../components/Features";
import PanelShowcase from "../components/PanelShowcase";
import Pricing from "../components/Pricing";
import Locations from "../components/Locations";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import FreeCallout from "../components/FreeCallout";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <PanelShowcase />
      <Pricing />
      <Locations />
      <FAQ />
      <CTA />

      {/* free plans — shown once, only here, at the very end */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 bg-[#eaeef7] dark:bg-[#0c0e14] transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <FreeCallout />
        </div>
      </section>
    </>
  );
}

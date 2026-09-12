import Hero from "../components/Hero";
import Features from "../components/Features";
import PanelShowcase from "../components/PanelShowcase";
import Pricing from "../components/Pricing";
import Locations from "../components/Locations";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

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
    </>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./hooks/useTheme";
import { CurrencyProvider } from "./hooks/useCurrency";
import { useRoute } from "./router";
import { banner, site } from "./data/config";

import HomePage from "./pages/HomePage";
import MinecraftPage from "./pages/MinecraftPage";
import BotHostingPage from "./pages/BotHostingPage";
import GameServersPage from "./pages/GameServersPage";
import DomainsPage from "./pages/DomainsPage";
import VPSPage from "./pages/VPSPage";
import StatusPage from "./pages/StatusPage";
import ExtensionsPage from "./pages/ExtensionsPage";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";

function RouterView() {
  const route = useRoute();
  const [first, second] = route.segments;

  switch (first) {
    case undefined:
      return <HomePage />;
    case "minecraft":
      return <MinecraftPage category={second} key={second ?? "all"} />;
    case "bots":
    case "discord":
      return <BotHostingPage />;
    case "games":
    case "gameservers":
      return <GameServersPage />;
    case "vps":
      return <VPSPage />;
    case "domains":
      return <DomainsPage />;
    case "status":
      return <StatusPage />;
    case "extensions":
    case "blueprints":
      return <ExtensionsPage />;
    case "terms-of-services":
    case "privacy-policy":
      return <LegalPage docKey={first} key={first} />;
    default:
      return <NotFound />;
  }
}

function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen when window fully loads or after 1.5 seconds maximum
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    const timeout = setTimeout(() => setLoading(false), 1500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f2f5fb] dark:bg-void transition-colors duration-300"
        >
          <motion.img
            src={site.logo}
            alt={site.brandName}
            className="w-16 h-16 object-contain mb-6"
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(banner.show);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <LoadingScreen />
        <div className="site-shell relative isolate min-h-screen bg-transparent text-slate-900 dark:text-white font-quicksand antialiased transition-colors duration-300">
          <div className="fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
            <img
              src="/images/snowy.avif"
              alt=""
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-slate-50/45 dark:bg-[#080d18]/55" />
          </div>
          <Banner visible={bannerVisible} onClose={() => setBannerVisible(false)} />
          <Navbar bannerVisible={bannerVisible} />
          <main>
            <RouterView />
          </main>
          <Footer />
        </div>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

import { useState } from "react";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./hooks/useTheme";
import { CurrencyProvider } from "./hooks/useCurrency";
import { useRoute } from "./router";
import { banner } from "./data/config";

import HomePage from "./pages/HomePage";
import MinecraftPage from "./pages/MinecraftPage";
import BotHostingPage from "./pages/BotHostingPage";
import GameServersPage from "./pages/GameServersPage";
import DomainsPage from "./pages/DomainsPage";
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

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(banner.show);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <div className="min-h-screen bg-[#f2f5fb] dark:bg-void text-slate-900 dark:text-white font-quicksand antialiased transition-colors duration-300">
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

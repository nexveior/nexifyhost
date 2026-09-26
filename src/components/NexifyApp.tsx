"use client";

import dynamic from "next/dynamic";

/*
 * The NexifyHost app is a fully client-side experience: it uses a hash
 * router, localStorage-backed theme/currency state, and browser-only
 * rendering. Load it without SSR so `window` is always available.
 */
const App = dynamic(() => import("@/nexify/App"), { ssr: false });

export default function NexifyApp() {
  return <App />;
}

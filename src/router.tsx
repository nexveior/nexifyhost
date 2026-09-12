import { useEffect, useState } from "react";

/**
 * Minimal hash router — perfect for statically hosted single-file builds.
 * Routes look like:  #/  #/games  #/games/minecraft  #/vps ...
 */

export interface Route {
  path: string;
  segments: string[];
}

function parse(): Route {
  const raw = window.location.hash.replace(/^#/, "").split("?")[0] || "/";
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return {
    path,
    segments: path.split("/").filter(Boolean),
  };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => {
      const prev = route.path;
      const next = parse();
      setRoute(next);
      if (next.path !== prev) {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, [route.path]);

  return route;
}

/** Build an href for a route: "/games" -> "#/games" */
export const href = (path: string) => `#${path}`;

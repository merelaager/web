import type { MetaDescriptor } from "react-router";

export const SITE_URL = "https://merelaager.ee";

// Pages that exist but shouldn't be listed.
const EXCLUDED_PATHS = new Set(["/oiguslik/", "/registreerimine/edu/"]);

export interface SitemapEntry {
  path: string;
  title: string;
}

type ServerRoutes = typeof import("virtual:react-router/server-build").routes;

const getFullPath = (routes: ServerRoutes, id: string): string => {
  const segments: string[] = [];
  let route = routes[id];
  while (route) {
    if (route.path) segments.unshift(route.path);
    route = route.parentId ? routes[route.parentId] : undefined;
  }
  return `/${segments.join("/")}/`.replace(/\/+/g, "/");
};

const getTitle = (meta: unknown, fallback: string): string => {
  if (typeof meta !== "function") return fallback;
  try {
    const descriptors = meta({ params: {}, matches: [] }) as MetaDescriptor[];
    const found = descriptors?.find(
      (d): d is { title: string } => "title" in d && typeof d.title === "string"
    );
    return found ? found.title.split(" | ")[0].trim() : fallback;
  } catch {
    return fallback;
  }
};

export const getSitemapEntries = async (): Promise<SitemapEntry[]> => {
  const { routes } = await import("virtual:react-router/server-build");

  const entries = new Map<string, SitemapEntry>();
  for (const [id, route] of Object.entries(routes)) {
    // Skip the root, layouts, resource routes (no UI) and dynamic URLs.
    if (!route || (!route.path && !route.index) || !route.module.default) {
      continue;
    }
    const path = getFullPath(routes, id);
    if (/[:*]/.test(path)) continue;
    if (EXCLUDED_PATHS.has(path) || entries.has(path)) continue;
    entries.set(path, { path, title: getTitle(route.module.meta, path) });
  }
  return [...entries.values()];
};

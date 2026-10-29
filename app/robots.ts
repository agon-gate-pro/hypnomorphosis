import type { MetadataRoute } from "next";
import { urlSite } from "@/lib/site";

// Exploration ouverte à tous les robots, moteurs de recherche et IA compris : tant que le site n'est pas lancé,
// c'est la balise noindex des pages qui empêche le référencement (un robot bloqué ici ne la lirait pas).
// Seul l'espace client, privé, est exclu.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/espace/" },
    sitemap: `${urlSite}/sitemap.xml`,
  };
}

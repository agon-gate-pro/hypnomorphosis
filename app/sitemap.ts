import type { MetadataRoute } from "next";
import { experiencesADecouvrir } from "@/lib/experiences";
import { urlSite } from "@/lib/site";

// pages publiques ; une nouvelle expérience de lib/experiences.ts y entre d'elle-même
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: urlSite, changeFrequency: "monthly", priority: 1 },
    ...experiencesADecouvrir().map((e) => ({ url: `${urlSite}/experiences/${e.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${urlSite}/derriere-hypnomorphosis`, changeFrequency: "yearly", priority: 0.7 },
  ];
}

import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

const routes = ["", "/festival", "/artistes", "/archives", "/infos", "/creation"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route || "/", siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/festival" ? 0.9 : 0.8,
  }));
}


import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work/", ...projects.map((p) => `/work/${p.slug}/`), "/services/", "/about/", "/contact/", "/privacy/"];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}

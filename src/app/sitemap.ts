import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fluxbot-studio-ia-front.vercel.app";
  const routes = ["", "/pricing", "/install", "/contact", "/demo"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}

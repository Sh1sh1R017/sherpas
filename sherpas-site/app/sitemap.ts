import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sherpas.software";

  const routes = [
    "",
    "/youtube-playlist-downloader",
    "/spotify-playlist-downloader",
    "/mp3-playlist-converter",
    "/download-youtube-playlist-online",
    "/free-playlist-downloader",
    "/services",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.includes("playlist") ? 0.9 : 0.7,
  }));
}

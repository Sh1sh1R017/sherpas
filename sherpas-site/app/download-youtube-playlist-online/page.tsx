import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Download YouTube Playlist Online — Fast & Free MP3 Extractor",
  description:
    "Download YouTube playlists online without software installation. Fast MP3 extractor supporting full albums and custom playlists in US & Canada.",
  keywords: [
    "download youtube playlist online",
    "youtube playlist downloader web",
    "online youtube music extractor",
  ],
  alternates: {
    canonical: "https://sherpas.software/download-youtube-playlist-online",
  },
};

export default function DownloadYouTubePlaylistOnlinePage() {
  return (
    <section className="pt-28 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Download YouTube Playlist Online
          </h1>
          <p className="mt-4 text-lg text-muted">
            The fastest web-based YouTube playlist downloader. No software downloads required.
          </p>
          <div className="mt-8">
            <a
              href="http://muzip.sherpas.software/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-all shadow-lg inline-flex items-center gap-2"
            >
              Start Downloading Online
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

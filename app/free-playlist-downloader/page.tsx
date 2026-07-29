import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Free Playlist Downloader — Download Music Playlists to MP3 Free",
  description:
    "100% Free Playlist Downloader. Download entire music playlists from YouTube & Spotify into high quality MP3 format for free.",
  keywords: [
    "free playlist downloader",
    "free youtube playlist downloader",
    "free spotify playlist downloader",
  ],
  alternates: {
    canonical: "https://sherpas.software/free-playlist-downloader",
  },
};

export default function FreePlaylistDownloaderPage() {
  return (
    <section className="pt-28 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            100% Free Playlist Downloader
          </h1>
          <p className="mt-4 text-lg text-muted">
            Unlimited, unthrottled playlist conversions for free. No credit card, registration, or software required.
          </p>
          <div className="mt-8">
            <a
              href="http://muzip.sherpas.software/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-all shadow-lg inline-flex items-center gap-2"
            >
              Use Free Downloader Now
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

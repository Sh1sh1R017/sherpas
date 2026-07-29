import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "MP3 Playlist Converter — Convert Online Music Playlists to MP3 320kbps",
  description:
    "Fast online MP3 playlist converter. Convert full playlists from YouTube and music streaming services into 320kbps high-quality MP3 audio files for free.",
  keywords: [
    "mp3 playlist converter",
    "convert playlist to mp3",
    "playlist to mp3 320kbps",
    "batch mp3 converter online",
    "high quality playlist converter",
  ],
  alternates: {
    canonical: "https://sherpas.software/mp3-playlist-converter",
  },
};

export default function MP3PlaylistConverterPage() {
  return (
    <section className="pt-28 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            MP3 Playlist Converter Online
          </h1>
          <p className="mt-4 text-lg text-muted">
            Batch convert complete playlists into high-fidelity 320kbps MP3 audio files with embedded ID3 metadata tags.
          </p>
          <div className="mt-8">
            <a
              href="http://muzip.sherpas.software/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-all shadow-lg inline-flex items-center gap-2"
            >
              Launch MP3 Converter
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

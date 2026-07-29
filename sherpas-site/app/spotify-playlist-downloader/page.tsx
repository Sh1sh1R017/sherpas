import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Free Spotify Playlist Downloader — Convert Spotify Playlist to MP3 Online",
  description:
    "Fast Spotify Playlist Downloader to convert Spotify tracks, albums, and user playlists to high quality 320kbps MP3s online. Free usage in US & Canada with no premium account required.",
  keywords: [
    "spotify playlist downloader",
    "download spotify playlist to mp3",
    "spotify music downloader",
    "convert spotify playlist to mp3 online",
    "spotify playlist extractor",
    "free spotify downloader US Canada",
    "spotify mp3 320kbps converter",
  ],
  alternates: {
    canonical: "https://sherpas.software/spotify-playlist-downloader",
    languages: {
      "en-US": "https://sherpas.software/spotify-playlist-downloader",
      "en-CA": "https://sherpas.software/spotify-playlist-downloader",
    },
  },
  openGraph: {
    title: "Free Spotify Playlist Downloader — Convert Spotify Playlists to MP3 320kbps",
    description: "Save Spotify playlists, albums & tracks offline in high quality MP3 format. Free online tool for United States & Canada.",
    url: "https://sherpas.software/spotify-playlist-downloader",
    type: "website",
    locale: "en_US",
  },
};

const FAQS = [
  {
    q: "Do I need a Spotify Premium account to download playlists?",
    a: "No! Muzip extracts tracks directly using playlist share URLs, allowing both Free and Premium Spotify users to save audio offline.",
  },
  {
    q: "How does the Spotify to MP3 converter work?",
    a: "Our algorithm reads the metadata (track titles, artists, albums, ISRC codes) from your Spotify playlist link and matches them against high-fidelity audio databases to deliver lossless 320kbps MP3 files.",
  },
  {
    q: "Are song cover art and ID3 metadata tags preserved?",
    a: "Yes! Every downloaded file includes embedded album artwork, artist names, track numbers, release years, and genre ID3 tags.",
  },
];

export default function SpotifyPlaylistDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Muzip — Spotify Playlist Downloader",
        "url": "http://muzip.sherpas.software/",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser, iOS, Android, macOS, Windows",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-spotify-downloader"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30 border-b border-border/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-6 border border-emerald-500/20">
              ⚡ Spotify to MP3 320kbps Converter
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              Free Spotify Playlist Downloader
              <br />
              <span className="text-emerald-500 font-normal">&amp; Audio Extractor</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Convert Spotify playlists, albums, and top tracks into high-fidelity <strong>MP3 320kbps audio files</strong>. Fast, free online tool for listeners across the US &amp; Canada.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="http://muzip.sherpas.software/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2"
              >
                Launch Spotify Downloader
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Section id="content">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Convert Spotify Playlists to MP3 Online Without Premium
              </h2>
              <p className="text-muted leading-relaxed">
                Spotify is the world&apos;s leading music streaming service, but downloading playlists for offline playback on non-Spotify devices (MP3 players, car stereos, or DJ controllers) requires a paid Premium subscription and locks files inside encrypted DRM containers. <strong>Muzip</strong> bridges this gap by allowing users in North America and worldwide to download their favourite Spotify playlists directly to universal MP3 files.
              </p>
            </div>

            {/* How to use */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-bold mb-4">How to Download Spotify Playlists:</h3>
              <ol className="list-decimal list-inside space-y-3 text-sm text-muted">
                <li>Open Spotify and copy the link to your public playlist or album.</li>
                <li>Visit <a href="http://muzip.sherpas.software/" className="text-emerald-500 underline font-semibold">muzip.sherpas.software</a> and paste the link.</li>
                <li>Click &lsquo;Extract Tracks&rsquo; to download high quality MP3s with album cover art tags included.</li>
              </ol>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-xl border border-border bg-card">
                    <h4 className="font-semibold text-lg">{faq.q}</h4>
                    <p className="mt-2 text-sm text-muted">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

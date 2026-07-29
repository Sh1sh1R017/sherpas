import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Free YouTube Playlist Downloader — Convert YouTube Playlist to MP3 (US & Canada)",
  description:
    "Download full YouTube playlists to MP3 320kbps online instantly. Free, fast YouTube Music playlist downloader for US & Canada with zero software installation or signup required.",
  keywords: [
    "youtube playlist downloader",
    "download youtube playlist to mp3",
    "youtube music playlist downloader",
    "convert youtube playlist to mp3 320kbps",
    "bulk youtube playlist downloader",
    "free youtube downloader online US Canada",
    "online youtube playlist to mp3 converter",
  ],
  alternates: {
    canonical: "https://sherpas.software/youtube-playlist-downloader",
    languages: {
      "en-US": "https://sherpas.software/youtube-playlist-downloader",
      "en-CA": "https://sherpas.software/youtube-playlist-downloader",
    },
  },
  openGraph: {
    title: "Free YouTube Playlist Downloader — Convert Full Playlists to MP3 320kbps",
    description: "Fast, unthrottled YouTube Music & Video playlist downloader. Convert complete playlists to MP3 online in high resolution audio.",
    url: "https://sherpas.software/youtube-playlist-downloader",
    type: "website",
    locale: "en_US",
  },
};

const FAQS = [
  {
    q: "How do I download an entire YouTube music playlist at once?",
    a: "Simply copy the YouTube playlist URL from your browser or app, paste it into the Muzip downloader input box, select your desired MP3 quality (up to 320kbps), and click 'Convert & Download'. Our cloud servers extract all tracks in bulk automatically.",
  },
  {
    q: "Is there a limit on how many songs can be in a YouTube playlist?",
    a: "No! Muzip handles playlists containing anywhere from 5 to 500+ songs seamlessly without server timeouts or speed throttling.",
  },
  {
    q: "Do I need to install any software or browser extensions?",
    a: "Not at all. Muzip runs 100% in your web browser on desktop, iOS, Android, and tablets without installing any software or registering for an account.",
  },
  {
    q: "What audio quality levels are supported?",
    a: "We support high-fidelity MP3 conversions up to 320kbps, 256kbps, 192kbps, and 128kbps, preserving original artist metadata and cover art tags whenever available.",
  },
  {
    q: "Is this service free for users in the United States and Canada?",
    a: "Yes! Muzip is completely free with no hidden subscriptions, token limits, or payment walls for users across the US, Canada, UK, and worldwide.",
  },
];

export default function YouTubePlaylistDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Muzip — YouTube Playlist Downloader",
        "url": "http://muzip.sherpas.software/",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All (Web Browser, Windows, macOS, iOS, Android)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "14200",
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
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sherpas.software",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "YouTube Playlist Downloader",
            "item": "https://sherpas.software/youtube-playlist-downloader",
          },
        ],
      },
      {
        "@type": "HowTo",
        "name": "How to Download a YouTube Playlist to MP3",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Copy Playlist Link",
            "text": "Open YouTube or YouTube Music and copy the URL of the target playlist.",
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Paste in Muzip",
            "text": "Paste the URL into the search bar at muzip.sherpas.software.",
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Download MP3s",
            "text": "Choose 320kbps MP3 format and click download to save the full playlist.",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-youtube-downloader"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-muted/30 border-b border-border/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold uppercase tracking-wider mb-6 border border-red-500/20">
              ⚡ High-Speed Converter — US &amp; Canada Optimized
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              Free YouTube Playlist Downloader
              <br />
              <span className="text-red-500 font-normal">&amp; Bulk MP3 Converter</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Convert full YouTube playlists, music albums, and video channels into high-quality <strong>320kbps MP3 audio files</strong>. Fast, unthrottled, 100% free with no registration required.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="http://muzip.sherpas.software/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-all shadow-lg hover:shadow-red-500/25 flex items-center gap-2"
              >
                Launch YouTube Downloader Tool
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* In-Depth Guide & Content */}
      <Section id="guide">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12 text-foreground">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                The Ultimate YouTube Music Playlist Downloader for 2026
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Downloading music playlists from YouTube can often be frustrating when faced with strict speed caps, intrusive pop-up ads, or low-quality 128kbps audio conversions. <strong>Muzip</strong> solves these problems by providing a direct, high-performance web tool designed specifically for music enthusiasts, DJs, content creators, and offline listeners across the <strong>United States, Canada, the UK, and Australia</strong>.
              </p>
              <p className="text-muted leading-relaxed">
                Whether you want to back up a 100-song workout playlist, convert an entire discography into pristine 320kbps MP3s, or extract audio tracks for offline listening during travel, our cloud conversion engine extracts metadata, album art, and audio streams in seconds.
              </p>
            </div>

            {/* Step-by-Step Guide */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white text-sm">1</span>
                How to Convert &amp; Download YouTube Playlists to MP3 in 3 Easy Steps
              </h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Copy the YouTube Playlist Link</h4>
                    <p className="text-sm text-muted mt-1">
                      Navigate to YouTube or YouTube Music in your app or web browser. Find your target playlist, click the share icon, and copy the full URL link (e.g., <code>https://youtube.com/playlist?list=...</code>).
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Paste into Muzip Web Tool</h4>
                    <p className="text-sm text-muted mt-1">
                      Open <a href="http://muzip.sherpas.software/" className="text-red-500 underline font-medium">muzip.sherpas.software</a> and paste the link into the search field. Select your desired MP3 audio quality (320kbps recommended).
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Download Batch Audio Files</h4>
                    <p className="text-sm text-muted mt-1">
                      Hit &lsquo;Convert Playlist&rsquo;. Our high-speed cloud cluster will process every track in parallel and provide instant single-click MP3 download links or a packaged ZIP archive.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Feature Comparison Table */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-6">
                Why Muzip Beats Traditional YouTube Converters
              </h3>
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-foreground uppercase tracking-wider text-xs">
                    <tr>
                      <th className="p-4">Feature</th>
                      <th className="p-4 text-red-500 font-bold">Muzip Downloader</th>
                      <th className="p-4 text-muted">Standard Online Converters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-muted">
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Bulk Playlist Support</td>
                      <td className="p-4 text-emerald-500 font-semibold">✓ Full Playlists (500+ Songs)</td>
                      <td className="p-4">✕ Single Videos Only</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Max Bitrate Quality</td>
                      <td className="p-4 text-emerald-500 font-semibold">320 kbps High Fidelity</td>
                      <td className="p-4">128 kbps Compressed</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Download Speed</td>
                      <td className="p-4 text-emerald-500 font-semibold">Unthrottled Cloud Edge</td>
                      <td className="p-4">Slow / Throttled</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Metadata &amp; Cover Art</td>
                      <td className="p-4 text-emerald-500 font-semibold">✓ Auto-Extracted ID3 Tags</td>
                      <td className="p-4">✕ Missing ID3 Tags</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Pop-up Ad Spam</td>
                      <td className="p-4 text-emerald-500 font-semibold">✓ Clean &amp; Safe Interface</td>
                      <td className="p-4">✕ Heavy Pop-up Spam</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {FAQS.map((faq, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <h4 className="font-semibold text-lg text-foreground">{faq.q}</h4>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal & E-A-T Disclaimer */}
            <div className="p-6 rounded-xl bg-muted/40 border border-border text-xs text-muted leading-relaxed">
              <h4 className="font-bold text-foreground mb-1 uppercase tracking-wider">Compliance &amp; Fair Use Disclaimer</h4>
              <p>
                Muzip is intended for personal offline archiving of royalty-free, public domain, or user-owned audio content. Please ensure you comply with YouTube&rsquo;s Terms of Service and applicable copyright laws in your region (such as the Digital Millennium Copyright Act in the United States and the Copyright Act of Canada) before downloading content.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

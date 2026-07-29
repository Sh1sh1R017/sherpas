import { Container } from "./Container";
import { Button } from "./Button";

/**
 * Homepage hero section with Muzip YouTube Music Playlist Downloader feature front and center.
 */
export function Hero() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
      <Container>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold uppercase tracking-wider mb-6 border border-red-500/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Featured Tool — muzip.sherpas.software
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
            YouTube Music Playlist Downloader
            <br />
            <span className="text-red-500 font-normal">&amp; MP3 Converter.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            Fast, free online <strong>YouTube Music Playlist Downloader</strong> built for United States &amp; Canada. Convert and download complete YouTube playlists, tracks, and albums to high quality <strong>MP3 (320kbps)</strong> instantly on custom subdomain.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="http://muzip.sherpas.software/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-base transition-colors shadow-lg"
            >
              Launch Muzip (muzip.sherpas.software)
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <Button href="#projects" variant="outline" size="lg">
              Explore All Demos
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

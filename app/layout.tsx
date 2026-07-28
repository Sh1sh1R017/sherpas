import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AdBanner } from "@/components/AdBanner";
import { AdNetworkScripts } from "@/components/AdNetworkScripts";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sherpas Technology — Strategic Business Advisory",
    template: "%s | Sherpas Technology",
  },
  description:
    "Sherpas Technology helps organizations navigate complex business challenges with expert strategy, operations consulting, and digital transformation services.",
  keywords: [
    "business consulting",
    "strategy",
    "operations",
    "digital transformation",
    "management consulting",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sherpas Technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V84CGFEGR8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-V84CGFEGR8');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <AdNetworkScripts />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          
          {/* Top 468x60 Ad Banner */}
          <div className="w-full flex justify-center py-2 bg-muted/30">
            <AdBanner adKey="0edf0cc4cad96876a24115f4491072d4" width={468} height={60} />
          </div>

          <main className="flex-1" id="main-content">
            {children}
          </main>

          {/* Ad Network Container */}
          <div id="container-6431f3c3a8811f121536dba3afd65859" className="w-full flex justify-center my-4"></div>

          {/* Bottom 160x300 Ad Banner */}
          <div className="w-full flex justify-center py-4 bg-muted/20 border-t border-border/50">
            <AdBanner adKey="4053486d892f0a47bbb4166f78c15c7d" width={160} height={300} />
          </div>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

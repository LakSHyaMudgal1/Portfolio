import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Lakshya Mudgal — Full-Stack Software Engineer",
  description:
    "Portfolio of Lakshya Mudgal, a B.Tech IT student at IIIT Una (Class of '27) and full-stack software engineer specializing in React, Node.js, TypeScript, and high-throughput real-time systems.",
  keywords: [
    "Lakshya Mudgal",
    "Software Engineer",
    "Full-Stack Developer",
    "IIIT Una",
    "React Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Socket.io",
    "Distributed Systems",
    "Real-time Systems",
  ],
  authors: [{ name: "Lakshya Mudgal", url: "https://github.com/LakSHyaMudgal1" }],
  creator: "Lakshya Mudgal",
  metadataBase: new URL("https://lakshyamudgal.dev"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  openGraph: {
    title: "Lakshya Mudgal — Full-Stack Software Engineer",
    description:
      "B.Tech IT at IIIT Una (Class of '27). Full-stack software developer building resilient web & mobile products, distributed systems, and real-time architectures.",
    url: "https://lakshyamudgal.dev",
    siteName: "Lakshya Mudgal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakshya Mudgal — Full-Stack Software Engineer",
    description:
      "B.Tech IT at IIIT Una (Class of '27). Full-stack software developer building resilient web & mobile products, distributed systems, and real-time architectures.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lakshya Mudgal",
    jobTitle: "Software Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Information Technology Una",
    },
    url: "https://lakshyamudgal.dev",
    sameAs: [
      "https://github.com/lakshyamudgal",
      "https://linkedin.com/in/lakshyamudgal",
      "https://leetcode.com/u/lakshyamudgal",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#08090d] text-[#f8fafc] font-sans antialiased selection:bg-sky-500/20 selection:text-white">
        <div className="fixed inset-0 pointer-events-none noise-overlay z-50 opacity-40" />
        {children}
      </body>
    </html>
  );
}

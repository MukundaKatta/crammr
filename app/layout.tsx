import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crammr — Crack the entrance exam.",
  description:
    "AI-tutored prep for JEE, NEET, MCAT, CAT, and the bar. One subject at a time, one question at a time.",
  openGraph: {
    title: "Crammr — Crack the entrance exam.",
    description:
      "AI-tutored prep for JEE, NEET, MCAT, CAT, and the bar. One subject at a time, one question at a time.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Crammr&accent=red&category=Education",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Crammr&accent=red&category=Education",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

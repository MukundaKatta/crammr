import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crammr — Crack the entrance exam.",
  description:
    "AI-tutored prep for JEE, NEET, MCAT, CAT, and the bar. One subject at a time, one question at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
            Crammr
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/quiz"
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Start Quiz
            </Link>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
            <p className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              Crammr
            </p>
            <p>&copy; 2026</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

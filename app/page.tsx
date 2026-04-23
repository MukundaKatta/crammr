"use client";

import { useState } from "react";
import Link from "next/link";

const DEMO_OPTIONS = [
  { key: "A", text: "10 m/s", correct: false },
  { key: "B", text: "20 m/s", correct: true },
  { key: "C", text: "40 m/s", correct: false },
  { key: "D", text: "200 m/s", correct: false },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
          Crammr
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:border-neutral-900 hidden sm:inline-block"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-red-100 via-red-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
            Education
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Crack the entrance exam.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            AI-tutored prep for JEE, NEET, MCAT, CAT, and the bar. One subject at a time, one
            question at a time.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-red-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleWaitlist}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Join <span className="font-semibold text-neutral-700">1,284</span> people already on
            the waitlist
          </p>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                <span className="text-red-600">NEET · Physics · Kinematics</span>
                <span className="text-neutral-400">Q 14 of 30</span>
              </div>
              <p className="mt-5 text-lg leading-relaxed">
                A ball is dropped from a height of 20m. What is its velocity just before hitting
                the ground?{" "}
                <span className="text-neutral-500">(Take g = 10 m/s²)</span>
              </p>
              <div className="mt-6 grid gap-2">
                {DEMO_OPTIONS.map((opt) => {
                  const picked = selectedOption !== null;
                  let cls =
                    "rounded-xl border border-neutral-300 bg-white px-4 py-3 text-left text-sm transition";
                  if (!picked) cls += " hover:border-red-500 hover:bg-red-50";
                  if (picked && selectedOption === opt.key && opt.correct)
                    cls =
                      "rounded-xl border border-green-500 bg-green-50 px-4 py-3 text-left text-sm text-green-900";
                  if (picked && selectedOption === opt.key && !opt.correct)
                    cls =
                      "rounded-xl border border-red-500 bg-red-50 px-4 py-3 text-left text-sm text-red-900";
                  return (
                    <button
                      key={opt.key}
                      disabled={picked}
                      className={cls}
                      onClick={() => setSelectedOption(opt.key)}
                    >
                      <span className="mr-2 font-semibold">{opt.key}.</span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
              {selectedOption !== null && (
                <div
                  className={`mt-5 rounded-xl p-4 text-sm ${
                    DEMO_OPTIONS.find((o) => o.key === selectedOption)?.correct
                      ? "bg-green-50 text-green-900"
                      : "bg-red-50 text-red-900"
                  }`}
                >
                  {DEMO_OPTIONS.find((o) => o.key === selectedOption)?.correct
                    ? "Correct. Using v² = u² + 2gh → v = √(2·10·20) = 20 m/s. You got this one right on your first try — nice."
                    : "Not quite. Remember v² = u² + 2gh. Starting from rest, u=0. So v = √(2·10·20) = 20 m/s. I'll queue up three more on free-fall."}
                </div>
              )}
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/try"
              className="inline-block rounded-full bg-red-600 px-7 py-3.5 font-medium text-white transition hover:bg-red-700"
            >
              Try a full session →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">🎯</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Exam-specific</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Every question is drawn from real past papers and verified syllabi.
              </p>
            </div>
            <div>
              <div className="text-3xl">🧠</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Adaptive practice</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                The AI finds your weak spots and drills them until they are no longer weak.
              </p>
            </div>
            <div>
              <div className="text-3xl">📱</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Pocket-sized</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Works offline. Perfect for metro commutes and weekend library sprints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            {[
              {
                n: 1,
                title: "Pick your exam",
                body: "One exam. All its quirks, its past papers, its real difficulty curve.",
              },
              {
                n: 2,
                title: "Practice daily",
                body: "20 minutes a day beats a 10-hour weekend cram. We remind you.",
              },
              {
                n: 3,
                title: "Walk in ready",
                body: "Full-length mocks a month out. You see your score trend. You know you'll pass.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                  {n}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-red-600 px-7 py-3.5 font-medium text-white transition hover:bg-red-700"
        >
          Reserve my spot
        </a>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            Crammr
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}

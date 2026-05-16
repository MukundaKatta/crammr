import Link from "next/link";
import { StreakBadge } from "./streak-badge";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-red-100 via-red-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
            NEET Physics — Kinematics
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Crack the entrance exam.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            50 real NEET past-paper questions on Kinematics. Practice daily,
            track your streak, and walk in ready.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/quiz"
              className="rounded-full bg-red-600 px-8 py-4 text-base font-medium text-white transition hover:bg-red-700"
            >
              Start a 10-Question Quiz
            </Link>
          </div>
          <StreakBadge />
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What you get
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">🎯</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Real past papers
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Every question is sourced from actual NEET exams (2018–2025). No
                AI-generated fluff.
              </p>
            </div>
            <div>
              <div className="text-3xl">🔥</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Daily streak
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Build consistency. Your streak persists across sessions so you
                never lose momentum.
              </p>
            </div>
            <div>
              <div className="text-3xl">📱</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Mobile-first
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Designed for phones. Practice on the bus, in the library, or
                between classes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
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
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Hit &ldquo;Start Quiz&rdquo;
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                10 random Kinematics questions. Timed. Instant feedback after
                each answer.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Review your results
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                See your score, time taken, and which topics tripped you up.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Come back tomorrow
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Keep your streak alive. Daily practice beats weekend cramming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Ready to practice?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          50 hand-picked Kinematics questions from real NEET papers. Free.
          No sign-up.
        </p>
        <Link
          href="/quiz"
          className="mt-8 inline-block rounded-full bg-red-600 px-7 py-3.5 font-medium text-white transition hover:bg-red-700"
        >
          Start Quiz
        </Link>
      </section>
    </>
  );
}

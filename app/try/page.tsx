"use client";

import { useState } from "react";
import Link from "next/link";

type Exam = "JEE" | "NEET" | "MCAT" | "CAT" | "Bar";

interface Option {
  key: string;
  text: string;
  correct: boolean;
}

interface Question {
  id: number;
  subject: string;
  topic: string;
  text: string;
  options: Option[];
  rationale: string;
}

const QUESTIONS: Record<Exam, Question[]> = {
  JEE: [
    {
      id: 1,
      subject: "Physics",
      topic: "Mechanics",
      text: "A particle moves in a straight line with uniform acceleration. If it covers distances s₁ and s₂ in the first and second seconds respectively, the acceleration is:",
      options: [
        { key: "A", text: "s₂ − s₁", correct: true },
        { key: "B", text: "s₁ − s₂", correct: false },
        { key: "C", text: "(s₁ + s₂) / 2", correct: false },
        { key: "D", text: "2(s₂ − s₁)", correct: false },
      ],
      rationale:
        "Using sₙ = u + a(2n−1)/2, s₁ = u + a/2 and s₂ = u + 3a/2. Subtracting: s₂ − s₁ = a. So acceleration = s₂ − s₁.",
    },
    {
      id: 2,
      subject: "Chemistry",
      topic: "Atomic Structure",
      text: "The de Broglie wavelength of an electron accelerated through a potential of 100 V is closest to:",
      options: [
        { key: "A", text: "1.23 Å", correct: true },
        { key: "B", text: "0.12 Å", correct: false },
        { key: "C", text: "12.3 Å", correct: false },
        { key: "D", text: "0.012 Å", correct: false },
      ],
      rationale:
        "λ = 12.27/√V Å. For V = 100 V, λ = 12.27/10 = 1.227 Å ≈ 1.23 Å. This is the standard JEE formula you must memorise.",
    },
    {
      id: 3,
      subject: "Mathematics",
      topic: "Calculus",
      text: "If f(x) = x³ − 3x² + 3x − 1, then f has:",
      options: [
        { key: "A", text: "A point of inflection at x = 1 only", correct: true },
        { key: "B", text: "A local minimum at x = 1", correct: false },
        { key: "C", text: "A local maximum at x = 1", correct: false },
        { key: "D", text: "No critical points", correct: false },
      ],
      rationale:
        "f(x) = (x−1)³. f′(x) = 3(x−1)², which is 0 at x=1 but doesn't change sign — so x=1 is neither a max nor min. f″(x) = 6(x−1), which changes sign at x=1, confirming it's an inflection point.",
    },
  ],
  NEET: [
    {
      id: 1,
      subject: "Biology",
      topic: "Cell Biology",
      text: "Which organelle is known as the 'powerhouse of the cell'?",
      options: [
        { key: "A", text: "Mitochondria", correct: true },
        { key: "B", text: "Ribosome", correct: false },
        { key: "C", text: "Golgi apparatus", correct: false },
        { key: "D", text: "Endoplasmic reticulum", correct: false },
      ],
      rationale:
        "Mitochondria produce ATP via oxidative phosphorylation. They contain their own DNA and double membrane. This is a foundational NEET fact — likely to appear in multiple-choice form.",
    },
    {
      id: 2,
      subject: "Physics",
      topic: "Kinematics",
      text: "A ball is dropped from a height of 20 m. Its velocity just before hitting the ground is: (g = 10 m/s²)",
      options: [
        { key: "A", text: "10 m/s", correct: false },
        { key: "B", text: "20 m/s", correct: true },
        { key: "C", text: "40 m/s", correct: false },
        { key: "D", text: "200 m/s", correct: false },
      ],
      rationale:
        "v² = u² + 2gh = 0 + 2(10)(20) = 400. v = 20 m/s. Classic kinematics — always draw from rest when 'dropped'.",
    },
    {
      id: 3,
      subject: "Chemistry",
      topic: "Periodic Table",
      text: "Which element has the highest electronegativity?",
      options: [
        { key: "A", text: "Oxygen", correct: false },
        { key: "B", text: "Chlorine", correct: false },
        { key: "C", text: "Fluorine", correct: true },
        { key: "D", text: "Nitrogen", correct: false },
      ],
      rationale:
        "Fluorine (F) has the highest electronegativity on the Pauling scale (3.98). It's the most electronegative element because of its small size and high nuclear charge. Memorise: F > O > N > Cl.",
    },
  ],
  MCAT: [
    {
      id: 1,
      subject: "Biology",
      topic: "Genetics",
      text: "A woman who is a carrier for an X-linked recessive disorder has children with an unaffected man. What is the probability that their son is affected?",
      options: [
        { key: "A", text: "0%", correct: false },
        { key: "B", text: "25%", correct: false },
        { key: "C", text: "50%", correct: true },
        { key: "D", text: "100%", correct: false },
      ],
      rationale:
        "The carrier mother is X^A X^a. Sons get the Y from dad and one X from mum. Half of mum's X chromosomes carry the recessive allele, so 50% of sons will be affected.",
    },
    {
      id: 2,
      subject: "Chemistry",
      topic: "Acid-Base",
      text: "A buffer solution contains equal concentrations of acetic acid (pKa = 4.76) and sodium acetate. What is the pH?",
      options: [
        { key: "A", text: "4.76", correct: true },
        { key: "B", text: "7.00", correct: false },
        { key: "C", text: "9.52", correct: false },
        { key: "D", text: "2.38", correct: false },
      ],
      rationale:
        "Henderson–Hasselbalch: pH = pKa + log([A⁻]/[HA]). When [A⁻] = [HA], log(1) = 0, so pH = pKa = 4.76.",
    },
    {
      id: 3,
      subject: "Psychology",
      topic: "Memory",
      text: "Which memory system is responsible for storing facts and general knowledge about the world?",
      options: [
        { key: "A", text: "Episodic memory", correct: false },
        { key: "B", text: "Semantic memory", correct: true },
        { key: "C", text: "Procedural memory", correct: false },
        { key: "D", text: "Working memory", correct: false },
      ],
      rationale:
        "Semantic memory stores facts and concepts (e.g., 'Paris is the capital of France'). Episodic memory is for personal experiences. Procedural memory is for skills. A common MCAT distinction.",
    },
  ],
  CAT: [
    {
      id: 1,
      subject: "Quantitative Aptitude",
      topic: "Percentages",
      text: "A number is increased by 20% and then decreased by 20%. The net change is:",
      options: [
        { key: "A", text: "No change", correct: false },
        { key: "B", text: "4% decrease", correct: true },
        { key: "C", text: "4% increase", correct: false },
        { key: "D", text: "2% decrease", correct: false },
      ],
      rationale:
        "Net multiplier = 1.20 × 0.80 = 0.96, i.e. a 4% decrease. Classic CAT trap — successive percentage changes never cancel out.",
    },
    {
      id: 2,
      subject: "Verbal Ability",
      topic: "Critical Reasoning",
      text: "Which of the following best describes the logical flaw in arguing that 'since crime rates fell after more police were hired, the police caused the reduction'?",
      options: [
        { key: "A", text: "Straw man", correct: false },
        { key: "B", text: "Post hoc ergo propter hoc", correct: true },
        { key: "C", text: "Ad hominem", correct: false },
        { key: "D", text: "False dichotomy", correct: false },
      ],
      rationale:
        "Post hoc ergo propter hoc — 'after this, therefore because of this.' Correlation in time is not causation. A standard VARC logical-reasoning trap.",
    },
    {
      id: 3,
      subject: "Data Interpretation",
      topic: "Ratios",
      text: "If A : B = 3 : 4 and B : C = 5 : 6, what is A : C?",
      options: [
        { key: "A", text: "5 : 8", correct: true },
        { key: "B", text: "3 : 6", correct: false },
        { key: "C", text: "15 : 24", correct: false },
        { key: "D", text: "1 : 2", correct: false },
      ],
      rationale:
        "A/B = 3/4, B/C = 5/6. A/C = (A/B)×(B/C) = (3/4)×(5/6) = 15/24 = 5/8. Note: 15:24 is the unsimplified form and a common distractor.",
    },
  ],
  Bar: [
    {
      id: 1,
      subject: "Contracts",
      topic: "Offer & Acceptance",
      text: "Under the common law mirror-image rule, a reply to an offer that adds a new term is:",
      options: [
        { key: "A", text: "A valid acceptance", correct: false },
        { key: "B", text: "A counteroffer that terminates the original offer", correct: true },
        { key: "C", text: "An acceptance with a conditional modification", correct: false },
        { key: "D", text: "Void for vagueness", correct: false },
      ],
      rationale:
        "Under common law, acceptance must mirror the offer exactly. Any addition or change constitutes a counteroffer, which rejects and replaces the original offer. Contrast with UCC § 2-207 for goods.",
    },
    {
      id: 2,
      subject: "Torts",
      topic: "Negligence",
      text: "For a negligence claim, a plaintiff must prove duty, breach, causation, and damages. Under the 'but-for' test, causation is established when:",
      options: [
        { key: "A", text: "The defendant's act was morally blameworthy", correct: false },
        { key: "B", text: "The harm would not have occurred but for the defendant's breach", correct: true },
        { key: "C", text: "Multiple defendants could each have caused the harm", correct: false },
        { key: "D", text: "The harm was foreseeable to a reasonable person", correct: false },
      ],
      rationale:
        "But-for causation: 'Would the harm have occurred but for the defendant's act?' If yes (harm would have happened anyway), no causation. Foreseeability is proximate cause, not but-for.",
    },
    {
      id: 3,
      subject: "Constitutional Law",
      topic: "Equal Protection",
      text: "A state law that classifies individuals by race is subject to which level of scrutiny under the Equal Protection Clause?",
      options: [
        { key: "A", text: "Rational basis review", correct: false },
        { key: "B", text: "Intermediate scrutiny", correct: false },
        { key: "C", text: "Strict scrutiny", correct: true },
        { key: "D", text: "Heightened scrutiny", correct: false },
      ],
      rationale:
        "Race is a suspect classification → strict scrutiny: the law must be narrowly tailored to serve a compelling government interest. This is one of the most-tested bar distinctions: race/national origin = strict; sex/gender = intermediate; everything else = rational basis.",
    },
  ],
};

const EXAMS: Exam[] = ["JEE", "NEET", "MCAT", "CAT", "Bar"];

export default function TryPage() {
  const [exam, setExam] = useState<Exam>("JEE");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = QUESTIONS[exam];
  const q = questions[questionIndex];

  function handleExamChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setExam(e.target.value as Exam);
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  function handleSelect(key: string) {
    if (selected) return;
    setSelected(key);
    const opt = q.options.find((o) => o.key === key);
    if (opt?.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (questionIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
          Crammr
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-600">
              Adaptive session
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Pick your exam, start drilling.</h1>
          </div>
          <select
            value={exam}
            onChange={handleExamChange}
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
          >
            {EXAMS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {finished ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm text-center">
            <p className="text-5xl font-bold text-neutral-900">
              {score}/{questions.length}
            </p>
            <p className="mt-3 text-neutral-600">
              {score === questions.length
                ? "Perfect score. The real exam should worry."
                : score >= 2
                ? "Strong. A few gaps to drill — keep going."
                : "Good start. Repetition is where it sticks."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleRestart}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Try again
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 transition hover:border-neutral-900"
              >
                Get early access
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              <span className="text-red-600">
                {exam} · {q.subject} · {q.topic}
              </span>
              <span className="text-neutral-400">
                Q {questionIndex + 1} of {questions.length}
              </span>
            </div>

            <p className="mt-5 text-lg leading-relaxed text-neutral-900">{q.text}</p>

            <div className="mt-6 grid gap-2">
              {q.options.map((opt) => {
                const picked = selected !== null;
                let cls =
                  "rounded-xl border border-neutral-300 bg-white px-4 py-3 text-left text-sm transition w-full";
                if (!picked) cls += " hover:border-red-500 hover:bg-red-50 cursor-pointer";
                if (picked && opt.correct)
                  cls =
                    "rounded-xl border border-green-500 bg-green-50 px-4 py-3 text-left text-sm text-green-900 w-full";
                if (picked && selected === opt.key && !opt.correct)
                  cls =
                    "rounded-xl border border-red-500 bg-red-50 px-4 py-3 text-left text-sm text-red-900 w-full";
                return (
                  <button
                    key={opt.key}
                    disabled={picked}
                    className={cls}
                    onClick={() => handleSelect(opt.key)}
                  >
                    <span className="mr-2 font-semibold">{opt.key}.</span>
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {selected && (
              <>
                <div
                  className={`mt-5 rounded-xl p-4 text-sm leading-relaxed ${
                    q.options.find((o) => o.key === selected)?.correct
                      ? "bg-green-50 text-green-900"
                      : "bg-red-50 text-red-900"
                  }`}
                >
                  <span className="font-semibold mr-1">
                    {q.options.find((o) => o.key === selected)?.correct ? "Correct." : "Not quite."}
                  </span>
                  {q.rationale}
                </div>
                <button
                  onClick={handleNext}
                  className="mt-4 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                >
                  {questionIndex + 1 >= questions.length ? "See results" : "Next question →"}
                </button>
              </>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with 3 questions per exam.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the full adaptive experience.
        </p>
      </div>
    </div>
  );
}

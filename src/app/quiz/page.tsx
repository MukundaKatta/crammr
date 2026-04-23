"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import questionsData from "../../../data/questions.json";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  year: number;
  marks: number;
  topic: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_SIZE = 10;

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [startTime] = useState(() => Date.now());
  const questionStartRef = useRef(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const picked = shuffle(questionsData as Question[]).slice(0, QUIZ_SIZE);
    setQuestions(picked);
    setAnswers(new Array(QUIZ_SIZE).fill(null));
  }, []);

  const q = questions[current];

  const handleSelect = useCallback(
    (idx: number) => {
      if (showFeedback) return;
      setSelected(idx);
      setShowFeedback(true);
      setAnswers((prev) => {
        const next = [...prev];
        next[current] = idx;
        return next;
      });
    },
    [current, showFeedback]
  );

  const handleNext = useCallback(() => {
    if (current < QUIZ_SIZE - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowFeedback(false);
      questionStartRef.current = Date.now();
    } else {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      const resultData = {
        questions: questions.map((qq) => ({
          id: qq.id,
          question: qq.question,
          options: qq.options,
          correct: qq.correct,
          explanation: qq.explanation,
          topic: qq.topic,
          year: qq.year,
        })),
        answers,
        timeTaken: elapsed,
      };
      sessionStorage.setItem("crammr_result", JSON.stringify(resultData));
      router.push("/results");
    }
  }, [current, startTime, questions, answers, router]);

  if (!q) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
      </div>
    );
  }

  const isCorrect = selected === q.correct;
  const labels = ["A", "B", "C", "D"];

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
        <span className="text-red-600">NEET · Physics · Kinematics</span>
        <span className="text-neutral-400">
          Q {current + 1} of {QUIZ_SIZE}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-red-500 transition-all duration-300"
          style={{ width: `${((current + (showFeedback ? 1 : 0)) / QUIZ_SIZE) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-xs text-neutral-400 mb-3">
          NEET {q.year} · {q.topic}
        </p>
        <p className="text-lg leading-relaxed">{q.question}</p>

        {/* Options */}
        <div className="mt-6 grid gap-2">
          {q.options.map((opt, idx) => {
            let cls =
              "rounded-xl border px-4 py-3 text-left text-sm transition";
            if (showFeedback) {
              if (idx === q.correct) {
                cls += " border-green-500 bg-green-50 text-green-900";
              } else if (idx === selected && !isCorrect) {
                cls += " border-red-500 bg-red-50 text-red-900";
              } else {
                cls += " border-neutral-200 bg-neutral-50 text-neutral-400";
              }
            } else {
              cls +=
                " border-neutral-300 bg-white hover:border-red-500 hover:bg-red-50 cursor-pointer";
            }
            return (
              <button
                key={idx}
                className={cls}
                onClick={() => handleSelect(idx)}
                disabled={showFeedback}
              >
                <span className="mr-2 font-semibold">{labels[idx]}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`mt-5 rounded-xl p-4 text-sm ${
              isCorrect
                ? "bg-green-50 text-green-900"
                : "bg-red-50 text-red-900"
            }`}
          >
            <p className="font-semibold mb-1">
              {isCorrect ? "Correct!" : "Not quite."}
            </p>
            <p>{q.explanation}</p>
          </div>
        )}
      </div>

      {/* Next button */}
      {showFeedback && (
        <button
          onClick={handleNext}
          className="mt-6 w-full rounded-full bg-neutral-900 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          {current < QUIZ_SIZE - 1 ? "Next Question" : "See Results"}
        </button>
      )}
    </div>
  );
}

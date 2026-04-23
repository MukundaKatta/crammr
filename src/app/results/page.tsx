"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { saveQuizResult, type UserStats } from "../../lib/storage";

interface QuestionResult {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
  year: number;
}

interface ResultData {
  questions: QuestionResult[];
  answers: (number | null)[];
  timeTaken: number;
}

export default function ResultsPage() {
  const [data, setData] = useState<ResultData | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("crammr_result");
    if (!raw) return;
    const parsed: ResultData = JSON.parse(raw);
    setData(parsed);

    const correct = parsed.questions.filter(
      (q, i) => parsed.answers[i] === q.correct
    ).length;
    const s = saveQuizResult(correct, parsed.questions.length);
    setStats(s);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-lg text-neutral-600">No quiz results found.</p>
        <Link
          href="/quiz"
          className="mt-4 rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700"
        >
          Take a Quiz
        </Link>
      </div>
    );
  }

  const score = data.questions.filter(
    (q, i) => data.answers[i] === q.correct
  ).length;
  const total = data.questions.length;
  const pct = Math.round((score / total) * 100);
  const minutes = Math.floor(data.timeTaken / 60);
  const seconds = data.timeTaken % 60;

  // Weak topics: topics where user got wrong answers
  const wrongTopics: Record<string, number> = {};
  data.questions.forEach((q, i) => {
    if (data.answers[i] !== q.correct) {
      wrongTopics[q.topic] = (wrongTopics[q.topic] || 0) + 1;
    }
  });
  const weakTopics = Object.entries(wrongTopics)
    .sort((a, b) => b[1] - a[1])
    .map(([topic, count]) => ({ topic, count }));

  const labels = ["A", "B", "C", "D"];

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      {/* Score card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-red-600">
          Quiz Complete
        </p>
        <div className="mt-4 text-6xl font-bold text-neutral-900">{pct}%</div>
        <p className="mt-2 text-neutral-600">
          {score} out of {total} correct
        </p>
        <p className="mt-1 text-sm text-neutral-400">
          Time: {minutes}m {seconds}s
        </p>

        {stats && (
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-neutral-600">
            <span className="flex items-center gap-1.5">
              🔥{" "}
              <span className="font-semibold text-neutral-900">
                {stats.streak}-day
              </span>{" "}
              streak
            </span>
            <span className="flex items-center gap-1.5">
              🏆 Best:{" "}
              <span className="font-semibold text-neutral-900">
                {stats.bestScore}%
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Weak topics */}
      {weakTopics.length > 0 && (
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Topics to review
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {weakTopics.map(({ topic, count }) => (
              <span
                key={topic}
                className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
              >
                {topic} ({count})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Link
          href="/quiz"
          className="flex-1 rounded-full bg-red-600 py-3.5 text-center text-sm font-medium text-white transition hover:bg-red-700"
        >
          Retry Quiz
        </Link>
        <Link
          href="/"
          className="flex-1 rounded-full border border-neutral-300 py-3.5 text-center text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          Home
        </Link>
      </div>

      {/* Question review */}
      <div className="mt-10">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Question Review
        </h3>
        <div className="space-y-4">
          {data.questions.map((q, i) => {
            const userAnswer = data.answers[i];
            const correct = userAnswer === q.correct;
            return (
              <details
                key={q.id}
                className="rounded-xl border border-neutral-200 bg-white overflow-hidden"
              >
                <summary className="flex cursor-pointer items-start gap-3 p-4 text-sm">
                  <span
                    className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      correct ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{q.question}</span>
                </summary>
                <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-3 text-sm">
                  <div className="space-y-1 mb-3">
                    {q.options.map((opt, oi) => {
                      let optCls = "text-neutral-600";
                      if (oi === q.correct) optCls = "text-green-700 font-semibold";
                      else if (oi === userAnswer) optCls = "text-red-600 line-through";
                      return (
                        <p key={oi} className={optCls}>
                          {labels[oi]}. {opt}
                          {oi === q.correct && " ✓"}
                          {oi === userAnswer && oi !== q.correct && " ✗"}
                        </p>
                      );
                    })}
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// App.tsx
import React, { useMemo, useState } from "react";

// ---- 仮データ（あとで外部ファイル・APIに差し替え可） ----
type Lesson = {
  id: string;
  title: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
  content?: string;
};

const LESSONS: Lesson[] = [
  {
    id: "L001",
    title: "Daily Conversation Basics",
    level: "Beginner",
    description: "あいさつ・自己紹介・よく使う表現を学ぶ",
    content:
      "Hello! Nice to meet you. My name is ... / I work as ... / I’m interested in ...",
  },
  {
    id: "L002",
    title: "Business Email Essentials",
    level: "Intermediate",
    description: "件名・宛名・依頼・締めの定型表現など",
    content:
      "I’m writing to follow up on... / Could you please... / I look forward to your reply.",
  },
  {
    id: "L003",
    title: "TOEIC Reading – Short Texts",
    level: "Intermediate",
    description: "広告・通知文・案内の読解練習",
    content:
      "Please be advised that the office will be closed this Friday due to maintenance.",
  },
  {
    id: "L004",
    title: "Negotiation Phrases",
    level: "Advanced",
    description: "価格交渉・条件提示・合意形成のフレーズ",
    content:
      "Would you be open to... / If you could offer..., we’d be able to proceed.",
  },
];

// ---- UI ----
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LESSONS;
    return LESSONS.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.description ?? "").toLowerCase().includes(q) ||
        (l.level ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  const selected = useMemo(
    () => LESSONS.find((l) => l.id === selectedId) ?? null,
    [selectedId]
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold tracking-tight">
            English Learning Hub
          </h1>
          <div className="text-xs text-slate-500">
            GitHub Pages × Vite / React
          </div>
        </div>
      </header>

      {/* Main layout: Sidebar + Content */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border bg-white shadow-sm">
          <div className="border-b p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons…（タイトル/説明/レベル）"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring"
            />
          </div>

          <ul className="max-h-[70vh] overflow-auto p-2">
            {filtered.map((l) => {
              const active = l.id === selectedId;
              return (
                <li key={l.id}>
                  <button
                    onClick={() => setSelectedId(l.id)}
                    className={[
                      "w-full rounded-xl px-3 py-2 text-left transition",
                      active
                        ? "bg-indigo-50 ring-1 ring-indigo-200"
                        : "hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{l.title}</span>
                      {l.level && (
                        <span className="text-xs text-slate-500">{l.level}</span>
                      )}
                    </div>
                    {l.description && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                        {l.description}
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="p-3 text-sm text-slate-500">No lessons found.</li>
            )}
          </ul>
        </aside>

        {/* Content Pane */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          {!selected ? (
            <div className="flex h-full min-h-[60vh] items-center justify-center">
              <div className="max-w-lg rounded-2xl border bg-white p-6 text-center shadow">
                <h2 className="text-xl font-bold">
                  Welcome to your English Learning Hub!
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  左のリストからレッスンを選択してください。
                </p>
              </div>
            </div>
          ) : (
            <article className="prose max-w-none">
              <h2 className="mb-1">{selected.title}</h2>
              {selected.level && (
                <div className="mb-4 text-sm text-slate-500">
                  Level: {selected.level}
                </div>
              )}
              {selected.description && (
                <p className="text-slate-700">{selected.description}</p>
              )}

              {/* 本文 */}
              {selected.content && (
                <div className="mt-6 rounded-xl border bg-slate-50 p-4">
                  <pre className="whitespace-pre-wrap text-sm">
                    {selected.content}
                  </pre>
                </div>
              )}

              {/* 例：操作ボタンの雛形 */}
              <div className="mt-6 flex flex-wrap gap-2">
                <button className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
                  ▶︎ 読み上げ
                </button>
                <button className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
                  単語一覧
                </button>
                <button className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
                  文法ポイント
                </button>
                <button className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
                  小テスト
                </button>
              </div>
            </article>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} English Lessons
      </footer>
    </div>
  );
}

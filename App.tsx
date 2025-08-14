import React, { useMemo, useState } from "react";
import { listLessons, getLesson } from "./services/data";
import LessonViewer from "./components/LessonViewer"; // 前回のままでOK。無ければ本文だけ表示でも可。

export default function App() {
  const lessons = listLessons();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(lessons[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lessons;
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.description ?? "").toLowerCase().includes(q)
    );
  }, [query, lessons]);

  const selected = selectedId ? getLesson(selectedId) : undefined;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold">English Learning Hub</h1>
          <div className="text-xs text-slate-500">GitHub Pages × Vite / React</div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border bg-white shadow-sm">
          <div className="border-b p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons…（英語/日本語）"
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
                    className={
                      "w-full rounded-xl px-3 py-2 text-left transition " +
                      (active ? "bg-indigo-50 ring-1 ring-indigo-200" : "hover:bg-slate-50")
                    }
                  >
                    <div className="font-medium">{l.title}</div>
                    {l.description && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{l.description}</p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="rounded-2xl border bg-white p-6 shadow-sm min-h-[60vh]">
          {!selected ? (
            <div className="grid h-full place-items-center text-slate-500">レッスンを選択してください</div>
          ) : (
            <article className="prose max-w-none">
              <h2 className="mb-1">{selected.title}</h2>
              {selected.description && <p className="text-slate-700">{selected.description}</p>}
              {selected.passage && (
                <div className="mt-6 rounded-xl border bg-slate-50 p-4">
                  <pre className="whitespace-pre-wrap text-sm">{selected.passage}</pre>
                </div>
              )}
            </article>
          )}
        </section>
      </main>
    </div>
  );
}

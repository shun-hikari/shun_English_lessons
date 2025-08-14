// services/legacyAdapter.ts
import * as legacy from "../constants"; // 既存の constants.ts を丸ごとインポート
import type { Lesson } from "../constants"; // すでに定義があればそれを使う／無ければ下記の Lesson を使う

// もし constants.ts に Lesson 型が無ければ、下の最低限の型を使ってください（重複定義を避けて！）
// export type Lesson = {
//   id: string;
//   title: string;
//   level?: "Beginner" | "Intermediate" | "Advanced";
//   description?: string;
//   passage?: string;
//   vocab?: { id: string; word: string; meaningJa: string; pos?: string; exampleEn?: string }[];
//   grammar?: { id: string; title: string; explanation: string; example?: string }[];
//   quiz?: { id: string; question: string; choices: string[]; answerIndex: number; explain?: string }[];
// };

/** type guard: {english, japanese} を持つ要素の配列か？ */
function isEnJaArray(x: unknown): x is { english: string; japanese: string }[] {
  return (
    Array.isArray(x) &&
    x.length > 0 &&
    typeof x[0]?.english === "string" &&
    typeof x[0]?.japanese === "string"
  );
}

/** 既存の constants.ts の全エクスポートを走査し、{english, japanese}[] を Lesson に変換 */
export function collectLegacyLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  let counter = 1;

  Object.entries(legacy).forEach(([key, val]) => {
    if (isEnJaArray(val)) {
      // この配列の各要素を 1 レッスンとして取り込む
      val.forEach((item) => {
        const id = `${key}-${String(counter).padStart(4, "0")}`;
        lessons.push({
          id,
          title: item.english,             // ← サイドバーに出す英語タイトル
          description: item.japanese,      // ← 日本語の説明
          passage: item.english,           // ← ひとまず本文=英語タイトル（必要なら別フィールドに）
          // vocab / grammar / quiz は、既存に応じて後で mapping を拡張
        });
        counter++;
      });
    }
  });

  return lessons;
}

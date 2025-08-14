// services/legacyAdapter.ts
// 既存 constants.ts を丸ごと読み込み
import * as legacy from "../constants";

// 最低限のLesson型（constants.ts に既にあるならそれを使ってOK）
export type Lesson = {
  id: string;
  title: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  description?: string;  // 日本語
  passage?: string;      // 本文（とりあえず英語タイトルを表示）
  vocab?: { id: string; word: string; meaningJa: string; pos?: string; exampleEn?: string }[];
  grammar?: { id: string; title: string; explanation: string; example?: string }[];
  quiz?: { id: string; question: string; choices: string[]; answerIndex: number; explain?: string }[];
};

// {english, japanese} の配列か？
function isEnJaArray(x: unknown): x is { english: string; japanese: string }[] {
  return Array.isArray(x) &&
         x.length > 0 &&
         typeof (x as any)[0]?.english === "string" &&
         typeof (x as any)[0]?.japanese === "string";
}

/** constants.ts のエクスポートを総なめして Lesson[] に変換 */
export function collectLegacyLessons(): Lesson[] {
  const out: Lesson[] = [];
  Object.entries(legacy).forEach(([key, val]) => {
    if (isEnJaArray(val)) {
      val.forEach((item, i) => {
        out.push({
          id: `${key}-${String(i + 1).padStart(4, "0")}`,
          title: item.english,
          description: item.japanese,
          passage: item.english,
        });
      });
    }
  });
  return out;
}

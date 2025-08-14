// services/legacyAdapter.ts
// 位置: リポジトリ直下の /services/legacyAdapter.ts（※ src/ の下ではありません）

// 既存 constants.ts を読み込む（constants.ts がリポジトリ直下にある前提）
import * as legacy from "../constants";

// 最低限の Lesson 型（constants.ts に Lesson 型があるならそれを使ってOK）
export type Lesson = {
  id: string;
  title: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
  passage?: string;
  vocab?: { id: string; word: string; meaningJa: string; pos?: string; exampleEn?: string }[];
  grammar?: { id: string; title: string; explanation: string; example?: string }[];
  quiz?: { id: string; question: string; choices: string[]; answerIndex: number; explain?: string }[];
};

// {english, japanese} の配列か？
function isEnJaArray(x: unknown): x is { english: string; japanese: string }[] {
  return (
    Array.isArray(x) &&
    x.length > 0 &&
    typeof (x as any)[0]?.english === "string" &&
    typeof (x as any)[0]?.japanese === "string"
  );
}

/** 既存 constants のうち、英日ペア配列をすべて Lesson[] に変換 */
export function collectLegacyLessons(): Lesson[] {
  const lessons: Lesson[] = [];

  // 1) 汎用スキャン（export された全キーを総なめ）
  Object.entries(legacy).forEach(([key, val]) => {
    if (isEnJaArray(val)) {
      val.forEach((item, i) => {
        lessons.push({
          id: `${key}-${String(i + 1).padStart(4, "0")}`,
          title: item.english,
          description: item.japanese,
          passage: item.english,
        });
      });
    }
  });

  // 2) フォールバック（最低限 GENERAL_LESSON_TOPICS だけは確実に拾う）
  const anyLegacy: any = legacy as any;
  const glt = anyLegacy.GENERAL_LESSON_TOPICS;
  if (lessons.length === 0 && isEnJaArray(glt)) {
    glt.forEach((item: any, i: number) => {
      lessons.push({
        id: `GENERAL_LESSON_TOPICS-${String(i + 1).padStart(4, "0")}`,
        title: item.english,
        description: item.japanese,
        passage: item.english,
      });
    });
  }

  // デバッグ用（必要なければ削除可）
  (window as any).__LESSON_DEBUG = () => {
    console.log("legacy keys:", Object.keys(legacy));
    console.log("lesson count:", lessons.length);
    console.table(lessons.slice(0, 5));
    return lessons.length;
  };

  return lessons;
}

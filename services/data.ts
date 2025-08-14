// services/data.ts
import { collectLegacyLessons, type Lesson } from "./legacyAdapter";

const CACHE: Lesson[] = collectLegacyLessons();

// デバッグ用：ブラウザのコンソールで window.__LESSON_DEBUG() すると数が見える
// （不要なら後で消してOK）
;(window as any).__LESSON_DEBUG = () => {
  console.log("lesson count:", CACHE.length);
  console.table(CACHE.slice(0, 5));
  return CACHE.length;
};

export const listLessons = (): Lesson[] => CACHE;
export const getLesson = (id: string): Lesson | undefined =>
  CACHE.find((l) => l.id === id);

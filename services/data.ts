// services/data.ts
import type { Lesson } from "../constants"; // なければ前回提示の Lesson を使う
import { collectLegacyLessons } from "./legacyAdapter";

const CACHE: Lesson[] = collectLegacyLessons();

export const listLessons = (): Lesson[] => CACHE;

export const getLesson = (id: string): Lesson | undefined =>
  CACHE.find((l) => l.id === id);

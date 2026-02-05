import type { Module } from "@/types/course";

interface ModuleWithDescription extends Module {
  description: string | null;
}

export function calculateCourseProgress(modules: Module[]) {
  const completedLessonIds = modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.progress[0]?.completed)
    .map((l) => l.id);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = completedLessonIds.length;
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return {
    completedLessonIds,
    totalLessons,
    completedLessons,
    progressPercentage,
  };
}

/**
 * Compute total lesson count and hours across modules
 */
export function getCourseStats(modules: Module[]) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalMinutes = modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.duration, 0),
    0,
  );
  const totalHours = Math.round(totalMinutes / 60);

  return { totalLessons, totalMinutes, totalHours };
}

/**
 * Compute stats for the upgrade card from locked modules
 */
export function getLockedContentStats(lockedModules: ModuleWithDescription[]) {
  const { totalLessons: lessonCount, totalHours: hours } =
    getCourseStats(lockedModules);

  const highlights = lockedModules
    .filter((m) => m.description)
    .slice(0, 3)
    .map((m) => m.description as string);

  return { lessonCount, hours, highlights };
}

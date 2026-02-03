interface Module {
  lessons: Array<{
    id: string;
    progress: {
      completed: boolean;
    } | null;
  }>;
}

export function calculateCourseProgress(modules: Module[]) {
  const completedLessonIds = modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.progress?.completed)
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

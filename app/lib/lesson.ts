import type { CoursePageResponse } from "@/types/course";
import type { Lesson } from "@/types/course";

interface LessonNavigation {
  previous: Lesson | null;
  next: Lesson | null;
}

export function getLessonNavigation(
  modules: CoursePageResponse["course"]["modules"],
  currentLessonId: string,
): LessonNavigation {
  const allLessons = modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);

  return {
    previous: allLessons[currentIndex - 1] ?? null,
    next: allLessons[currentIndex + 1] ?? null,
  };
}

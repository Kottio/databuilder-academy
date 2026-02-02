import Link from "next/link";
import type { ModuleWithLessons } from "@/types/course";

interface LessonSidebarProps {
  courseSlug: string;
  modules: ModuleWithLessons[];
  currentLessonId: string;
  isEnrolled: boolean;
  completedLessonIds?: string[];
}

export function LessonSidebar({
  courseSlug,
  modules,
  currentLessonId,
  isEnrolled,
  completedLessonIds = [],
}: LessonSidebarProps) {
  return (
    <div className="p-4 pt-20">
      <Link
        href={`/courses/${courseSlug}`}
        className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        ← Course Overview
      </Link>

      <h2 className="font-semibold text-lg mb-4">Course Content</h2>

      <div className="space-y-4">
        {modules.map((module) => {
          const isLocked = !module.isFree && !isEnrolled;

          return (
            <div key={module.id}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {module.title}
                </h3>
                {module.isFree ? (
                  <span className="text-xs text-green-600">FREE</span>
                ) : (
                  <span className="text-xs text-zinc-400">🔒</span>
                )}
              </div>

              <div className="space-y-1">
                {module.lessons.map((lesson) => {
                  const isCurrentLesson = lesson.id === currentLessonId;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      href={
                        isLocked
                          ? "#"
                          : `/courses/${courseSlug}/lessons/${lesson.id}`
                      }
                      className={`block px-3 py-2 rounded text-sm transition-colors ${
                        isCurrentLesson
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium"
                          : isLocked
                            ? "text-zinc-400 cursor-not-allowed"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                      onClick={(e) => isLocked && e.preventDefault()}
                    >
                      <div className="flex items-center gap-2">
                        {isLocked ? (
                          <span>🔒</span>
                        ) : isCompleted ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-blue-600">▶</span>
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

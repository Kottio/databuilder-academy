import Link from "next/link";
import type { CoursePageResponse } from "@/types/course";
import { canAccessModule } from "@/app/lib/access";

interface LessonSidebarProps {
  course: CoursePageResponse;
  currentLessonId: string;
}

export function LessonSidebar({
  course,
  currentLessonId,
}: LessonSidebarProps) {
  const completedLessonIds = course.course.modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.progress?.completed)
    .map((l) => l.id);

  return (
    <div className="p-4 pt-20">
      <Link
        href={`/courses/${course.course.slug}`}
        className="text-sm text-emerald-400 hover:text-emerald-300 mb-4 inline-block transition-colors"
      >
        ← Course Overview
      </Link>

      <h2 className="font-semibold text-lg text-zinc-200 mb-4">Course Content</h2>

      <div className="space-y-4">
        {course.course.modules.map((module) => {
          const hasAccess = canAccessModule(
            course.accessType,
            module.accessTier,
          );
          const isLocked = !hasAccess;

          return (
            <div key={module.id}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-zinc-400">
                  {module.title}
                </h3>
                {module.accessTier === "FREE" ? (
                  <span className="text-xs text-emerald-400">FREE</span>
                ) : (
                  <span className="text-xs text-zinc-600">🔒</span>
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
                          : `/courses/${course.course.slug}/lessons/${lesson.id}`
                      }
                      className={`block px-3 py-2 rounded text-sm transition-colors ${
                        isCurrentLesson
                          ? "bg-emerald-950/40 text-emerald-300 font-medium border border-emerald-800/40"
                          : isLocked
                            ? "text-zinc-600 cursor-not-allowed"
                            : "text-zinc-400 hover:bg-zinc-800/50"
                      }`}
                      onClick={(e) => isLocked && e.preventDefault()}
                    >
                      <div className="flex items-center gap-2">
                        {isLocked ? (
                          <span>🔒</span>
                        ) : isCompleted ? (
                          <span className="text-emerald-400">✓</span>
                        ) : (
                          <span className="text-emerald-500">▶</span>
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

import Link from "next/link";
import { canAccessModule } from "@/app/lib/access";

interface ModuleAccordionProps {
  module: {
    id: string;
    title: string;
    description: string | null;
    order: number;
    accessTier: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: number;
      order: number;
      progress: {
        completed: boolean;
        lastWatched: number;
        completedAt: string | null;
      } | null;
    }>;
  };
  courseSlug: string;
  userAccessType: string;
  completedLessonIds?: string[];
}

export function ModuleAccordion({
  module,
  courseSlug,
  userAccessType,
  completedLessonIds = [],
}: ModuleAccordionProps) {
  const hasAccess = canAccessModule(userAccessType, module.accessTier);
  const isLocked = !hasAccess;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Module Header */}
      <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {module.title}
            </h2>
            {module.description && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {module.description}
              </p>
            )}
          </div>
          {module.accessTier === "FREE" ? (
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-medium px-3 py-1 rounded-full">
              FREE
            </span>
          ) : isLocked ? (
            <span className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium px-3 py-1 rounded-full">
              🔒 LOCKED
            </span>
          ) : null}
        </div>
      </div>

      {/* Lessons List */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {module.lessons.map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);

          return (
            <Link
              key={lesson.id}
              href={
                isLocked ? "#" : `/courses/${courseSlug}/lessons/${lesson.id}`
              }
              className={`flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${
                isLocked ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => isLocked && e.preventDefault()}
            >
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div className="w-6 h-6 flex items-center justify-center">
                  {isLocked ? (
                    <span className="text-zinc-400">🔒</span>
                  ) : isCompleted ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-blue-600">▶</span>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {lesson.duration} min
                  </p>
                </div>
              </div>

              {!isLocked && (
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  →
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

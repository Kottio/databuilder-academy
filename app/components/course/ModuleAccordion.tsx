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
    <div className="bg-[#161820] rounded-lg border border-zinc-800/60 overflow-hidden">
      {/* Module Header */}
      <div className="bg-zinc-800/40 px-6 py-4 border-b border-zinc-800/60">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-100">
              {module.title}
            </h2>
            {module.description && (
              <p className="text-sm text-zinc-500 mt-1">
                {module.description}
              </p>
            )}
          </div>
          {module.accessTier === "FREE" ? (
            <span className="bg-emerald-950/50 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-800/40">
              FREE
            </span>
          ) : isLocked ? (
            <span className="bg-zinc-800 text-zinc-400 text-xs font-medium px-3 py-1 rounded-full">
              🔒 LOCKED
            </span>
          ) : null}
        </div>
      </div>

      {/* Lessons List */}
      <div className="divide-y divide-zinc-800/60">
        {module.lessons.map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);

          return (
            <Link
              key={lesson.id}
              href={
                isLocked ? "#" : `/courses/${courseSlug}/lessons/${lesson.id}`
              }
              className={`flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 transition-colors ${
                isLocked ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => isLocked && e.preventDefault()}
            >
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div className="w-6 h-6 flex items-center justify-center">
                  {isLocked ? (
                    <span className="text-zinc-600">🔒</span>
                  ) : isCompleted ? (
                    <span className="text-emerald-400">✓</span>
                  ) : (
                    <span className="text-emerald-500">▶</span>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-zinc-200">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {lesson.duration} min
                  </p>
                </div>
              </div>

              {!isLocked && (
                <span className="text-sm text-emerald-400">
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

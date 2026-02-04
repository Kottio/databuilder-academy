import Link from "next/link";
import type { Module } from "@/types/course";

interface ModuleAccordionProps {
  module: Module;
  courseSlug: string;
  isLocked: boolean;
  onUnlockClick?: () => void;
}

export function ModuleAccordion({
  module,
  courseSlug,
  isLocked,
  onUnlockClick,
}: ModuleAccordionProps) {
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
              <p className="text-sm text-zinc-500 mt-1">{module.description}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {module.accessTier === "FREE" ? (
              <span className="bg-emerald-950/50 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-800/40">
                FREE
              </span>
            ) : isLocked ? (
              <>
                {/* (3) Mini-CTA on locked module header */}
                <button
                  onClick={onUnlockClick}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 border border-emerald-800/40 hover:border-emerald-600/60 px-3 py-1 rounded-full transition-colors"
                >
                  Unlock
                </button>
                <span className="bg-zinc-800 text-zinc-400 text-xs font-medium px-3 py-1 rounded-full">
                  🔒
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="divide-y divide-zinc-800/60">
        {module.lessons.map((lesson) => {
          const isCompleted = lesson.progress?.completed || false;

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
                  <h3 className="font-medium text-zinc-200">{lesson.title}</h3>
                  <p className="text-sm text-zinc-500">{lesson.duration} min</p>
                </div>
              </div>

              {!isLocked && <span className="text-sm text-emerald-400">→</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

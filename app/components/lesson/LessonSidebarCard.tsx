import Link from "next/link";
import { Lock, Check, Play } from "lucide-react";
// import type { CoursePageResponse } from "@/types/course";
import type { Module } from "@/types/course";

interface SidebarCard {
  module: Module;
  isLocked: boolean;
  currentLessonId: string;
  courseSlug: string;
}
export function LessonSidebarModuleCard({
  module,
  isLocked,
  currentLessonId,
  courseSlug,
}: SidebarCard) {
  return (
    <div key={module.id}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-zinc-400">{module.title}</h3>
        {isLocked && <Lock size={14} className="text-zinc-600" />}
      </div>

      <div className="space-y-1">
        {module.lessons.map((lesson) => {
          const isCurrentLesson = lesson.id === currentLessonId;
          const isCompleted = lesson.progress?.completed || false;

          if (isLocked) {
            return (
              <span
                key={lesson.id}
                className="flex items-center gap-2 px-3 py-2 rounded text-sm text-zinc-600 cursor-not-allowed"
              >
                <Lock size={14} />
                <span className="truncate">{lesson.title}</span>
              </span>
            );
          }

          return (
            <Link
              key={lesson.id}
              href={`/courses/${courseSlug}/lessons/${lesson.id}`}
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                isCurrentLesson
                  ? "bg-emerald-950/40 text-emerald-300 font-medium border border-emerald-800/40"
                  : "text-zinc-400 hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Play size={14} className="text-emerald-500" />
                )}
                <span className="truncate">{lesson.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Lesson } from "@/types/course";

interface lessonActionProps {
  previous: Lesson | null;
  next: Lesson | null;
  courseSlug: string;
  handleMarkComplete: () => void;
  completed: boolean;
}
export function LessonActions({
  previous,
  next,
  courseSlug,
  handleMarkComplete,
  completed,
}: lessonActionProps) {
  return (
    <div className="flex items-center justify-between mb-8 pb-8 border-b border-zinc-800/60">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleMarkComplete}
          className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
        />
        <span className="text-sm font-medium text-zinc-300">
          Mark as complete
        </span>
      </label>

      <div className="flex gap-3">
        {previous ? (
          <Link
            href={`/courses/${courseSlug}/lessons/${previous.id}`}
            className="flex items-center gap-1 px-4 py-2 border border-zinc-700 rounded hover:bg-zinc-800 text-sm font-medium text-zinc-300 transition-colors"
          >
            <ChevronLeft size={16} />
            Previous
          </Link>
        ) : (
          <span className="flex items-center gap-1 px-4 py-2 border border-zinc-800 rounded text-sm font-medium text-zinc-600 cursor-not-allowed">
            <ChevronLeft size={16} />
            Previous
          </span>
        )}
        {next ? (
          <Link
            href={`/courses/${courseSlug}/lessons/${next.id}`}
            className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-sm font-medium transition-colors"
          >
            Next Lesson
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span className="flex items-center gap-1 px-4 py-2 bg-zinc-800 rounded text-sm font-medium text-zinc-500 cursor-not-allowed">
            Next Lesson
            <ChevronRight size={16} />
          </span>
        )}
      </div>
    </div>
  );
}

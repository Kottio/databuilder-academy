import Link from "next/link";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  progress?: {
    completed: number;
    total: number;
  };
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const progressPercentage = progress
    ? (progress.completed / progress.total) * 100
    : 0;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        {course.description}
      </p>

      {progress && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400 mb-1">
            <span>Progress</span>
            <span>
              {progress.completed} / {progress.total} lessons
            </span>
          </div>
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
        Continue learning →
      </span>
    </Link>
  );
}

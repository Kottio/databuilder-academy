import Link from "next/link";
import { getCourseStats, calculateCourseProgress } from "@/app/lib/progress";
import type { Module, Course } from "@/types/course";

interface CourseHeaderProps {
  course: Course;
  accessibleModules: Module[];
  hasFullAccess: boolean;
}

export function CourseHeader({
  course,
  accessibleModules,
  hasFullAccess,
}: CourseHeaderProps) {
  const courseStats = getCourseStats(course.modules);

  const { totalLessons, completedLessons, progressPercentage } =
    calculateCourseProgress(accessibleModules);
  return (
    <div className="mb-8">
      <Link
        href="/dashboard"
        className="text-sm text-emerald-400 hover:text-emerald-300 mb-4 inline-block transition-colors"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-4xl font-bold text-white mb-3">{course.title}</h1>

      <p className="text-lg text-zinc-400 mb-2">{course.description}</p>

      <p className="text-sm text-zinc-500 mb-6">
        {courseStats.totalLessons} lessons · {courseStats.totalHours} hours of
        content
      </p>

      <div className="bg-[#161820] rounded-lg border border-zinc-800/60 p-4">
        <div className="flex justify-between text-sm text-zinc-400 mb-2">
          <span>
            {hasFullAccess ? "Your progress" : "Free module progress"}
          </span>
          <span>
            {completedLessons} / {totalLessons} lessons completed
          </span>
        </div>
        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

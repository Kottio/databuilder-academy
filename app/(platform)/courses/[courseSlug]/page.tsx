"use client";

import useSWR from "swr";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ModuleAccordion } from "@/app/components/course/ModuleAccordion";
import { fetcher } from "@/app/lib/fetcher";
import { calculateCourseProgress } from "@/app/lib/progress";
import type { CoursePageResponse } from "@/types/course";

export default function CourseOverviewPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;

  const { data, isLoading, error: isError } = useSWR<CoursePageResponse>(
    `/api/me/courses/${courseSlug}`,
    fetcher,
  );

  if (isLoading) {
    return <div className="mx-auto max-w-5xl px-4 py-12 text-zinc-400">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="mx-auto max-w-5xl px-4 py-12 text-red-400">Course not found</div>;
  }

  const { course, accessType } = data;

  const {
    completedLessonIds,
    totalLessons,
    completedLessons,
    progressPercentage,
  } = calculateCourseProgress(course.modules);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Course Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-emerald-400 hover:text-emerald-300 mb-4 inline-block transition-colors"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-white mb-4">
          {course.title}
        </h1>

        <p className="text-lg text-zinc-400 mb-6">
          {course.description}
        </p>

        {/* Progress Bar */}
        <div className="bg-[#161820] rounded-lg border border-zinc-800/60 p-4 mb-6">
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>Your Progress</span>
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

        {/* Enrollment Status */}
        {accessType !== "PAID" && (
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-4 mb-6">
            <p className="text-sm text-emerald-200 mb-2">
              <strong>Module 1 is free!</strong> Upgrade to access all modules
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded text-sm transition-colors">
              Get Full Access - €{(course.price / 100).toFixed(0)}
            </button>
          </div>
        )}
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {course.modules.map((module) => (
          <ModuleAccordion
            key={module.id}
            module={module}
            courseSlug={courseSlug}
            userAccessType={accessType}
            completedLessonIds={completedLessonIds}
          />
        ))}
      </div>
    </div>
  );
}

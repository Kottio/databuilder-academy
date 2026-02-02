"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getCourseBySlug } from "@/app/data/courses";
import { ModuleAccordion } from "@/app/components/course/ModuleAccordion";

export default function CourseOverviewPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;

  // Get course data
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <p>Course not found</p>
      </div>
    );
  }

  // TODO: Get from database - mock data for now
  const completedLessonIds = ["lesson-1", "lesson-2"]; // Mock: user completed these lessons
  const isEnrolled = false; // Mock: user not enrolled

  const totalLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );
  const completedLessons = completedLessonIds.length;
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Course Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {course.title}
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          {course.description}
        </p>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 mb-6">
          <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            <span>Your Progress</span>
            <span>
              {completedLessons} / {totalLessons} lessons completed
            </span>
          </div>
          <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Enrollment Status */}
        {!isEnrolled && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
              <strong>Module 1 is free!</strong> Upgrade to access all modules
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded text-sm">
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
            isEnrolled={isEnrolled}
            completedLessonIds={completedLessonIds}
          />
        ))}
      </div>
    </div>
  );
}

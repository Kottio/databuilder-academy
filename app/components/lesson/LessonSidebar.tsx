import Link from "next/link";
import { LessonSidebarModuleCard } from "./LessonSidebarCard";
import type { CoursePageResponse } from "@/types/course";
import { splitModulesByAccess } from "@/app/lib/access";

interface LessonSidebarProps {
  course: CoursePageResponse;
  currentLessonId: string;
}

export function LessonSidebar({
  course: courseData,
  currentLessonId,
}: LessonSidebarProps) {
  const { locked, accessible } = splitModulesByAccess(
    courseData.course.modules,
    courseData.accessType,
  );

  const lockedIds = new Set(locked.map((m) => m.id));

  return (
    <div className="p-4 pt-20">
      <Link
        href={`/courses/${courseData.course.slug}`}
        className="text-sm text-emerald-400 hover:text-emerald-300 mb-4 inline-block transition-colors"
      >
        ← Course Overview
      </Link>

      <h2 className="font-semibold text-lg text-zinc-200 mb-4">
        Course Content
      </h2>

      <div className="space-y-4">
        {accessible.map((module) => {
          return (
            <LessonSidebarModuleCard
              key={module.id}
              module={module}
              isLocked={false}
              currentLessonId={currentLessonId}
              courseSlug={courseData.course.slug}
            ></LessonSidebarModuleCard>
          );
        })}

        {locked.length > 0 && (
          <Link
            href={`/courses/${courseData.course.slug}#upgrade-card`}
            className="block text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded transition-colors"
          >
            Unlock Full Course
          </Link>
        )}

        {locked.map((module) => {
          return (
            <LessonSidebarModuleCard
              key={module.id}
              module={module}
              isLocked={true}
              currentLessonId={currentLessonId}
              courseSlug={courseData.course.slug}
            ></LessonSidebarModuleCard>
          );
        })}
      </div>
    </div>
  );
}

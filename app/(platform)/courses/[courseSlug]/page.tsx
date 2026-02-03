"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { CourseHeader } from "@/app/components/course/CourseHeader";
import { UpgradeCard } from "@/app/components/course/UpgradeCard";
import { ModuleAccordion } from "@/app/components/course/ModuleAccordion";
import { fetcher } from "@/app/lib/fetcher";
import { splitModulesByAccess } from "@/app/lib/access";
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
  const hasFullAccess = accessType === "PAID";

  const { accessible: accessibleModules, locked: lockedModules } =
    splitModulesByAccess(course.modules, accessType);

  const { completedLessonIds } = calculateCourseProgress(accessibleModules);

  const scrollToUpgrade = () => {
    document.getElementById("upgrade-card")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <CourseHeader
        course={course}
        accessibleModules={accessibleModules}
        hasFullAccess={hasFullAccess}
      />

      {/* Accessible Modules */}
      <div className="space-y-6">
        {accessibleModules.map((module) => (
          <ModuleAccordion
            key={module.id}
            module={module}
            courseSlug={courseSlug}
            userAccessType={accessType}
            completedLessonIds={completedLessonIds}
          />
        ))}
      </div>

      {!hasFullAccess && lockedModules.length > 0 && (
        <UpgradeCard lockedModules={lockedModules} price={course.price} />
      )}

      {/* Locked Modules */}
      {lockedModules.length > 0 && (
        <div className="space-y-6">
          {lockedModules.map((module) => (
            <ModuleAccordion
              key={module.id}
              module={module}
              courseSlug={courseSlug}
              userAccessType={accessType}
              completedLessonIds={completedLessonIds}
              onUnlockClick={scrollToUpgrade}
            />
          ))}
        </div>
      )}
    </div>
  );
}

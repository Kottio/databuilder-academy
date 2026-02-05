"use client";

import useSWR from "swr";
import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";
import { Play, Clock, BookOpen } from "lucide-react";
import { CourseCard } from "@/app/components/course/CourseCard";
import { fetcher } from "@/app/lib/fetcher";
import type { CourseDashboardResponse, Course } from "@/types/course";

function getLastLesson(courses: Course[]) {
  const lesson = courses.flatMap((c) =>
    c.modules.flatMap((m) =>
      m.lessons.map((l) => ({
        ...l,
        courseSlug: c.slug,
        moduleTitle: m.title,
      })),
    ),
  );

  const lastLesson = lesson
    ?.filter((l) => l.progress.length > 0)
    ?.sort((a, b) => {
      return (
        new Date(b.progress[0]!.updatedAt).getTime() -
        new Date(a.progress[0]!.updatedAt).getTime()
      );
    })[0];

  return lastLesson;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const {
    data,
    isLoading,
    error: isError,
  } = useSWR<CourseDashboardResponse>("/api/me/courses", fetcher, {
    revalidateOnFocus: true,
  });
  const courses = data?.courses;
  const accessType = data?.accessType || "FREE";

  const lastLesson = courses ? getLastLesson(courses) : null;

  return (
    <div>
      {/* Welcome Banner */}
      <div className="border-b border-zinc-800/60 bg-[#161820]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {session?.user.name || "Student"}
          </h1>
          <p className="text-zinc-400 mt-2">Continue your learning journey</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <section>
          <h2 className="text-lg font-semibold text-zinc-200 mb-6">
            Your Courses
          </h2>

          {isLoading && <div className="text-zinc-500">Loading courses...</div>}
          {isError && (
            <div className="text-red-400">Failed to load courses</div>
          )}

          {courses && courses.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course: Course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  accessType={accessType}
                />
              ))}
            </div>
          )}

          {courses && courses.length === 0 && (
            <div className="text-zinc-500">
              No courses yet. Check back soon!
            </div>
          )}

          {lastLesson && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-zinc-200 mb-4">
                Continue Where You Left Off
              </h2>
              <Link
                href={`/courses/${lastLesson.courseSlug}/lessons/${lastLesson.id}`}
                className="block rounded-lg border border-zinc-800/60 bg-[#161820] hover:border-emerald-500/30 transition-all group overflow-hidden"
              >
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center w-24 sm:w-32 bg-emerald-950/30 border-r border-zinc-800/60 group-hover:bg-emerald-950/50 transition-colors">
                    <Play size={28} className="text-emerald-400" />
                  </div>
                  <div className="flex-1 p-5 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-emerald-400 font-medium uppercase tracking-wide">
                        Resume lesson
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-zinc-100 truncate mb-2">
                      {lastLesson.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {lastLesson.title}
                      </span>
                      <span className="text-zinc-700">·</span>
                      <span>{lastLesson.moduleTitle}</span>
                      <span className="text-zinc-700">·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {lastLesson.duration} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}
        </section>
      </div>
    </div>
  );
}

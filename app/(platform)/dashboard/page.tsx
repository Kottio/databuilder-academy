"use client";

import useSWR from "swr";
import { useSession } from "@/app/lib/auth-client";
import { CourseCard } from "@/app/components/course/CourseCard";
import { fetcher } from "@/app/lib/fetcher";
import type { Course } from "@/types/course";

export default function DashboardPage() {
  const { data: session } = useSession();
  const {
    data,
    isLoading,
    error: isError,
  } = useSWR<{ courses: Course[] }>("/api/me/courses", fetcher);
  const courses = data?.courses;

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
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          {courses && courses.length === 0 && (
            <div className="text-zinc-500">
              No courses yet. Check back soon!
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

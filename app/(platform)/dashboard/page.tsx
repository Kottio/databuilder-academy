"use client";

import { useSession } from "@/app/lib/auth-client";
import { useEffect, useState } from "react";
import { CourseCard } from "@/app/components/course/CourseCard";
// import { courses } from "@/app/data/courses";
// import Link from "next/link";
import { Course } from "@/types/course";
export default function DashboardPage() {
  const { data: session } = useSession();

  const [courses, setCourses] = useState<Course[]>([]);
  // TODO : Check Authentication

  // const totalLessons = courses[0].modules.reduce(
  //   (acc, m) => acc + m.lessons.length,
  //   0,
  // );
  // const completedLessons = 2; // Mock: user has completed 2 lessons

  useEffect(() => {
    //Improve error handling and loading
    const fetchCourses = async () => {
      const response = await fetch('/api/me/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      }
    };

    if (session) {
      fetchCourses();
    }
  }, [session]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Welcome back, {session?.user.name || "Student"}!
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Continue your learning journey
        </p>
      </div>

      {/* Enrolled Courses Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              // progress={{
              //   completed: completedLessons,
              //   total: totalLessons,
              // }}
            />
          ))}
        </div>
      </section>

      {/* Continue Where You Left Off */}
      {/* <section>
        <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex items-start gap-4">
            <div className="w-48 h-28 bg-zinc-200 dark:bg-zinc-800 rounded flex-shrink-0" />

            <div className="flex-1">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                {courses[0].modules[0].title}
              </p>
              <h3 className="text-lg font-semibold mb-2">
                {courses[0].modules[0].lessons[2].title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {courses[0].modules[0].lessons[2].description}
              </p>

              <Link
                href={`/courses/${courses[0].slug}/lessons/${courses[0].modules[0].lessons[2].id}`}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Resume watching →
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

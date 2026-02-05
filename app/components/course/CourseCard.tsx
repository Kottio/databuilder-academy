import Link from "next/link";
import type { Course } from "@/types/course";
import Image from "next/image";
import { splitModulesByAccess } from "@/app/lib/access";
import { calculateCourseProgress } from "@/app/lib/progress";

interface CourseCardProps {
  course: Course;
  accessType: string;
}

export function CourseCard({ course, accessType }: CourseCardProps) {
  const { accessible } = splitModulesByAccess(course.modules, accessType);
  const { progressPercentage, completedLessons, totalLessons } =
    calculateCourseProgress(accessible);
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group rounded-lg border border-zinc-800/60 bg-[#161820] overflow-hidden hover:border-emerald-500/30 transition-all"
    >
      {/* Thumbnail / Header */}
      <div className="relative h-40 ">
        <Image
          src="/fullstackData.png"
          fill
          className="object-cover object-[0%_55%] "
          alt={course.title}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 to-teal-900/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl text-emerald-400/60 group-hover:text-emerald-400/80 transition-colors">
            &#9654;
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-zinc-100 mb-1.5">
          {course.title}
        </h3>
        <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="bg-[#161820] rounded-lg  py-2 mb-2">
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>
              {accessType !== "FREE" ? "Your progress" : "Free module progress"}
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

        <span className="text-xs   text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors ">
          Continue learning →
        </span>
      </div>
    </Link>
  );
}

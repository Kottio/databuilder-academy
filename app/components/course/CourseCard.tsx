import Link from "next/link";
import type { Course } from "@/types/course";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
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

        <span className="text-xs text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors">
          Continue learning →
        </span>
      </div>
    </Link>
  );
}

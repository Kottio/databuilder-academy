"use client";
export interface CourseAdmin {
  id: string;
  title: string;
  slug: string;
}

interface CourseSelectorProps {
  courses: CourseAdmin[];
  selectedId: string | null;
  onSelect: (courseId: string) => void;
}

export function CourSelector({
  courses,
  selectedId,
  onSelect,
}: CourseSelectorProps) {
  return (
    <>
      <div className="mb-8">
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Cours
        </label>
        <select
          value={selectedId || ""}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-[#161820] border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none"
        >
          <option value="" disabled>
            Sélectionner un cours...
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

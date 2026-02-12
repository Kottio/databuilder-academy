"use client";

import { useEffect, useState } from "react";
import { getCourses, getCourseWithModules } from "@/app/lib/actions/getcourses";
import { CourSelector } from "@/app/components/admin/CourseSelector";
import type { CourseAdmin } from "@/app/components/admin/CourseSelector";
import { ModuleCard } from "@/app/components/admin/AdminModuleCard";
import { LessonModal } from "@/app/components/admin/LessonModal";
import { createLesson } from "@/app/lib/actions/lesson";

export default function AdminPage() {
  const [courses, setCourses] = useState<CourseAdmin[] | []>([]);
  const [course, setCourse] = useState<any>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedModuleTitle, setSelectedModuleTitle] = useState("");

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  useEffect(() => {
    async function loadCourse() {
      if (selectedCourseId) {
        const data = await getCourseWithModules(selectedCourseId);
        setCourse(data);
      } else {
        setCourse(null);
      }
    }
    loadCourse();
  }, [selectedCourseId]);

  const handleAddLesson = (moduleId: string, moduleTitle: string) => {
    setSelectedModuleId(moduleId);
    setSelectedModuleTitle(moduleTitle);
    setShowCreateLesson(true);
  };

  const handleCreateLesson = async (data: any) => {
    if (!selectedModuleId) return;

    await createLesson(selectedModuleId, data);
    setShowCreateLesson(false);

    // Recharger le cours
    if (selectedCourseId) {
      const updated = await getCourseWithModules(selectedCourseId);
      setCourse(updated);
    }
  };

  // console.log(courses.filter((c) => c.id == selectedCourseId)[0].title);
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
      <p className="text-zinc-400 mb-8">Gestion des cours, modules et leçons</p>
      <CourSelector
        courses={courses}
        selectedId={selectedCourseId}
        onSelect={setSelectedCourseId}
      ></CourSelector>
      {selectedCourseId && (
        <span className="text-lg font-bold">
          {courses.filter((c) => c.id == selectedCourseId)[0].title}
        </span>
      )}

      {/* Module Components */}
      {course && (
        <div className="space-y-6">
          {course.modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onEditModule={() => console.log("Edit module:", module.id)}
              onAddLesson={() => handleAddLesson(module.id, module.title)}
              onEditLesson={(lessonId) => console.log("Edit lesson:", lessonId)}
              onDeleteLesson={(lessonId) =>
                console.log("Delete lesson:", lessonId)
              }
            />
          ))}

          {/* Bouton ajouter module */}
          <button
            onClick={() => console.log("Add new module", course.id)}
            className="w-full py-4 border-2 border-dashed border-zinc-700 rounded-lg text-zinc-500 hover:border-emerald-500 hover:text-emerald-400
  transition-colors"
          >
            + Ajouter un module
          </button>
        </div>
      )}

      <LessonModal
        isOpen={showCreateLesson}
        onClose={() => setShowCreateLesson(false)}
        onSubmit={handleCreateLesson}
        lesson={null}
        moduleTitle={selectedModuleTitle}
      />
    </div>
  );
}

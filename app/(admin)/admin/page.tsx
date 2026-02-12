"use client";

import { useEffect, useState } from "react";
import { getCourses, getCourseWithModules } from "@/app/lib/actions/getcourses";
import { CourSelector } from "@/app/components/admin/CourseSelector";
import type { CourseAdmin } from "@/app/components/admin/CourseSelector";
import { ModuleCard } from "@/app/components/admin/AdminModuleCard";
import { LessonModal } from "@/app/components/admin/LessonModal";
import { ModuleModal } from "@/app/components/admin/ModuleModal";
import { createLesson, updateLesson, deleteLesson, swapLessonOrder } from "@/app/lib/actions/lesson";
import { createModule, updateModule } from "@/app/lib/actions/modules";

export default function AdminPage() {
  const [courses, setCourses] = useState<CourseAdmin[] | []>([]);
  const [course, setCourse] = useState<any>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showCreateModule, setShowCreateModule] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState<any>(null);
  const [lessonToEdit, setLessonToEdit] = useState<any>(null);
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
    setLessonToEdit(null); // Reset pour mode création
    setSelectedModuleId(moduleId);
    setSelectedModuleTitle(moduleTitle);
    setShowCreateLesson(true);
  };

  const handleSubmitLesson = async (data: any) => {
    if (lessonToEdit) {
      // Mode édition
      await updateLesson(lessonToEdit.id, data);
      setLessonToEdit(null);
    } else {
      // Mode création
      if (!selectedModuleId) return;
      await createLesson(selectedModuleId, data);
    }

    setShowCreateLesson(false);

    // Recharger le cours
    if (selectedCourseId) {
      const updated = await getCourseWithModules(selectedCourseId);
      setCourse(updated);
    }
  };

  const handleEditLesson = (lesson: any, moduleTitle: string) => {
    setLessonToEdit(lesson);
    setSelectedModuleTitle(moduleTitle);
    setShowCreateLesson(true);
  };

  const handleSubmitModule = async (data: {
    title: string;
    description: string;
    accessTier: "FREE" | "PAID";
  }) => {
    if (moduleToEdit) {
      // Mode édition
      await updateModule(moduleToEdit.id, data);
      setModuleToEdit(null);
    } else {
      // Mode création
      if (!selectedCourseId) return;
      await createModule(selectedCourseId, data);
    }

    setShowCreateModule(false);

    // Recharger le cours
    if (selectedCourseId) {
      const updated = await getCourseWithModules(selectedCourseId);
      setCourse(updated);
    }
  };

  const handleEditModule = (module: any) => {
    setModuleToEdit(module);
    setShowCreateModule(true);
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Supprimer cette leçon ?")) return;

    await deleteLesson(lessonId);
    // Recharger le cours
    if (selectedCourseId) {
      const updated = await getCourseWithModules(selectedCourseId);
      setCourse(updated);
    }
  };

  const handleMoveLesson = async (lessonId: string, direction: "up" | "down", moduleLessons: any[]) => {
    const sorted = [...moduleLessons].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((l) => l.id === lessonId);

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;

    const otherLesson = sorted[swapIndex];
    await swapLessonOrder(lessonId, otherLesson.id);

    // Recharger le cours
    if (selectedCourseId) {
      const updated = await getCourseWithModules(selectedCourseId);
      setCourse(updated);
    }
  };
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
              onEditModule={() => handleEditModule(module)}
              onAddLesson={() => handleAddLesson(module.id, module.title)}
              onEditLesson={(lessonId) => {
                const lesson = module.lessons.find((l: any) => l.id === lessonId);
                if (lesson) handleEditLesson(lesson, module.title);
              }}
              onDeleteLesson={handleDeleteLesson}
              onMoveLesson={(lessonId, direction) => handleMoveLesson(lessonId, direction, module.lessons)}
            />
          ))}

          {/* Bouton ajouter module */}
          <button
            onClick={() => {
              setModuleToEdit(null);
              setShowCreateModule(true);
            }}
            className="w-full py-4 border-2 border-dashed border-zinc-700 rounded-lg text-zinc-500 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
          >
            + Ajouter un module
          </button>
        </div>
      )}

      <LessonModal
        isOpen={showCreateLesson}
        onClose={() => {
          setShowCreateLesson(false);
          setLessonToEdit(null);
        }}
        onSubmit={handleSubmitLesson}
        lesson={lessonToEdit}
        moduleTitle={selectedModuleTitle}
      />

      <ModuleModal
        isOpen={showCreateModule}
        onClose={() => {
          setShowCreateModule(false);
          setModuleToEdit(null);
        }}
        onSubmit={handleSubmitModule}
        module={moduleToEdit}
      />
    </div>
  );
}

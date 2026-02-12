"use client";

import { Pencil, Trash2, Plus } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: number;
  order: number;
}

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string | null;
    order: number;
    accessTier: string;
    lessons: Lesson[];
  };
  onEditModule: () => void;
  onAddLesson: () => void;
  onEditLesson: (lessonId: string) => void;
  onDeleteLesson: (lessonId: string) => void;
}

export function ModuleCard({
  module,
  onEditModule,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
}: ModuleCardProps) {
  return (
    <div className="bg-[#161820] border border-zinc-800/60 rounded-lg overflow-hidden">
      {/* Header du module */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-zinc-500">
            MODULE {module.order}
          </span>
          <h3 className="font-semibold text-white">{module.title}</h3>
          <span
            className={`text-xs px-2 py-0.5 rounded ${
              module.accessTier === "FREE"
                ? "bg-emerald-950/50 text-emerald-400"
                : "bg-amber-950/50 text-amber-400"
            }`}
          >
            {module.accessTier}
          </span>
        </div>
        <button
          onClick={onEditModule}
          className="text-zinc-500 hover:text-emerald-400 transition-colors"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* Liste des leçons */}
      <div className="divide-y divide-zinc-800/40">
        {module.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/20"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-500 w-6">{lesson.order}.</span>
              <span className="text-zinc-200">{lesson.title}</span>
              <span className="text-xs text-zinc-500">
                {lesson.duration} min
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEditLesson(lesson.id)}
                className="text-zinc-500 hover:text-emerald-400 transition-colors p-1"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDeleteLesson(lesson.id)}
                className="text-zinc-500 hover:text-red-400 transition-colors p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton ajouter leçon */}
      <button
        onClick={onAddLesson}
        className="w-full px-4 py-3 flex items-center justify-center gap-2 text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800/30 transition-colors
  border-t border-zinc-800/60"
      >
        <Plus size={16} />
        <span className="text-sm">Ajouter une leçon</span>
      </button>
    </div>
  );
}

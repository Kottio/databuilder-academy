"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface LessonData {
  id?: string;
  title: string;
  videoUrl: string;
  content: string;
  duration: number;
}

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LessonData) => void;
  lesson?: LessonData | null; // null = création, défini = édition
  moduleTitle: string;
}

export function LessonModal({
  isOpen,
  onClose,
  onSubmit,
  lesson,
  moduleTitle,
}: LessonModalProps) {
  const [formData, setFormData] = useState<LessonData>({
    title: "",
    videoUrl: "",
    content: "",
    duration: 0,
  });

  // Remplir le form si édition, reset si création
  useEffect(() => {
    if (isOpen) {
      if (lesson) {
        setFormData(lesson);
      } else {
        setFormData({ title: "", videoUrl: "", content: "", duration: 0 });
      }
    }
  }, [lesson, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Extraire l'ID YouTube pour la preview
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(formData.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#161820] border border-zinc-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {lesson ? "Modifier la leçon" : "Nouvelle leçon"}
            </h2>
            <p className="text-sm text-zinc-500">{moduleTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Titre
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none"
              placeholder="Introduction à Python"
              required
            />
          </div>

          {/* URL YouTube */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              URL YouTube
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none"
              placeholder="https://www.youtube.com/watch?v=... (optionnel)"
            />
            {/* Preview YouTube */}
            {youtubeId && (
              <div className="mt-3 aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Durée */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Durée (minutes)
            </label>
            <input
              type="number"
              min="0"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              className="w-32 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Contenu Markdown */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Contenu (Markdown)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={10}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none
  font-mono text-sm resize-none"
              placeholder="## Description&#10;&#10;Dans cette leçon, vous allez apprendre..."
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
            >
              {lesson ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

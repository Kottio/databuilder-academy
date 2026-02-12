"use client";

import { useState, useEffect } from "react";
import { X, Clock, Video, Eye, Edit3 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  lesson?: LessonData | null;
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
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (lesson) {
        setFormData(lesson);
      } else {
        setFormData({ title: "", videoUrl: "", content: "", duration: 0 });
      }
      setShowPreview(false);
    }
  }, [lesson, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(formData.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative bg-[#161820] border border-zinc-800 rounded-lg w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header compact */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-white">
              {lesson ? "Modifier" : "Nouvelle leçon"}
            </h2>
            <span className="text-zinc-500">•</span>
            <span className="text-sm text-zinc-400">{moduleTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-4">
            {/* Ligne 1: Titre + Durée */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none text-sm"
                  placeholder="Introduction à Python"
                  required
                />
              </div>
              <div className="w-28">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  <Clock size={12} className="inline mr-1" />
                  Durée (min)
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
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Ligne 2: URL YouTube */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                <Video size={12} className="inline mr-1" />
                URL YouTube (optionnel)
              </label>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none text-sm"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {youtubeId && (
                  <div className="w-40 h-[38px] rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0">
                    <img
                      src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Contenu Markdown avec tabs */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Contenu (Markdown)
                </label>
                <div className="flex gap-1 bg-zinc-900 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setShowPreview(false)}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-colors ${
                      !showPreview
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Edit3 size={12} />
                    Écrire
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-colors ${
                      showPreview
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Eye size={12} />
                    Aperçu
                  </button>
                </div>
              </div>

              {!showPreview ? (
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none font-mono text-sm resize-none"
                  style={{ minHeight: "350px" }}
                  placeholder={`## Objectifs

- Point 1
- Point 2

## Contenu

Votre contenu ici...

## Ressources

- [Lien](url)`}
                />
              ) : (
                <div
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 overflow-y-auto prose prose-invert prose-sm max-w-none
                    prose-headings:text-zinc-100 prose-headings:font-semibold
                    prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3
                    prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
                    prose-p:text-zinc-300 prose-p:leading-relaxed
                    prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-zinc-100
                    prose-code:text-emerald-400 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                    prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700
                    prose-ul:text-zinc-300 prose-ol:text-zinc-300
                    prose-li:marker:text-zinc-500"
                  style={{ minHeight: "350px" }}
                >
                  {formData.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-zinc-500 italic">Aucun contenu à afficher...</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer sticky */}
          <div className="sticky bottom-0 flex justify-end gap-3 px-5 py-3 border-t border-zinc-800 bg-[#161820]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {lesson ? "Enregistrer" : "Créer la leçon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

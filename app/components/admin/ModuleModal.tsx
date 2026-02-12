"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ModuleData {
  id?: string;
  title: string;
  description: string | null;
  accessTier: "FREE" | "PAID";
}

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    accessTier: "FREE" | "PAID";
  }) => void;
  module?: ModuleData | null;
}

export function ModuleModal({ isOpen, onClose, onSubmit, module }: ModuleModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    accessTier: "FREE" as "FREE" | "PAID",
  });

  useEffect(() => {
    if (isOpen) {
      if (module) {
        setFormData({
          title: module.title,
          description: module.description || "",
          accessTier: module.accessTier,
        });
      } else {
        setFormData({ title: "", description: "", accessTier: "FREE" });
      }
    }
  }, [module, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative bg-[#161820] border border-zinc-800 rounded-lg w-full max-w-lg">
        {/* Header compact */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <h2 className="text-base font-semibold text-white">
            {module ? "Modifier le module" : "Nouveau module"}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Titre + Accès sur la même ligne */}
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
                placeholder="Introduction"
                required
              />
            </div>
            <div className="w-32">
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Accès
              </label>
              <select
                value={formData.accessTier}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accessTier: e.target.value as "FREE" | "PAID",
                  })
                }
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none text-sm"
              >
                <option value="FREE">Gratuit</option>
                <option value="PAID">Payant</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Description (optionnel)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none text-sm resize-none"
              placeholder="Description du module..."
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-2">
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
              {module ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

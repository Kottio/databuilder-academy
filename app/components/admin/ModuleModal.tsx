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
  module?: ModuleData | null; // null = création, défini = édition
}

export function ModuleModal({ isOpen, onClose, onSubmit, module }: ModuleModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    accessTier: "FREE" as "FREE" | "PAID",
  });

  // Remplir le form si édition, reset si création
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
    if (!module) {
      setFormData({ title: "", description: "", accessTier: "FREE" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-[#161820] border border-zinc-800 rounded-lg w-full max-w-md m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">
            {module ? "Modifier le module" : "Nouveau module"}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
              placeholder="Introduction"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Description (optionnel)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
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
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:border-emerald-500 focus:outline-none"
            >
              <option value="FREE">Gratuit</option>
              <option value="PAID">Payant</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg"
            >
              {module ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

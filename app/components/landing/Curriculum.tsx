"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/app/components/ui/Section";
import { ChevronDown, Lock, Play, Clock, Youtube, Key } from "lucide-react";

interface Module {
  id: number;
  title: string;
  duration: string;
  tier: "free" | "basic" | "premium";
  lessons: string[];
  badge?: string;
  highlight?: string;
}

const modules: Module[] = [
  {
    id: 1,
    title: "Foundation Setup",
    duration: "2h",
    tier: "free",
    badge: "GRATUIT",
    highlight: "Ces vidéos sont aussi sur YouTube",
    lessons: [
      "Git basics & workflow",
      "Bash essentials",
      "Docker introduction",
      "Python + pyenv setup",
      "VS Code configuration",
      "Project folder structure",
    ],
  },
  {
    id: 2,
    title: "Container Fundamentals",
    duration: "4h",
    tier: "basic",
    highlight: "Accès Wisdom Wall débloqué",
    lessons: [
      "Docker + docker-compose avancé",
      "PostgreSQL en container",
      "Metabase local setup",
      "Connexion à l'API Wisdom Wall",
    ],
  },
  {
    id: 3,
    title: "Data Ingestion",
    duration: "5h",
    tier: "basic",
    lessons: [
      "Introduction à dlt (data load tool)",
      "Pipeline Wisdom Wall → Postgres",
      "Gestion de la pagination",
      "Error handling & retry logic",
      "Incremental loading",
    ],
  },
  {
    id: 4,
    title: "Data Exploration",
    duration: "4h",
    tier: "basic",
    lessons: [
      "Metabase fundamentals",
      "Métriques SaaS (MRR, churn, cohorts)",
      "Questions & dashboards",
      "Filtres et drill-down",
    ],
  },
  {
    id: 5,
    title: "Dashboard Development",
    duration: "6h",
    tier: "basic",
    lessons: [
      "SQL avancé (CTEs, window functions)",
      "Modélisation Star Schema",
      "Materialized views",
      "Dashboard client-ready",
      "Optimisation des performances",
    ],
  },
  {
    id: 6,
    title: "Orchestration",
    duration: "5h",
    tier: "basic",
    lessons: [
      "Automatisation des pipelines",
      "Cron jobs & scheduling",
      "Monitoring & alerting",
      "Error handling avancé",
    ],
  },
  {
    id: 7,
    title: "dbt Transformations",
    duration: "4h",
    tier: "premium",
    lessons: [
      "Migration SQL → dbt",
      "Models, sources, seeds",
      "Testing & documentation",
      "dbt best practices",
    ],
  },
  {
    id: 8,
    title: "Cloud Deployment",
    duration: "6h",
    tier: "premium",
    lessons: [
      "DigitalOcean setup",
      "Docker en production",
      "Sécurité & SSL",
      "Monitoring & logs",
      "Maintenance & updates",
    ],
  },
];

function ModuleCard({ module }: { module: Module }) {
  const [isOpen, setIsOpen] = useState(module.tier === "free");

  const tierStyles = {
    free: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    basic: "bg-zinc-800 text-zinc-400 border-zinc-700",
    premium: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  };

  const tierLabels = {
    free: "GRATUIT",
    basic: "BASIC",
    premium: "PREMIUM",
  };

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
              module.tier === "free"
                ? "bg-emerald-500"
                : module.tier === "premium"
                  ? "bg-purple-500"
                  : "bg-zinc-800"
            }`}
          >
            {module.id}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-white">{module.title}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border ${tierStyles[module.tier]}`}
              >
                {tierLabels[module.tier]}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
              <Clock size={14} />
              <span>{module.duration}</span>
              <span className="text-zinc-700">•</span>
              <span>{module.lessons.length} leçons</span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-zinc-800">
          {module.highlight && (
            <div
              className={`flex items-center gap-2 mt-4 mb-3 text-sm ${
                module.highlight.includes("YouTube")
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {module.highlight.includes("YouTube") ? (
                <Youtube size={14} />
              ) : (
                <Key size={14} />
              )}
              <span>{module.highlight}</span>
            </div>
          )}
          <ul className="space-y-2 mt-4">
            {module.lessons.map((lesson, index) => (
              <li key={index} className="flex items-center gap-3 text-zinc-400">
                {module.tier === "free" ? (
                  <Play size={14} className="text-emerald-500" />
                ) : (
                  <Lock size={14} className="text-zinc-600" />
                )}
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Curriculum() {
  return (
    <Section id="curriculum" dark>
      <SectionHeader
        title="8 Modules, Du Setup à la Production"
        subtitle="Un parcours progressif pour devenir Data Builder—même en partant de zéro"
      />

      <div className="max-w-3xl mx-auto space-y-4">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      <div className="text-center mt-12 space-y-2">
        <p className="text-zinc-500 text-sm">
          Total: <span className="text-white">35-40 heures</span> de contenu
          vidéo et exercices pratiques
        </p>
        <p className="text-emerald-400 text-sm">
          Module 1 gratuit • Modules 2-6 à €49 • Tous les modules à €99
        </p>
      </div>
    </Section>
  );
}

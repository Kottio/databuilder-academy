import { ExternalLink, Github, FileText } from "lucide-react";
import type { LessonResource } from "@/types/course";

interface LessonResourcesProps {
  resources: string;
}

const iconMap = {
  github: Github,
  notion: FileText,
  link: ExternalLink,
};

export function LessonResources({ resources }: LessonResourcesProps) {
  const parsed: LessonResource[] = JSON.parse(resources);
  if (!parsed || parsed.length === 0) return null;

  return (
    <div className="mb-8 space-y-3">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
        Ressources
      </h3>
      <div className="flex flex-wrap gap-2">
        {parsed.map((resource) => {
          const Icon = iconMap[resource.type] || ExternalLink;
          return (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-700/40 hover:border-zinc-600 rounded-lg transition-all group"
            >
              <Icon
                size={16}
                className="text-zinc-500 group-hover:text-emerald-400 transition-colors"
              />
              <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                {resource.title}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

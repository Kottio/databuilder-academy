import { Section, SectionHeader } from "@/app/components/ui/Section";
import { ArrowRight, Database, BarChart3, Cloud, Code } from "lucide-react";

const steps = [
  {
    icon: Cloud,
    label: "Wisdom Wall API",
    description: "Source de données",
  },
  {
    icon: Code,
    label: "Python / dlt",
    description: "Pipeline d'ingestion",
  },
  {
    icon: Database,
    label: "PostgreSQL",
    description: "Data warehouse",
  },
  {
    icon: BarChart3,
    label: "Metabase",
    description: "Visualisation",
  },
];

export function Architecture() {
  return (
    <Section id="architecture">
      <SectionHeader
        title="Ce Que Tu Vas Construire"
        subtitle="Une stack data moderne, de l'API à la visualisation"
      />

      {/* Architecture flow */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-16">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-3 hover:border-emerald-500/50 transition-colors">
                <step.icon className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-white text-sm">
                  {step.label}
                </div>
                <div className="text-xs text-zinc-500">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="w-6 h-6 text-zinc-700 mx-4 hidden md:block" />
            )}
          </div>
        ))}
      </div>

      {/* IMAGE PLACEHOLDER: Architecture diagram */}
      <div className="max-w-4xl mx-auto">
        <div className="aspect-[16/9] bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <p className="text-zinc-500 text-sm">
                Diagramme d&apos;architecture complet
              </p>
              <p className="text-zinc-600 text-xs mt-2">
                Wisdom Wall → dlt → PostgreSQL → Metabase
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

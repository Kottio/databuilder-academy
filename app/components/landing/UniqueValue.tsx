import { Section, SectionHeader } from "@/app/components/ui/Section";
import { Card } from "@/app/components/ui/Card";
import { Shield, BarChart3, Briefcase } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Vraie API de Production",
    description:
      "À partir du Module 2, tu travailles avec l'API réelle de Wisdom Wall. Auth, pagination, rate limits—exactement comme dans le monde réel.",
  },
  {
    icon: BarChart3,
    title: "Contexte Business Réel",
    description:
      "Métriques SaaS, KPIs, dashboards clients. Les mêmes données que mes clients utilisent en production.",
  },
  {
    icon: Briefcase,
    title: "Portfolio Crédible",
    description:
      "Montre de vrais projets en entretien, pas des tutorials Titanic ou Iris. Des compétences qui comptent.",
  },
];

export function UniqueValue() {
  return (
    <Section id="value" dark>
      <SectionHeader
        title="Pas de Datasets Kaggle. De Vraies Données de Production."
        subtitle="À partir du Module 2, tu travailles avec l'API réelle de Wisdom Wall—les mêmes données que mes clients B2B SaaS utilisent en production."
      />

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {benefits.map((benefit) => (
          <Card key={benefit.title} hover>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <benefit.icon className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {benefit.title}
            </h3>
            <p className="text-zinc-400">{benefit.description}</p>
          </Card>
        ))}
      </div>

      {/* Image placeholders */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* IMAGE PLACEHOLDER: Wisdom Wall dashboard screenshot */}
        <div className="aspect-video bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-zinc-500" />
              </div>
              <p className="text-zinc-500 text-sm">
                Screenshot: Dashboard Wisdom Wall
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE PLACEHOLDER: API response JSON or Swagger docs */}
        <div className="aspect-video bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="font-mono text-xs text-emerald-400 bg-zinc-900 rounded p-4 text-left">
                <div className="text-zinc-500">{"// API Response"}</div>
                <div>{"{"}</div>
                <div className="pl-4">
                  {'"data": ['}
                  <span className="text-zinc-500">...</span>
                  {"],"}
                </div>
                <div className="pl-4">{'"meta": { "total": 1234 }'}</div>
                <div>{"}"}</div>
              </div>
              <p className="text-zinc-500 text-sm mt-3">
                Screenshot: API Response JSON
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

import { Section, SectionHeader } from "@/app/components/ui/Section";
import { Button } from "@/app/components/ui/Button";
import { Check, Star, Zap, Youtube } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  cta: string;
  href: string;
  popular?: boolean;
  icon?: typeof Star;
  note?: string;
}

const tiers: PricingTier[] = [
  {
    name: "Gratuit",
    price: "€0",
    description: "Module 1 seulement (2h)",
    features: [
      "Git, Bash, Docker, Python basics",
      "VS Code configuration",
      "Parcours structuré + exercices",
      "Aussi disponible sur YouTube",
    ],
    notIncluded: ["Pas d'accès Wisdom Wall"],
    cta: "Commencer Gratuitement",
    href: "/signup",
  },
  {
    name: "Basic",
    price: "€49",
    description: "Modules 1-6 (25-30h)",
    features: [
      "Tout le contenu gratuit +",
      "Accès API Wisdom Wall",
      "Docker + Postgres + Metabase",
      "Pipelines dlt complets",
      "Dashboards & automatisation",
      "Support par commentaires",
    ],
    cta: "Acheter Basic",
    href: "/signup?plan=basic",
    popular: true,
    icon: Star,
    note: "Commence gratuit, upgrade quand tu veux",
  },
  {
    name: "Premium",
    price: "€99",
    description: "Tous modules 1-8 (35-40h)",
    features: [
      "Tout Basic +",
      "dbt transformations (Module 7)",
      "Cloud deployment DigitalOcean (Module 8)",
      "Accès à vie + updates",
      "Support prioritaire",
    ],
    cta: "Acheter Premium",
    href: "/signup?plan=premium",
    icon: Zap,
    note: "Économise €10 vs upgrade later",
  },
];

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`relative bg-zinc-900 rounded-2xl p-8 ${
        tier.popular
          ? "border-2 border-emerald-500 shadow-lg shadow-emerald-500/10"
          : "border border-zinc-800"
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-emerald-500 text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1">
            <Star size={14} fill="white" />
            Plus Populaire
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white">{tier.price}</span>
          {tier.price !== "€0" && (
            <span className="text-zinc-500">une fois</span>
          )}
        </div>
        <p className="text-zinc-400 mt-2">{tier.description}</p>
      </div>

      <ul className="space-y-3 mb-6">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-zinc-300">{feature}</span>
          </li>
        ))}
        {tier.notIncluded?.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5 text-center">
              —
            </span>
            <span className="text-zinc-500">{feature}</span>
          </li>
        ))}
      </ul>

      {tier.name === "Gratuit" && (
        <div className="flex items-center justify-center gap-2 text-red-400 text-sm mb-4">
          <Youtube size={16} />
          <span>Vidéos aussi sur YouTube</span>
        </div>
      )}

      <Button
        href={tier.href}
        variant={tier.popular ? "primary" : "secondary"}
        className="w-full"
      >
        {tier.cta}
      </Button>

      {tier.note && (
        <p className="text-center text-zinc-500 text-sm mt-4">{tier.note}</p>
      )}
    </div>
  );
}

export function Pricing() {
  return (
    <Section id="pricing" dark>
      <SectionHeader
        title="Commence Gratuit, Upgrade Quand Tu Es Prêt"
        subtitle="Pas d'abonnement. Paye une fois, accès permanent."
      />

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>

      <div className="text-center mt-12 space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-emerald-400 text-sm">
            Accès Wisdom Wall inclus dans Basic et Premium
          </span>
        </div>
        <p className="text-zinc-500">30 jours satisfait ou remboursé</p>
      </div>
    </Section>
  );
}

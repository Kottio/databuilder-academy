import { Section, SectionHeader } from "@/app/components/ui/Section";
import { Button } from "@/app/components/ui/Button";
import { Check, Star, Zap } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
  icon?: typeof Star;
}

const tiers: PricingTier[] = [
  {
    name: "Gratuit",
    price: "€0",
    description: "Découvre le cours",
    features: [
      "Module 1 complet",
      "Setup environnement dev",
      "Accès API Wisdom Wall",
      "Support communauté",
    ],
    cta: "Démarrer",
    href: "/signup?plan=free",
  },
  {
    name: "Basic",
    price: "€99",
    description: "Le parcours complet",
    features: [
      "Modules 1-6",
      "Docker, pipelines, dashboards",
      "Orchestration & automation",
      "Accès données Wisdom Wall",
      "Support prioritaire",
    ],
    cta: "Acheter Basic",
    href: "/signup?plan=basic",
    popular: true,
    icon: Star,
  },
  {
    name: "Premium",
    price: "€199",
    description: "Tout inclus + cloud",
    features: [
      "Tous les modules (1-8)",
      "dbt transformations",
      "Cloud deployment",
      "Accès à vie + updates",
      "Support prioritaire",
      "Certificat de completion",
    ],
    cta: "Acheter Premium",
    href: "/signup?plan=premium",
    icon: Zap,
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
            Populaire
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

      <ul className="space-y-3 mb-8">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={tier.href}
        variant={tier.popular ? "primary" : "secondary"}
        className="w-full"
      >
        {tier.cta}
      </Button>
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
            Données Wisdom Wall incluses dans tous les tiers
          </span>
        </div>
        <p className="text-zinc-500">30 jours satisfait ou remboursé</p>
      </div>
    </Section>
  );
}

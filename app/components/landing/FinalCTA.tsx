import { Section } from "@/app/components/ui/Section";
import { Button } from "@/app/components/ui/Button";
import { ArrowRight, Shield } from "lucide-react";

export function FinalCTA() {
  return (
    <Section dark>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Prêt à Construire avec de
          <br />
          <span className="text-emerald-400">Vraies Données de Production ?</span>
        </h2>

        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          Accède à l&apos;API Wisdom Wall et construis des pipelines de données
          professionnels dès aujourd&apos;hui.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button href="/signup?plan=basic" size="lg">
            Acheter Basic (€49)
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button href="/signup?plan=premium" variant="secondary" size="lg">
            Acheter Premium (€99)
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-zinc-400 mb-8">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span className="text-sm">30 jours satisfait ou remboursé</span>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-sm">ou</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <p className="text-zinc-500">
          Pas encore sûr ?{" "}
          <a
            href="/signup"
            className="text-emerald-400 hover:underline"
          >
            Essaye Module 1 gratuitement
          </a>{" "}
          pour tester ma pédagogie.
        </p>
      </div>
    </Section>
  );
}

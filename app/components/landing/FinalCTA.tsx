import { Section } from "@/app/components/ui/Section";
import { Button } from "@/app/components/ui/Button";
import { ArrowRight, Play } from "lucide-react";

export function FinalCTA() {
  return (
    <Section dark>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Arrête d&apos;Apprendre sur des Datasets Jouets.
          <br />
          <span className="text-emerald-400">
            Construis avec de Vraies Données.
          </span>
        </h2>

        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Le Module 1 est gratuit. Setup ton environnement, connecte-toi à
          l&apos;API Wisdom Wall, et décide si ce cours est fait pour toi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/signup" size="lg">
            Démarrer Gratuitement
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button href="#curriculum" variant="ghost" size="lg">
            <Play className="w-5 h-5" />
            Voir le Programme
          </Button>
        </div>

        <p className="text-zinc-600 text-sm mt-8">
          Pas de carte bancaire requise pour le tier gratuit
        </p>
      </div>
    </Section>
  );
}

import { Button } from "@/app/components/ui/Button";
import { Check } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-zinc-950 to-zinc-950" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-500/5 blur-3xl rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">
                Accès immédiat aux données Wisdom Wall
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              De Débutant à{" "}
              <span className="text-emerald-400">Data Engineer</span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8 max-w-xl">
              Apprends à construire des pipelines de données professionnels meme
              si tu n&apos;as jamais codé.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button href="#pricing" size="lg">
                Acheter le Cours (€49)
              </Button>
              <Button href="#curriculum" variant="ghost" size="lg">
                Voir le Programme
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-emerald-500" />
                <span>Accès API Wisdom Wall</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-emerald-500" />
                <span>30 jours satisfait ou remboursé</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-emerald-500" />
                <span>Accès à vie</span>
              </div>
            </div>

            <p className="text-zinc-500 text-sm mt-4">
              Pas sûr ?{" "}
              <a href="/signup" className="text-emerald-400 hover:underline">
                Essaye Module 1 gratuitement
              </a>
            </p>
          </div>

          {/* Right content - Image placeholder */}
          <div className="relative">
            {/* IMAGE PLACEHOLDER: Hero image - dashboard screenshot or before/after comparison */}
            <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm">
                    Dashboard Metabase avec données Wisdom Wall
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-xl">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-zinc-400">Modules</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-xl">
              <div className="text-2xl font-bold text-emerald-400">€49</div>
              <div className="text-sm text-zinc-400">Cours complet</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

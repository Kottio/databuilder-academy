import { Section } from "@/app/components/ui/Section";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const credentials = [
  "MSc Business Analytics, ESADE",
  "Software Engineering Bootcamp",
  "15+ projets pour startups €1-5M ARR",
  "10K+ followers TikTok/YouTube",
];

export function Instructor() {
  return (
    <Section id="instructor">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Image and partner */}
        <div className="space-y-8">
          {/* IMAGE PLACEHOLDER: Tom's professional headshot */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-zinc-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm">Photo professionnelle</p>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE PLACEHOLDER: Wisdom Wall logo */}
          <div className="flex items-center justify-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
              <span className="text-zinc-500 font-bold text-xs">WW</span>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Partenaire officiel</p>
              <p className="text-white font-semibold">Wisdom Wall</p>
            </div>
          </div>
        </div>

        {/* Right - Bio */}
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-emerald-400 text-sm font-medium">
              Ton instructeur
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Construit par un Consultant Data Qui Livre Ça pour ses Clients
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-1">
              Tom Berton
            </h3>
            <p className="text-emerald-400">
              Consultant Data Freelance | Full Stack Data Builder
            </p>
          </div>

          <p className="text-lg text-zinc-400 mb-6">
            Je livre des projets{" "}
            <span className="text-white">Analytical Sprint à €6-8K</span> pour
            des startups B2B SaaS. Ce cours enseigne exactement ce que je
            construis pour mes clients—avec les vraies données de Wisdom Wall.
          </p>

          <ul className="space-y-3">
            {credentials.map((credential) => (
              <li key={credential} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-zinc-300">{credential}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

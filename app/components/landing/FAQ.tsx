"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/app/components/ui/Section";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "C'est quoi Wisdom Wall exactement ?",
    answer:
      "Wisdom Wall est une vraie plateforme SaaS B2B qui collecte et analyse des données de feedback utilisateur. Dans ce cours, tu travailles avec leur API de production—mêmes endpoints, même authentification, mêmes données que leurs vrais clients utilisent.",
  },
  {
    question: "Faut-il être développeur pour suivre ce cours ?",
    answer:
      "Non, mais tu dois être à l'aise avec les bases : ligne de commande, un peu de Python, et SQL basique. Si tu sais écrire un SELECT avec un WHERE, tu peux suivre. Le Module 1 gratuit te permet de tester si le niveau te convient.",
  },
  {
    question: "Combien de temps pour finir le cours ?",
    answer:
      "Le parcours complet représente 50+ heures de contenu. À raison de 5-10h par semaine, compte 2-3 mois pour tout terminer. Tu gardes l'accès à vie, donc tu avances à ton rythme.",
  },
  {
    question: "Mon entreprise peut-elle rembourser le cours ?",
    answer:
      "Oui ! Le cours est éligible au budget formation de la plupart des entreprises. On fournit une facture professionnelle avec tous les détails nécessaires. Contacte-nous si tu as besoin d'un devis personnalisé.",
  },
];

function FAQItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-emerald-400 transition-colors"
      >
        <span className="text-lg font-medium text-white pr-8">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-zinc-400 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <Section id="faq">
      <SectionHeader
        title="Questions Fréquentes"
        subtitle="Tout ce que tu dois savoir avant de commencer"
      />

      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} item={faq} />
        ))}
      </div>
    </Section>
  );
}

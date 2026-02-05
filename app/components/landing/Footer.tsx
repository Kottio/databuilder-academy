import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  cours: [
    { label: "Programme", href: "#curriculum" },
    { label: "Tarifs", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  ressources: [
    { label: "Documentation", href: "#" },
    { label: "API Wisdom Wall", href: "#" },
    { label: "Support", href: "#" },
  ],
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "CGV", href: "#" },
    { label: "Confidentialité", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 rounded-full bg-white overflow-hidden shrink-0">
                <Image
                  src="/kottioDev/face.PNG"
                  alt="kottioDev"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold text-white uppercase tracking-wide">
                Kottio.Dev
              </span>
            </Link>
            <p className="text-zinc-500 text-sm">
              Full Stack Data Builder Academy
              <br />
              Apprends la data engineering avec de vraies données.
            </p>
          </div>

          {/* Cours */}
          <div>
            <h4 className="text-white font-semibold mb-4">Cours</h4>
            <ul className="space-y-2">
              {footerLinks.cours.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Kottio.Dev. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://youtube.com/@kottiodev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://tiktok.com/@kottiodev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

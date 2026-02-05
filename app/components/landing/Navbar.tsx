"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Programme", href: "#curriculum" },
  { label: "Tarifs", href: "#pricing" },
  { label: "Instructeur", href: "#instructor" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Connexion
            </Link>
            <Button href="#pricing" size="sm">
              Acheter
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
                <Link
                  href="/login"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Connexion
                </Link>
                <Button href="#pricing" className="w-full">
                  Acheter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

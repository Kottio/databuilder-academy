"use client";

import Link from "next/link";
import { LayoutDashboard, ArrowLeft } from "lucide-react";

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#161820] border-r border-zinc-800/60 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800/60">
        <h1 className="text-lg font-bold text-emerald-400">Admin Panel</h1>
        <p className="text-xs text-zinc-500">DataBuilder Academy</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-800/40"
        >
          <LayoutDashboard size={18} />
          <span className="font-medium">Dashboard</span>
        </Link>
      </nav>

      {/* Retour plateforme */}
      <div className="p-4 border-t border-zinc-800/60">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Retour plateforme</span>
        </Link>
      </div>
    </aside>
  );
}

"use client";

import { useSession, signOut } from "@/app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1117]">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Redirecting...
  }

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Top Navigation */}
      <nav className="border-b border-zinc-800/60 bg-[#161820]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="text-xl font-bold text-emerald-400">
              Data Builder Academy
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                Dashboard
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500">
                  {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-zinc-500 hover:text-red-400 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

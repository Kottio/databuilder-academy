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
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Redirecting...
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Top Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="text-xl font-bold">
              Data Builder Academy
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                Dashboard
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
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

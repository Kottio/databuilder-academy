"use client";

import { signUp, signIn } from "@/app/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();

      const { error: signUpError } = await signUp.email({
        name: name.trim(),
        email: normalizedEmail,
        password,
      });

      if (signUpError) {
        if (signUpError.message?.includes("already exists")) {
          setError("An account with this email already exists");
        } else {
          setError(signUpError.message || "Failed to create account");
        }
        return;
      }

      // Sign in immediately after signup to establish session
      const { error: signInError } = await signIn.email({
        email: normalizedEmail,
        password,
      });

      if (signInError) {
        // Account created but couldn't sign in - redirect to login
        router.push("/login");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-bold text-center text-white mb-2">
        Join Data Builder Academy
      </h1>
      <p className="text-zinc-400 text-center text-sm mb-6">
        Start your data engineering journey today
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="••••••••"
          />
          <p className="text-xs text-zinc-500 mt-1">
            Must be at least 8 characters
          </p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-400 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

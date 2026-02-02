import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Full Stack Data Builder Academy
        </h1>

        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
          Learn to build production-ready data pipelines with Docker, APIs, and modern data tools
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Get Started
          </Link>

          <Link
            href="/courses/full-stack-data-builder"
            className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium rounded-lg"
          >
            View Course
          </Link>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-6">
          Module 1 is free • Full course: €99
        </p>
      </div>
    </div>
  );
}

import { getLockedContentStats } from "@/app/lib/progress";
import type { CoursePageResponse } from "@/types/course";

interface UpgradeCardProps {
  lockedModules: CoursePageResponse["course"]["modules"];
  price: number;
}

export function UpgradeCard({ lockedModules, price }: UpgradeCardProps) {
  const { lessonCount, hours, highlights } = getLockedContentStats(lockedModules);

  return (
    <div
      id="upgrade-card"
      className="my-8 rounded-lg border border-emerald-800/40 bg-gradient-to-b from-emerald-950/40 to-[#161820] p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-2">
        Unlock the full course
      </h2>
      <p className="text-zinc-400 mb-5">
        Continue beyond the free module and get access to everything.
      </p>

      <ul className="space-y-2.5 mb-6">
        {highlights.map((text, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <span className="text-emerald-400 mt-0.5">✓</span>
            {text}
          </li>
        ))}
        <li className="flex items-start gap-2.5 text-sm text-zinc-300">
          <span className="text-emerald-400 mt-0.5">✓</span>
          {lessonCount} more lessons
          {hours > 0 && <>, {hours}+ hours of content</>}
        </li>
      </ul>

      <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors">
        Get Full Access — €{(price / 100).toFixed(0)}
      </button>
    </div>
  );
}

export function LessonSkeleton() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-80 border-r border-zinc-800/60 bg-[#161820] p-4 pt-20">
        <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse mb-6" />
        <div className="h-5 w-40 bg-zinc-800 rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-zinc-800 rounded animate-pulse" />
          ))}
        </div>
      </aside>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="h-8 w-72 bg-zinc-800 rounded animate-pulse mb-6" />
          <div className="aspect-video bg-zinc-800 rounded-lg animate-pulse mb-8" />
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-zinc-800/60">
            <div className="h-5 w-36 bg-zinc-800 rounded animate-pulse" />
            <div className="flex gap-3">
              <div className="h-9 w-28 bg-zinc-800 rounded animate-pulse" />
              <div className="h-9 w-28 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-zinc-800 rounded animate-pulse"
                style={{ width: `${85 - i * 8}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

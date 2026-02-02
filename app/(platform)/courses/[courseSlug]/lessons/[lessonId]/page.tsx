"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { getLessonById } from "@/app/data/courses";
import { LessonSidebar } from "@/app/components/lesson/LessonSidebar";
import { MarkdownContent } from "@/app/components/lesson/MarkdownContent";

export default function LessonViewerPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;
  const lessonId = params.lessonId as string;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completed, setCompleted] = useState(false);

  // Get lesson data
  const lessonData = getLessonById(lessonId);

  if (!lessonData) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p>Lesson not found</p>
      </div>
    );
  }

  const { course, module, lesson } = lessonData;

  // TODO: Get from database
  const completedLessonIds = ["lesson-1", "lesson-2"];
  const isEnrolled = false;

  const handleMarkComplete = () => {
    setCompleted(!completed);
    // TODO: Save to database
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-y-auto transition-all`}
      >
        {sidebarOpen && (
          <LessonSidebar
            courseSlug={courseSlug}
            modules={course.modules}
            currentLessonId={lessonId}
            isEnrolled={isEnrolled}
            completedLessonIds={completedLessonIds}
          />
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Breadcrumb */}
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            {module.title} / {lesson.title}
          </div>

          {/* Lesson Title */}
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            {lesson.title}
          </h1>

          {/* Video Player */}
          <div className="aspect-video bg-zinc-900 rounded-lg overflow-hidden mb-8">
            <iframe
              src={lesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Lesson Actions */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={completed}
                onChange={handleMarkComplete}
                className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">Mark as complete</span>
            </label>

            <div className="flex gap-3">
              <button className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium">
                ← Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium">
                Next Lesson →
              </button>
            </div>
          </div>

          {/* Lesson Content (Markdown) */}
          <div className="mb-8">
            {lesson.content && <MarkdownContent content={lesson.content} />}
          </div>

          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-semibold mb-4">Resources</h2>
              <div className="space-y-3">
                {lesson.resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-700"
                  >
                    <span className="text-lg">
                      {resource.type === "download"
                        ? "📥"
                        : resource.type === "github"
                        ? "💻"
                        : "🔗"}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{resource.title}</div>
                      {resource.description && (
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                          {resource.description}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800"
      >
        <span className="text-lg">{sidebarOpen ? "◀" : "▶"}</span>
      </button>
    </div>
  );
}

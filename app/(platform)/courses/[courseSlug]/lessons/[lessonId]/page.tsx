"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LessonSidebar } from "@/app/components/lesson/LessonSidebar";
import { MarkdownContent } from "@/app/components/lesson/MarkdownContent";
import { fetcher } from "@/app/lib/fetcher";
import type { CoursePageResponse, LessonPageResponse } from "@/types/course";

export default function LessonViewerPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;
  const lessonId = params.lessonId as string;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completed, setCompleted] = useState(false);

  const {
    data: courseData,
    isLoading: courseLoading,
    error: courseError,
  } = useSWR<CoursePageResponse>(`/api/me/courses/${courseSlug}`, fetcher);

  const {
    data: lessonData,
    isLoading: lessonLoading,
    error: lessonError,
  } = useSWR<LessonPageResponse>(`/api/me/lessons/${lessonId}`, fetcher);

  if (courseLoading || lessonLoading) {
    return <div className="p-8 text-zinc-400">Loading...</div>;
  }

  if (courseError || lessonError || !courseData || !lessonData) {
    return <div className="p-8 text-red-400">Error loading lesson</div>;
  }

  const { lesson } = lessonData;

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
        } border-r border-zinc-800/60 bg-[#161820] overflow-y-auto transition-all`}
      >
        {sidebarOpen && (
          <LessonSidebar course={courseData} currentLessonId={lessonId} />
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Breadcrumb */}
          <div className="text-sm text-zinc-500 mb-4">
            {lesson.module.title} / {lesson.title}
          </div>

          {/* Lesson Title */}
          <h1 className="text-3xl font-bold text-white mb-6">
            {lesson.title}
          </h1>

          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-8 border border-zinc-800/60">
            <iframe
              src={lesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Lesson Actions */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-zinc-800/60">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={completed}
                onChange={handleMarkComplete}
                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-zinc-300">Mark as complete</span>
            </label>

            <div className="flex gap-3">
              <button className="px-4 py-2 border border-zinc-700 rounded hover:bg-zinc-800 text-sm font-medium text-zinc-300 transition-colors">
                ← Previous
              </button>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-sm font-medium transition-colors">
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
            <div className="bg-[#161820] rounded-lg border border-zinc-800/60 p-6">
              <h2 className="text-lg font-semibold text-zinc-200 mb-4">Resources</h2>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-10 bg-[#161820] border border-zinc-800/60 rounded-lg p-2 shadow-lg hover:bg-zinc-800 transition-colors"
      >
        <span className="text-lg text-zinc-400">{sidebarOpen ? "◀" : "▶"}</span>
      </button>
    </div>
  );
}

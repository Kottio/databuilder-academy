"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LessonSidebar } from "@/app/components/lesson/LessonSidebar";
import { MarkdownContent } from "@/app/components/lesson/MarkdownContent";
import { fetcher } from "@/app/lib/fetcher";
import { getLessonNavigation } from "@/app/lib/lesson";
import type { CoursePageResponse, LessonPageResponse } from "@/types/course";
import { LessonActions } from "@/app/components/lesson/LessonActions";

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

  // TODO: If in the page where No paid access got To CTA.
  if (courseError || lessonError || !courseData || !lessonData) {
    return <div className="p-8 text-red-400">No access</div>;
  }

  const { lesson } = lessonData;

  const { previous, next } = getLessonNavigation(
    courseData.course.modules,
    lessonId,
  );

  const handleMarkComplete = () => {
    setCompleted(!completed);
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
          <h1 className="text-3xl font-bold text-white mb-6">{lesson.title}</h1>

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
          <LessonActions
            previous={previous}
            next={next}
            courseSlug={courseSlug}
            handleMarkComplete={handleMarkComplete}
            completed={completed}
          ></LessonActions>

          {/* Lesson Content (Markdown) */}
          <div className="mb-8">
            {lesson.content && <MarkdownContent content={lesson.content} />}
          </div>

          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="bg-[#161820] rounded-lg border border-zinc-800/60 p-6">
              <h2 className="text-lg font-semibold text-zinc-200 mb-4">
                Resources
              </h2>
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

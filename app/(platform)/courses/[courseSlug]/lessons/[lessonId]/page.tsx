"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { LessonSidebar } from "@/app/components/lesson/LessonSidebar";
import { LessonSkeleton } from "@/app/components/lesson/LessonSkeleton";
import { MarkdownContent } from "@/app/components/lesson/MarkdownContent";
import { fetcher } from "@/app/lib/fetcher";
import { getLessonNavigation } from "@/app/lib/lesson";
import type { CoursePageResponse, LessonPageResponse } from "@/types/course";
import { LessonActions } from "@/app/components/lesson/LessonActions";
import { LessonResources } from "@/app/components/lesson/LessonResources";

export default function LessonViewerPage() {
  const params = useParams();
  const courseSlug = params.courseSlug as string;
  const lessonId = params.lessonId as string;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLocally, setCompletedLocally] = useState<boolean | null>(
    null,
  );

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
    return <LessonSkeleton />;
  }

  // TODO: If in the page where No paid access got To CTA.
  if (courseError || lessonError || !courseData || !lessonData) {
    return <div className="p-8 text-red-400">No access</div>;
  }

  const { previous, next } = getLessonNavigation(
    courseData.course.modules,
    lessonId,
  );
  const { lesson } = lessonData;
  const completed = completedLocally ?? lesson.progress?.completed ?? false;

  const handleMarkComplete = async () => {
    const newValue = !completed;
    setCompletedLocally(newValue);
    await fetch(`/api/me/lessons/${lessonId}/progress`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newValue }),
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } border-r border-zinc-800/60 bg-[#161820] overflow-y-auto transition-all`}
      >
        {sidebarOpen && (
          <LessonSidebar course={courseData} currentLessonId={lessonId} />
        )}
      </aside>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-sm text-zinc-500 mb-4">
            {lesson.module.title} / {lesson.title}
          </div>

          <h1 className="text-3xl font-bold text-white mb-6">{lesson.title}</h1>

          {lesson.videoUrl && (
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-8 border border-zinc-800/60">
              <iframe
                src={getYouTubeEmbedUrl(lesson.videoUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <LessonActions
            previous={previous}
            next={next}
            courseSlug={courseSlug}
            handleMarkComplete={handleMarkComplete}
            completed={completed}
          />

          {lesson.resources && lesson.resources.length > 0 && (
            <LessonResources resources={lesson.resources} />
          )}

          {lesson.content && (
            <div className="mb-8">
              <MarkdownContent content={lesson.content} />
            </div>
          )}

          <div className="mt-10">
            <LessonActions
              previous={previous}
              next={next}
              courseSlug={courseSlug}
              handleMarkComplete={handleMarkComplete}
              completed={completed}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-10 bg-[#161820] border border-zinc-800/60 rounded-lg p-2 shadow-lg hover:bg-zinc-800 transition-colors"
      >
        {sidebarOpen ? (
          <PanelLeftClose size={18} className="text-zinc-400" />
        ) : (
          <PanelLeftOpen size={18} className="text-zinc-400" />
        )}
      </button>
    </div>
  );
}

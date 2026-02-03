import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { LessonPageResponse } from "@/types/course";

export function useLesson(lessonId: string) {
  const { data, error, isLoading, mutate } = useSWR<LessonPageResponse>(
    `/api/me/lessons/${lessonId}`,
    fetcher,
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

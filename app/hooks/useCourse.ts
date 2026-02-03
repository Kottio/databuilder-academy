import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { CoursePageResponse } from "@/types/course";

export function useCourse(courseSlug: string) {
  const { data, error, isLoading, mutate } = useSWR<CoursePageResponse>(
    `/api/me/courses/${courseSlug}`,
    fetcher,
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

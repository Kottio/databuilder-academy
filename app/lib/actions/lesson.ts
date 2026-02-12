"use server";

import prisma from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin";
import { revalidatePath } from "next/cache";

export async function createLesson(
  moduleId: string,
  data: {
    title: string;
    videoUrl: string;
    content: string;
    duration: number;
  },
) {
  await requireAdmin();
  const lastLesson = await prisma.lesson.findFirst({
    where: { moduleId },
    orderBy: { order: "desc" },
  });
  const nextOrder = (lastLesson?.order ?? 0) + 1;

  const lesson = await prisma.lesson.create({
    data: {
      moduleId,
      title: data.title,
      videoUrl: data.videoUrl,
      content: data.content,
      duration: data.duration,
      order: nextOrder,
    },
  });

  revalidatePath("/admin");
  return lesson;
}

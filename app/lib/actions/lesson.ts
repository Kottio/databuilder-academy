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
      videoUrl: data.videoUrl || "",
      content: data.content,
      duration: data.duration,
      order: nextOrder,
    },
  });

  revalidatePath("/admin");
  return lesson;
}

export async function updateLesson(
  lessonId: string,
  data: {
    title: string;
    videoUrl: string;
    content: string;
    duration: number;
  },
) {
  await requireAdmin();

  const updated = await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      title: data.title,
      videoUrl: data.videoUrl,
      content: data.content,
      duration: data.duration,
    },
  });

  revalidatePath("/admin");
  return updated;
}

export async function deleteLesson(lessonId: string) {
  await requireAdmin();

  await prisma.lesson.delete({
    where: { id: lessonId },
  });

  revalidatePath("/admin");
}

export async function swapLessonOrder(lessonId1: string, lessonId2: string) {
  await requireAdmin();

  const lesson1 = await prisma.lesson.findUnique({ where: { id: lessonId1 } });
  const lesson2 = await prisma.lesson.findUnique({ where: { id: lessonId2 } });

  if (!lesson1 || !lesson2) return;

  // Swap les orders
  await prisma.$transaction([
    prisma.lesson.update({
      where: { id: lessonId1 },
      data: { order: lesson2.order },
    }),
    prisma.lesson.update({
      where: { id: lessonId2 },
      data: { order: lesson1.order },
    }),
  ]);

  revalidatePath("/admin");
}

"use server";

import prisma from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin";

export async function getCourses() {
  await requireAdmin();

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  return courses;
}

export async function getCourseWithModules(courseId: string) {
  await requireAdmin();

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              duration: true,
              order: true,
            },
          },
        },
      },
    },
  });

  return course;
}

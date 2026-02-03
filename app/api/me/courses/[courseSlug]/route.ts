import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { courseSlug: string } },
) {
  const { courseSlug } = await params;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const student = await prisma.student.findUnique({
    where: { userId },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      studentId: student.id,
      course: { slug: courseSlug },
    },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: {
                orderBy: { order: "asc" },
                include: {
                  progress: {
                    where: { studentId: student.id },
                  },
                },
              },
            },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });
  if (!enrollment) {
    return NextResponse.json(
      { error: "Not enrolled in this course" },
      { status: 403 },
    );
  }

  return NextResponse.json({
    course: {
      id: enrollment.course.id,
      title: enrollment.course.title,
      slug: enrollment.course.slug,
      description: enrollment.course.description,
      price: enrollment.course.price,
      modules: enrollment.course.modules.map((module) => ({
        id: module.id,
        title: module.title,
        description: module.description,
        order: module.order,
        accessTier: module.accessTier,
        lessons: module.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration,
          order: lesson.order,
          progress: lesson.progress[0] || null, // Flatten from array
        })),
      })),
    },
    accessType: enrollment.accessType,
    status: enrollment.status,
  });
}

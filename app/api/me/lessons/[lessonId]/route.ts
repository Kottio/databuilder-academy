import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { lessonId: string } },
) {
  const { lessonId } = await params;

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

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          course: true,
        },
      },
      progress: {
        where: { studentId: student.id },
      },
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  // Check if user has access to this lesson
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      studentId: student.id,
      courseId: lesson.module.course.id,
    },
  });

  // User needs enrollment if module is not FREE
  const hasAccess =
    lesson.module.accessTier === "FREE" ||
    (enrollment && enrollment.accessType === "PAID");

  if (!hasAccess) {
    return NextResponse.json(
      { error: "You don't have access to this lesson" },
      { status: 403 },
    );
  }

  return NextResponse.json({
    lesson: {
      id: lesson.id,
      title: lesson.title,
      videoUrl: lesson.videoUrl,
      content: lesson.content,
      duration: lesson.duration,
      order: lesson.order,
      resources: lesson.resources,
      progress: lesson.progress[0] || null,
      module: {
        id: lesson.module.id,
        title: lesson.module.title,
        accessTier: lesson.module.accessTier,
      },
      course: {
        id: lesson.module.course.id,
        title: lesson.module.course.title,
        slug: lesson.module.course.slug,
      },
    },
    hasAccess,
    accessType: enrollment?.accessType || "FREE",
  });
}

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET(request: Request) {
  // Get user from session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: {
                    include: {
                      progress: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  // Extract just the courses from enrollments
  const data = student.enrollments.map((enrollment) => {
    return {
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
            progress: lesson.progress || null,
          })),
        })),
      },
      accessType: enrollment.accessType,
      status: enrollment.status,
    };
  });

  return NextResponse.json(data);
}

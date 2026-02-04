import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function PATCH(
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

  const body = await request.json();
  const { completed } = body;

  if (typeof completed !== "boolean") {
    return NextResponse.json(
      { error: "completed must be a boolean" },
      { status: 400 },
    );
  }

  const progress = await prisma.progress.upsert({
    where: {
      studentId_lessonId: {
        studentId: student.id,
        lessonId,
      },
    },
    create: {
      studentId: student.id,
      lessonId,
      completed,
      completedAt: completed ? new Date() : null,
    },
    update: {
      completed,
      completedAt: completed ? new Date() : null,
    },
  });

  return NextResponse.json({ progress });
}

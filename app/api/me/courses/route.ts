import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET(request: Request) {
  // Get user from session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      enrollments: {
        include: {
          course: true
        }
      }
    },
  });

  if (!student) {
    return NextResponse.json(
      { error: "Student not found" },
      { status: 404 }
    );
  }

  // Extract just the courses from enrollments
  const courses = student.enrollments.map(enrollment => enrollment.course);

  return NextResponse.json({ courses });
}

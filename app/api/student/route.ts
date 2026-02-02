import prisma from "@/app/lib/prisma";
export async function POST(req: Request) {
  const { userId } = await req.json();

  const student = await prisma.student.create({
    data: { userId },
  });
  const course = await prisma.course.findFirst({
    where: { published: true },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      accessType: "FREE",
      status: "ACTIVE",
    },
  });
  return Response.json({ success: true });
}

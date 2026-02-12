import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

async function createStudentWithRetry(
  userId: string,
  userName: string,
  maxRetries = 3,
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await prisma.$transaction(async (tx) => {
        const existing = await tx.student.findUnique({
          where: { userId },
        });
        if (existing) return;

        const student = await tx.student.create({
          data: { userId, name: userName || "Student" },
        });

        const course = await tx.course.findFirst({
          where: { published: true },
        });

        if (course) {
          await tx.enrollment.create({
            data: {
              studentId: student.id,
              courseId: course.id,
              accessType: "FREE",
              status: "ACTIVE",
            },
          });
        }
      });

      console.log(`✓ Student created for user ${userId}`);
      return;
    } catch (error) {
      console.error(
        `Attempt ${attempt}/${maxRetries} failed for user ${userId}:`,
        error,
      );
      if (attempt === maxRetries) {
        console.error(`❌ All retries failed for user ${userId}`);
      }
    }
  }
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createStudentWithRetry(user.id, user.name);
        },
      },
    },
  },
});

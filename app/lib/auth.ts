import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Create student + enrollment when a new user signs up
          try {
            await prisma.$transaction(async (tx) => {
              // Create student record
              const student = await tx.student.create({
                data: { userId: user.id },
              });

              // Find the first published course Here Have a different set up later
              const course = await tx.course.findFirst({
                where: { published: true },
              });

              // Create enrollment if there's a published course
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

            console.log(`✓ Student and enrollment created for user ${user.id}`);
          } catch (error) {
            console.error("Failed to create student/enrollment:", error);
            // Note: User account is already created at this point
            // You may want to implement cleanup or retry logic
          }
        },
      },
    },
  },
});

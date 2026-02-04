/*
  Warnings:

  - You are about to drop the column `createdAt` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `accessType` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `enrolledAt` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `accessTier` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `lastWatched` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_id,course_id]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_payment_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_id,lesson_id]` on the table `progress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module_id` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollment_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_courseId_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_courseId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_enrollmentId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "progress_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "progress_studentId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_userId_fkey";

-- DropIndex
DROP INDEX "enrollments_courseId_idx";

-- DropIndex
DROP INDEX "enrollments_studentId_courseId_key";

-- DropIndex
DROP INDEX "enrollments_studentId_idx";

-- DropIndex
DROP INDEX "lessons_moduleId_order_idx";

-- DropIndex
DROP INDEX "modules_courseId_order_idx";

-- DropIndex
DROP INDEX "payments_enrollmentId_idx";

-- DropIndex
DROP INDEX "payments_stripePaymentId_key";

-- DropIndex
DROP INDEX "payments_studentId_idx";

-- DropIndex
DROP INDEX "progress_lessonId_idx";

-- DropIndex
DROP INDEX "progress_studentId_completed_idx";

-- DropIndex
DROP INDEX "progress_studentId_idx";

-- DropIndex
DROP INDEX "progress_studentId_lessonId_key";

-- DropIndex
DROP INDEX "students_userId_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "createdAt",
DROP COLUMN "thumbnailUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "accessType",
DROP COLUMN "completedAt",
DROP COLUMN "courseId",
DROP COLUMN "enrolledAt",
DROP COLUMN "studentId",
DROP COLUMN "updatedAt",
ADD COLUMN     "access_type" "AccessType" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "createdAt",
DROP COLUMN "moduleId",
DROP COLUMN "updatedAt",
DROP COLUMN "videoUrl",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "module_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "video_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "accessTier",
DROP COLUMN "courseId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "access_tier" "AccessType" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "createdAt",
DROP COLUMN "enrollmentId",
DROP COLUMN "paidAt",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePaymentId",
DROP COLUMN "studentId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "enrollment_id" TEXT NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMP(3),
ADD COLUMN     "stripe_customer_id" TEXT,
ADD COLUMN     "stripe_payment_id" TEXT,
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "progress" DROP COLUMN "completedAt",
DROP COLUMN "createdAt",
DROP COLUMN "lastWatched",
DROP COLUMN "lessonId",
DROP COLUMN "studentId",
DROP COLUMN "updatedAt",
ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lesson_id" TEXT NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Data Padawan',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "enrollments_student_id_idx" ON "enrollments"("student_id");

-- CreateIndex
CREATE INDEX "enrollments_course_id_idx" ON "enrollments"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_student_id_course_id_key" ON "enrollments"("student_id", "course_id");

-- CreateIndex
CREATE INDEX "lessons_module_id_order_idx" ON "lessons"("module_id", "order");

-- CreateIndex
CREATE INDEX "modules_course_id_order_idx" ON "modules"("course_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripe_payment_id_key" ON "payments"("stripe_payment_id");

-- CreateIndex
CREATE INDEX "payments_student_id_idx" ON "payments"("student_id");

-- CreateIndex
CREATE INDEX "payments_enrollment_id_idx" ON "payments"("enrollment_id");

-- CreateIndex
CREATE INDEX "progress_student_id_idx" ON "progress"("student_id");

-- CreateIndex
CREATE INDEX "progress_lesson_id_idx" ON "progress"("lesson_id");

-- CreateIndex
CREATE INDEX "progress_student_id_completed_idx" ON "progress"("student_id", "completed");

-- CreateIndex
CREATE INDEX "progress_student_id_updated_at_idx" ON "progress"("student_id", "updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "progress_student_id_lesson_id_key" ON "progress"("student_id", "lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

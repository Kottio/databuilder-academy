"use server";

import prisma from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin";
import { revalidatePath } from "next/cache";

export async function createModule(
  courseId: string,
  data: {
    title: string;
    description?: string;
    accessTier: "FREE" | "PAID";
  }
) {
  await requireAdmin();

  // Trouver le prochain order
  const lastModule = await prisma.module.findFirst({
    where: { courseId },
    orderBy: { order: "desc" },
  });
  const nextOrder = (lastModule?.order ?? 0) + 1;

  const newModule = await prisma.module.create({
    data: {
      courseId,
      title: data.title,
      description: data.description || null,
      accessTier: data.accessTier,
      order: nextOrder,
    },
  });

  revalidatePath("/admin");
  return newModule;
}

export async function updateModule(
  moduleId: string,
  data: {
    title: string;
    description?: string;
    accessTier: "FREE" | "PAID";
  }
) {
  await requireAdmin();

  const updated = await prisma.module.update({
    where: { id: moduleId },
    data: {
      title: data.title,
      description: data.description || null,
      accessTier: data.accessTier,
    },
  });

  revalidatePath("/admin");
  return updated;
}

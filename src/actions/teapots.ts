"use server";

import { getDb } from "@/db";
import { teapots } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addTeapot(formData: FormData) {
  const name = formData.get("name") as string;
  const clayType = formData.get("clayType") as string;
  const maker = formData.get("maker") as string;
  const capacityMl = parseInt(formData.get("capacityMl") as string, 10);
  const description = formData.get("description") as string;

  try {
    const db = getDb();
    await db.insert(teapots).values({
      name,
      clayType,
      maker,
      capacityMl,
      description,
    });
    
    // Revalidate the home page so the new data appears immediately
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to add teapot", error);
    return { success: false, error: "無法新增資料庫，請確認開發環境或是網路連線" };
  }
}

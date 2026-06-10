"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { productSchema } from "@/lib/validations/product";
import { ProductService } from "@/services/product-service";

export async function createProductAction(formData: FormData) {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await ProductService.create(parsed.data);

  revalidatePath("/products");
}

export async function deleteProductAction(id: number) {

  await ProductService.delete(id);

  revalidatePath("/products");
}

export async function updateProductAction(id: number, formData: FormData) {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description") || undefined,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await ProductService.update(id, parsed.data);

  revalidatePath("/products");
}
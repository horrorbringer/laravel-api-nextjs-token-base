"use server";

import { apiFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { productSchema } from "@/lib/validations/product";

export async function createProductAction(formData: FormData) {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  revalidatePath("/products");
}

export async function deleteProductAction(id: number) {
  await apiFetch(`/products/${id}`, {
    method: "DELETE",
  });

  revalidatePath("/products");
}

export async function updateProductAction(
  id: number,
  formData: FormData
) {
  await apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
    }),
  });

  revalidatePath("/products");
}
"use client";
import { createProductAction } from "../actions/products";
import { productSchema } from "@/lib/validations/product";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateProductForm() {
  async function handleSubmit(formData: FormData) {
    const result = productSchema.safeParse({
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    await createProductAction(formData);
    toast.success("Product created successfully");
  }

  return (
    <form action={handleSubmit} className="grid gap-4">
      <Input name="name" placeholder="Product name" />

      <Input name="price" type="number" placeholder="Price" />

      <Textarea name="description" placeholder="Description" />

      <Button type="submit">
        Create
      </Button>
    </form>
  );
}
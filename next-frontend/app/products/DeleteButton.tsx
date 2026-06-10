
"use client";
import { deleteProductAction } from "../actions/products";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: number }) {
  async function handleDelete() {
    const ok = confirm("Delete this product?");

    if (!ok) return;

    await deleteProductAction(id);

    toast.success("Product deleted");
  }

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}
import { apiFetch } from "@/lib/api";
import EditProductForm from "./EditProductForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await apiFetch(`/products/${id}`);

  return (
    <EditProductForm product={product} />
  );
}
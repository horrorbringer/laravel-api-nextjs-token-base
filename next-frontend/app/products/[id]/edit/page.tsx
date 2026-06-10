import { apiFetch } from "@/lib/api";
import EditProductForm from "./EditProductForm";
import { Product } from "@/types/product";
import { ProductService } from "@/services/product-service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await ProductService.getById(id);

  const product = response.data;

  return (
    <EditProductForm product={product} />
  );
}
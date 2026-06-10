import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Product } from "@/types/product";
import { PaginatedResponse } from "@/types/pagination";
import CreateProductForm from "./CreateProductForm";
import DeleteButton from "./DeleteButton";
import SearchForm from "./SearchForm";
import { ProductService } from "@/services/product-service";
import Pagination from "./Pagination";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;


  const query = new URLSearchParams({
    search: params.search ?? "",
    page: params.page ?? "1",
  }).toString();

  const products = await ProductService.getAll(query);

  return (
    <div className="space-y-6">
      <CreateProductForm />

      <SearchForm defaultValue={params?.search} />

      <div className="rounded border">
        {products.data.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border-b p-4"
          >
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p>${product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>

            <div className="flex gap-2">
              <Link href={`/products/${product.id}/edit`}>
                Edit
              </Link>

              <DeleteButton id={product.id} />
            </div>
          </div>
        ))}
      </div>

       <Pagination
        currentPage={products.meta.current_page}
        lastPage={products.meta.last_page}
        search={params?.search}
      />

    </div>
  );
}
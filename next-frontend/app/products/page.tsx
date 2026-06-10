import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Product } from "@/types/product";
import { PaginatedResponse } from "@/types/pagination";
import CreateProductForm from "./CreateProductForm";
import DeleteButton from "./DeleteButton";
import SearchForm from "./SearchForm";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const search = params.search ?? "";
  const page = params.page ?? "1";

  const query = new URLSearchParams({
  search,
  page,
}).toString();

  const products: PaginatedResponse<Product> = await apiFetch(
    `/products?${query}`
  );

  return (
    <div className="space-y-6">
      <CreateProductForm />

      <SearchForm defaultValue={search} />

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

      <div className="flex gap-3">
        {products.prev_page_url && (
          <Link href={`/products?search=${search}&page=${Number(page) - 1}`}>
            Previous
          </Link>
        )}

        <span>
          Page {products.current_page} of {products.last_page}
        </span>

        {products.next_page_url && (
          <Link href={`/products?search=${search}&page=${Number(page) + 1}`}>
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
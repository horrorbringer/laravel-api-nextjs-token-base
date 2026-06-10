import { apiFetch } from "@/lib/api";
import { Product } from "@/types/product";
import { PaginatedResponse } from "@/types/pagination";

export const ProductService = {
  getAll(query: string) {
    return apiFetch<PaginatedResponse<Product>>(`/products?${query}`);
  },

  getById(id: string) {
    return apiFetch<{ data: Product }>(`/products/${id}`);
  },

  create(data: {
    name: string;
    price: number;
    description?: string;
  }) {
    return apiFetch<{ data: Product }>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(
    id: number,
    data: {
      name: string;
      price: number;
      description?: string;
    }
  ) {
    return apiFetch<{ data: Product }>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(id: number) {
    return apiFetch<{ message: string }>(`/products/${id}`, {
      method: "DELETE",
    });
  },
};
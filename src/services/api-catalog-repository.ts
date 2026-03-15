import type { CatalogSnapshot, ProductMutationInput } from "@/types/catalog";

import type { CatalogRepository } from "./catalog-repository";

export class ApiCatalogRepository implements CatalogRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getCatalog() {
    return this.request<CatalogSnapshot>("/catalog");
  }

  async createProduct(input: ProductMutationInput) {
    return this.request<CatalogSnapshot>("/products", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  async updateProduct(id: string, input: ProductMutationInput) {
    return this.request<CatalogSnapshot>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  }

  async deleteProduct(id: string) {
    return this.request<CatalogSnapshot>(`/products/${id}`, {
      method: "DELETE",
    });
  }

  private async request<T>(path: string, init?: RequestInit) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

    if (!response.ok) {
      throw new Error("ไม่สามารถเชื่อมต่อ backend catalog API ได้");
    }

    return (await response.json()) as T;
  }
}

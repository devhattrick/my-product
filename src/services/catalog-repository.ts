import type { CatalogSnapshot, ProductMutationInput } from "@/types/catalog";

export interface CatalogRepository {
  getCatalog(): Promise<CatalogSnapshot>;
  createProduct(input: ProductMutationInput): Promise<CatalogSnapshot>;
  updateProduct(id: string, input: ProductMutationInput): Promise<CatalogSnapshot>;
  deleteProduct(id: string): Promise<CatalogSnapshot>;
}

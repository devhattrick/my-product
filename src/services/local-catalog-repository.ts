import { createDefaultCatalog } from "@/data/mock-catalog";
import { slugify } from "@/lib/catalog";
import type { CatalogSnapshot, Category, Product, ProductMutationInput } from "@/types/catalog";

import type { CatalogRepository } from "./catalog-repository";

const STORAGE_KEY = "my-product/catalog";

function cloneSnapshot(snapshot: CatalogSnapshot): CatalogSnapshot {
  if (typeof structuredClone === "function") {
    return structuredClone(snapshot);
  }

  return JSON.parse(JSON.stringify(snapshot)) as CatalogSnapshot;
}

export class LocalCatalogRepository implements CatalogRepository {
  private readonly lineUrl: string;

  constructor(lineUrl: string) {
    this.lineUrl = lineUrl;
  }

  async getCatalog() {
    return cloneSnapshot(this.readCatalog());
  }

  async createProduct(input: ProductMutationInput) {
    const snapshot = this.readCatalog();
    const categoryId = this.ensureCategory(snapshot, input.categoryName);
    const now = new Date().toISOString();

    const nextProduct: Product = {
      id: crypto.randomUUID(),
      sku: input.sku.trim().toUpperCase(),
      name: input.name.trim(),
      categoryId,
      price: input.price,
      summary: input.summary.trim(),
      description: input.description.trim(),
      imageUrl: input.imageUrl.trim(),
      highlights: input.highlights.map((item) => item.trim()).filter(Boolean),
      featured: input.featured,
      createdAt: now,
      updatedAt: now,
    };

    snapshot.products = [nextProduct, ...snapshot.products];
    const nextSnapshot = this.cleanupCategories(snapshot);
    this.writeCatalog(nextSnapshot);

    return cloneSnapshot(nextSnapshot);
  }

  async updateProduct(id: string, input: ProductMutationInput) {
    const snapshot = this.readCatalog();
    const categoryId = this.ensureCategory(snapshot, input.categoryName);
    const targetProduct = snapshot.products.find((product) => product.id === id);

    if (!targetProduct) {
      throw new Error("ไม่พบสินค้าที่ต้องการแก้ไข");
    }

    snapshot.products = snapshot.products.map((product) =>
      product.id === id
        ? {
            ...product,
            sku: input.sku.trim().toUpperCase(),
            name: input.name.trim(),
            categoryId,
            price: input.price,
            summary: input.summary.trim(),
            description: input.description.trim(),
            imageUrl: input.imageUrl.trim(),
            highlights: input.highlights.map((item) => item.trim()).filter(Boolean),
            featured: input.featured,
            updatedAt: new Date().toISOString(),
          }
        : product,
    );

    const nextSnapshot = this.cleanupCategories(snapshot);
    this.writeCatalog(nextSnapshot);

    return cloneSnapshot(nextSnapshot);
  }

  async deleteProduct(id: string) {
    const snapshot = this.readCatalog();
    snapshot.products = snapshot.products.filter((product) => product.id !== id);

    const nextSnapshot = this.cleanupCategories(snapshot);
    this.writeCatalog(nextSnapshot);

    return cloneSnapshot(nextSnapshot);
  }

  private readCatalog() {
    const fallbackSnapshot = createDefaultCatalog(this.lineUrl);
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      this.writeCatalog(fallbackSnapshot);
      return fallbackSnapshot;
    }

    try {
      const parsedValue = JSON.parse(storedValue) as CatalogSnapshot;

      return {
        ...parsedValue,
        shop: {
          ...parsedValue.shop,
          lineUrl: this.lineUrl,
        },
      };
    } catch {
      this.writeCatalog(fallbackSnapshot);
      return fallbackSnapshot;
    }
  }

  private writeCatalog(snapshot: CatalogSnapshot) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }

  private ensureCategory(snapshot: CatalogSnapshot, categoryName: string) {
    const normalizedName = categoryName.trim() || "General";
    const matchedCategory = snapshot.categories.find(
      (category) => category.name.toLowerCase() === normalizedName.toLowerCase(),
    );

    if (matchedCategory) {
      return matchedCategory.id;
    }

    const nextCategory: Category = {
      id: crypto.randomUUID(),
      name: normalizedName,
      slug: this.buildUniqueSlug(snapshot, normalizedName),
      description: `หมวดหมู่ ${normalizedName}`,
    };

    snapshot.categories = [...snapshot.categories, nextCategory];

    return nextCategory.id;
  }

  private buildUniqueSlug(snapshot: CatalogSnapshot, value: string) {
    const baseSlug = slugify(value) || "category";
    const existingSlugs = new Set(snapshot.categories.map((category) => category.slug));

    if (!existingSlugs.has(baseSlug)) {
      return baseSlug;
    }

    let suffix = 2;
    while (existingSlugs.has(`${baseSlug}-${suffix}`)) {
      suffix += 1;
    }

    return `${baseSlug}-${suffix}`;
  }

  private cleanupCategories(snapshot: CatalogSnapshot) {
    const usedCategoryIds = new Set(snapshot.products.map((product) => product.categoryId));

    return {
      ...snapshot,
      categories: snapshot.categories.filter((category) => usedCategoryIds.has(category.id)),
      shop: {
        ...snapshot.shop,
        lineUrl: this.lineUrl,
      },
    };
  }
}

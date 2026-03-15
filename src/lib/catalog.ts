import { defaultLineUrl } from "@/lib/config";
import type { Category, Product } from "@/types/catalog";

export function formatPrice(price: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function resolveCategory(categories: Category[], categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function buildLineInquiryUrl(lineUrl: string, product: Product) {
  if (lineUrl === defaultLineUrl) {
    const message = encodeURIComponent(
      `สนใจสินค้า ${product.name} (${product.sku}) ราคา ${formatPrice(product.price)}`,
    );

    return `https://line.me/R/msg/text/?${message}`;
  }

  return lineUrl;
}

export function resolveAssetUrl(assetPath: string) {
  const normalizedPath = assetPath.trim();

  if (!normalizedPath) {
    return normalizedPath;
  }

  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://") ||
    normalizedPath.startsWith("//") ||
    normalizedPath.startsWith("data:") ||
    normalizedPath.startsWith("blob:")
  ) {
    return normalizedPath;
  }

  const baseUrl = import.meta.env.BASE_URL;
  const relativePath = normalizedPath.startsWith("/")
    ? normalizedPath.slice(1)
    : normalizedPath;

  return `${baseUrl}${relativePath}`;
}

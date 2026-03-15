import { Search } from "lucide-react";
import { useDeferredValue, useState } from "react";

import { ProductCard } from "@/components/catalog/product-card";
import { StoreHero } from "@/components/catalog/store-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCatalog } from "@/context/catalog-context";
import { resolveCategory } from "@/lib/catalog";

export function StorefrontPage() {
  const { catalog, isLoading, error } = useCatalog();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  if (isLoading || !catalog) {
    return (
      <div className="grid gap-6">
        <div className="h-80 animate-pulse rounded-[2rem] bg-white/70" />
        <div className="h-36 animate-pulse rounded-[2rem] bg-white/70" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-[32rem] animate-pulse rounded-[2rem] bg-white/70" />
          <div className="h-[32rem] animate-pulse rounded-[2rem] bg-white/70" />
        </div>
      </div>
    );
  }

  const searchValue = deferredSearchTerm.trim().toLowerCase();
  const selectedCategoryId =
    activeCategoryId === "all" || catalog.categories.some((category) => category.id === activeCategoryId)
      ? activeCategoryId
      : "all";
  const featuredCount = catalog.products.filter((product) => product.featured).length;
  const sortedProducts = catalog.products.toSorted((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    return left.price - right.price;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    const category = resolveCategory(catalog.categories, product.categoryId);
    const matchesCategory = selectedCategoryId === "all" || product.categoryId === selectedCategoryId;

    if (!matchesCategory) {
      return false;
    }

    if (!searchValue) {
      return true;
    }

    const searchableText = [
      product.name,
      product.sku,
      product.summary,
      product.description,
      category?.name ?? "",
      ...product.highlights,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchValue);
  });

  return (
    <div className="grid gap-8">
      <StoreHero
        brandName={catalog.shop.brandName}
        heroTitle={catalog.shop.heroTitle}
        heroDescription={catalog.shop.heroDescription}
        productCount={catalog.products.length}
        categoryCount={catalog.categories.length}
        featuredCount={featuredCount}
        onBrowse={() => document.getElementById("catalog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      <Card className="overflow-hidden border-white/80">
        <CardContent className="grid gap-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Badge variant="secondary">Product Filter</Badge>
              <h2 className="text-3xl font-semibold text-slate-950">ค้นหาและกรองสินค้าได้ทันที</h2>
              <p className="text-sm leading-6 text-slate-600">
                ผู้ใช้ไม่ต้อง login และสามารถเลือกหมวดหมู่หรือค้นหาจากชื่อสินค้า รายละเอียด
                และรหัสสินค้าได้เลย
              </p>
            </div>
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-11"
                placeholder="ค้นหาจากชื่อสินค้า หมวดหมู่ หรือรหัสสินค้า"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant={selectedCategoryId === "all" ? "default" : "outline"}
              onClick={() => setActiveCategoryId("all")}
            >
              ทั้งหมด
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {catalog.products.length}
              </span>
            </Button>
            {catalog.categories.map((category) => {
              const count = catalog.products.filter((product) => product.categoryId === category.id).length;

              return (
                <Button
                  key={category.id}
                  type="button"
                  variant={selectedCategoryId === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategoryId(category.id)}
                >
                  {category.name}
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{count}</span>
                </Button>
              );
            })}
          </div>

          {error ? (
            <p className="rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <section id="catalog-grid" className="grid gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Catalog Results</p>
            <h2 className="text-3xl font-semibold text-slate-950">
              พบสินค้า {filteredProducts.length} รายการ
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            สินค้าแนะนำจะแสดงก่อน และทุก card มีปุ่มพาไปยัง Line
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={resolveCategory(catalog.categories, product.categoryId)?.name ?? "Uncategorized"}
                lineUrl={catalog.shop.lineUrl}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <h3 className="text-2xl font-semibold text-slate-950">ไม่พบสินค้าที่ตรงกับเงื่อนไข</h3>
              <p className="mt-3 text-sm text-slate-500">
                ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่สินค้าอื่น
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}

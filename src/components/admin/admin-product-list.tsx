import { PencilLine, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, resolveCategory } from "@/lib/catalog";
import type { Category, Product } from "@/types/catalog";

type AdminProductListProps = {
  products: Product[];
  categories: Category[];
  pending: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function AdminProductList({
  products,
  categories,
  pending,
  onEdit,
  onDelete,
}: AdminProductListProps) {
  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <h3 className="text-xl font-semibold text-slate-950">ยังไม่มีสินค้าใน catalog</h3>
          <p className="mt-2 text-sm text-slate-500">
            เริ่มต้นด้วยการเพิ่มสินค้าใหม่จากปุ่มด้านบน
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {products.map((product) => {
        const categoryName = resolveCategory(categories, product.categoryId)?.name ?? "Uncategorized";

        return (
          <Card key={product.id} className="overflow-hidden">
            <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
              <div className="border-b border-white/70 bg-[linear-gradient(180deg,#f9fafb_0%,#eef2ff_100%)] sm:border-b-0 sm:border-r">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <CardContent className="grid gap-4 pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{categoryName}</Badge>
                  <Badge variant="secondary">{product.sku}</Badge>
                  {product.featured ? <Badge variant="highlight">Featured</Badge> : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-slate-950">{product.name}</h3>
                    <p className="text-base font-semibold text-slate-950">{formatPrice(product.price)}</p>
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{product.summary}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                  <Button type="button" variant="outline" onClick={() => onEdit(product)}>
                    <PencilLine className="size-4" />
                    แก้ไข
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={pending}
                    onClick={() => onDelete(product)}
                  >
                    <Trash2 className="size-4" />
                    ลบสินค้า
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

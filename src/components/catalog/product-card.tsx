import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildLineInquiryUrl, formatPrice } from "@/lib/catalog";
import type { Product } from "@/types/catalog";

type ProductCardProps = {
  product: Product;
  categoryName: string;
  lineUrl: string;
};

export function ProductCard({ product, categoryName, lineUrl }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-white/80">
      <div className="relative m-3 overflow-hidden rounded-[1.5rem] border border-white/70 bg-[linear-gradient(180deg,#f9fafb_0%,#eef2ff_100%)] sm:m-4 sm:rounded-[1.75rem]">
        <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2 sm:left-4 sm:top-4">
          <Badge variant="secondary">{categoryName}</Badge>
          {product.featured ? <Badge variant="highlight">Featured</Badge> : null}
        </div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-[16/11] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:aspect-[4/3]"
        />
      </div>

      <CardContent className="grid gap-4 pb-5 sm:gap-5 sm:pb-6">
        <div className="space-y-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
                {product.sku}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">{product.name}</h3>
            </div>
            <p className="text-base font-semibold text-slate-950 sm:text-lg">{formatPrice(product.price)}</p>
          </div>
          <p className="text-sm leading-6 text-slate-700">{product.summary}</p>
          <p className="text-sm leading-6 text-slate-500">{product.description}</p>
        </div>

        <div className="grid gap-3">
          {product.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-3 rounded-[1.15rem] border border-slate-100 bg-slate-50/80 px-4 py-3 sm:rounded-[1.25rem]"
            >
              <Sparkles className="mt-0.5 size-4 shrink-0 text-sky-600" />
              <p className="text-sm leading-6 text-slate-700">{highlight}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            หากสนใจสินค้า กดปุ่มด้านล่างแล้วแจ้งรหัสสินค้า <span className="font-semibold">{product.sku}</span> ใน
            LINE ได้ทันที
          </p>
          <Button asChild className="w-full">
            <a href={buildLineInquiryUrl(lineUrl, product)} target="_blank" rel="noreferrer">
              สนใจสินค้าทาง Line
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

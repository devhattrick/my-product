import { AlertTriangle, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice, resolveAssetUrl, resolveCategory } from "@/lib/catalog";
import type { Category, Product } from "@/types/catalog";

type DeleteProductDialogProps = {
  open: boolean;
  product: Product | null;
  categories: Category[];
  pending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
};

export function DeleteProductDialog({
  open,
  product,
  categories,
  pending,
  onOpenChange,
  onConfirm,
}: DeleteProductDialogProps) {
  if (!product) {
    return null;
  }

  const categoryName = resolveCategory(categories, product.categoryId)?.name ?? "Uncategorized";

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!pending) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent showCloseButton={false} className="w-[min(calc(100vw-1rem),34rem)] p-0">
        <div className="overflow-hidden rounded-[2rem]">
          <div className="bg-[linear-gradient(135deg,rgba(255,244,244,0.96),rgba(255,255,255,0.98))] px-5 pb-5 pt-5 sm:px-7 sm:pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-[1.35rem] border border-rose-200/80 bg-rose-50 text-rose-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <AlertTriangle className="size-6" />
              </div>
              <DialogHeader className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-rose-200 bg-rose-50 text-rose-700">Delete Product</Badge>
                  <Badge variant="secondary">{product.sku}</Badge>
                </div>
                <DialogTitle className="text-2xl leading-tight sm:text-3xl">
                  ยืนยันการลบสินค้าออกจาก catalog
                </DialogTitle>
                <DialogDescription className="max-w-xl text-[15px] leading-7">
                  ถ้าลบแล้ว สินค้าจะหายจากหน้า storefront ทันที และข้อมูลจะถูกลบออกจาก mock
                  storage ของรอบนี้
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          <div className="grid gap-5 px-5 pb-5 pt-5 sm:px-7 sm:pb-6">
            <div className="grid gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:grid-cols-[112px_1fr]">
              <div className="overflow-hidden rounded-[1.25rem] border border-slate-100 bg-[linear-gradient(180deg,#f9fafb_0%,#eef2ff_100%)]">
                <img
                  src={resolveAssetUrl(product.imageUrl)}
                  alt={product.name}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>

              <div className="grid gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{categoryName}</Badge>
                  {product.featured ? <Badge variant="highlight">Featured</Badge> : null}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{product.summary}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium">
                    ราคา {formatPrice(product.price)}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium">
                    {product.highlights.length} highlights
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-800">
              รายการนี้จะถูกลบถาวรจาก state ปัจจุบัน หากต้องการคืนค่าต้องเพิ่มใหม่อีกครั้ง
            </div>

            <DialogFooter className="border-t border-slate-100 pt-5">
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => onOpenChange(false)}
              >
                ยกเลิก
              </Button>
              <Button type="button" variant="destructive" disabled={pending} onClick={() => void onConfirm()}>
                <Trash2 className="size-4" />
                {pending ? "กำลังลบ..." : "ยืนยันลบสินค้า"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

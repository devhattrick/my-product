import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  type ProductFormValues,
} from "@/components/admin/product-form-values";
import type { ProductMutationInput } from "@/types/catalog";

type ProductFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  initialValues: ProductFormValues;
  categoryOptions: string[];
  pending: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: ProductMutationInput) => Promise<void>;
};

export function ProductFormDialog({
  open,
  mode,
  initialValues,
  categoryOptions,
  pending,
  onOpenChange,
  onSubmit,
}: ProductFormDialogProps) {
  const [draft, setDraft] = useState<ProductFormValues>(initialValues);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    if (
      !draft.sku.trim() ||
      !draft.name.trim() ||
      !draft.categoryName.trim() ||
      !draft.summary.trim() ||
      !draft.description.trim() ||
      !draft.imageUrl.trim()
    ) {
      setFormError("กรอกข้อมูลที่จำเป็นให้ครบก่อนบันทึก");
      return;
    }

    const parsedPrice = Number(draft.price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setFormError("ราคาสินค้าต้องมากกว่า 0");
      return;
    }

    try {
      await onSubmit({
        sku: draft.sku.trim().toUpperCase(),
        name: draft.name.trim(),
        categoryName: draft.categoryName.trim(),
        price: parsedPrice,
        summary: draft.summary.trim(),
        description: draft.description.trim(),
        imageUrl: draft.imageUrl.trim(),
        highlights: draft.highlights
          .split(/\n|,/)
          .map((item) => item.trim())
          .filter(Boolean),
        featured: draft.featured,
      });

      onOpenChange(false);
    } catch (submitError) {
      setFormError(
        submitError instanceof Error ? submitError.message : "บันทึกสินค้าไม่สำเร็จ",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[min(calc(100vw-1rem),780px)] p-0">
        <div className="clean-scrollbar max-h-[92vh] overflow-y-auto px-5 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
          <DialogHeader className="pr-10 sm:pr-12">
            <DialogTitle>
              {mode === "create" ? "เพิ่มสินค้าใหม่" : "แก้ไขข้อมูลสินค้า"}
            </DialogTitle>
            <DialogDescription>
              ข้อมูลจะถูกเก็บใน localStorage ชั่วคราวตอนนี้ และสามารถเปลี่ยนไปใช้ API
              จริงได้ภายหลังผ่าน repository เดิม
            </DialogDescription>
          </DialogHeader>

          <form className="mt-5 grid gap-4 pr-1 sm:mt-6 sm:gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="sku">รหัสสินค้า</Label>
                <Input
                  id="sku"
                  value={draft.sku}
                  onChange={(event) => setDraft((current) => ({ ...current, sku: event.target.value }))}
                  placeholder="HALO-27"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">ราคา (บาท)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={draft.price}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, price: event.target.value }))
                  }
                  placeholder="39900"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">ชื่อสินค้า</Label>
                <Input
                  id="name"
                  value={draft.name}
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Halo Display 27"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="categoryName">หมวดหมู่สินค้า</Label>
                <Input
                  id="categoryName"
                  list="catalog-category-options"
                  value={draft.categoryName}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, categoryName: event.target.value }))
                  }
                  placeholder="Workspace"
                />
                <datalist id="catalog-category-options">
                  {categoryOptions.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">รูปสินค้า</Label>
              <Input
                id="imageUrl"
                value={draft.imageUrl}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, imageUrl: event.target.value }))
                }
                placeholder="/products/halo-display.svg"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="summary">คำอธิบายสั้น</Label>
              <Textarea
                id="summary"
                value={draft.summary}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, summary: event.target.value }))
                }
                className="min-h-24"
                placeholder="จุดเด่นสั้น ๆ สำหรับโชว์ใน card"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">รายละเอียดสินค้า</Label>
              <Textarea
                id="description"
                value={draft.description}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, description: event.target.value }))
                }
                placeholder="รายละเอียดเชิงลึกของสินค้า"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="highlights">Highlights</Label>
              <Textarea
                id="highlights"
                value={draft.highlights}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, highlights: event.target.value }))
                }
                placeholder="คั่นด้วย comma หรือขึ้นบรรทัดใหม่"
              />
            </div>

            <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-700 sm:items-center">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, featured: event.target.checked }))
                }
                className="size-4 rounded border-slate-300"
              />
              ทำเป็นสินค้าแนะนำในหน้าร้าน
            </label>

            {formError ? (
              <p className="rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {formError}
              </p>
            ) : null}

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                ยกเลิก
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? "กำลังบันทึก..." : mode === "create" ? "บันทึกสินค้า" : "อัปเดตสินค้า"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

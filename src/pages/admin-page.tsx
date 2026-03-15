import { Boxes, Plus, ServerCrash, Sparkles } from "lucide-react";
import { useState } from "react";

import { AdminProductList } from "@/components/admin/admin-product-list";
import {
  type ProductFormValues,
  emptyProductFormValues,
} from "@/components/admin/product-form-values";
import { ProductFormDialog } from "@/components/admin/product-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCatalog } from "@/context/catalog-context";
import { resolveCategory } from "@/lib/catalog";
import type { Category, Product } from "@/types/catalog";

export function AdminPage() {
  const { catalog, isLoading, isSaving, error, createProduct, updateProduct, deleteProduct } =
    useCatalog();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  if (isLoading || !catalog) {
    return (
      <div className="grid gap-6">
        <div className="h-48 animate-pulse rounded-[2rem] bg-white/70" />
        <div className="h-[28rem] animate-pulse rounded-[2rem] bg-white/70" />
      </div>
    );
  }

  const categoryOptions = catalog.categories.map((category) => category.name);
  const initialValues = editingProduct
    ? mapProductToFormValues(editingProduct, categoryOptions, catalog.categories)
    : emptyProductFormValues;

  async function handleSubmit(values: Parameters<typeof createProduct>[0]) {
    setActionError(null);

    if (editingProduct) {
      await updateProduct(editingProduct.id, values);
      setEditingProduct(null);
      return;
    }

    await createProduct(values);
  }

  async function handleDelete(product: Product) {
    const shouldDelete = window.confirm(`ลบสินค้า ${product.name} ใช่หรือไม่?`);

    if (!shouldDelete) {
      return;
    }

    try {
      setActionError(null);
      await deleteProduct(product.id);
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : "ลบสินค้าไม่สำเร็จ");
    }
  }

  const featuredCount = catalog.products.filter((product) => product.featured).length;

  return (
    <div className="grid gap-8">
      <Card className="hero-mesh overflow-hidden border-white/80">
        <CardHeader className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Badge variant="highlight">Admin Panel</Badge>
            <div className="space-y-3">
              <CardTitle className="text-4xl leading-tight">
                จัดการสินค้าได้ครบในหน้าเดียว
              </CardTitle>
              <CardDescription className="max-w-3xl text-base">
                ตอนนี้ระบบยังไม่เชื่อม backend จริงและยังไม่มี auth แต่โครง data/service
                แยกไว้แล้วเพื่อเพิ่ม API, database และ admin login ภายหลังได้ทันที
              </CardDescription>
            </div>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={() => {
              setEditingProduct(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="size-4" />
            เพิ่มสินค้าใหม่
          </Button>
        </CardHeader>

        <CardContent className="grid gap-4 pb-8 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5">
            <p className="text-sm text-slate-500">สินค้าทั้งหมด</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{catalog.products.length}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5">
            <p className="text-sm text-slate-500">สินค้าแนะนำ</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{featuredCount}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5">
            <p className="text-sm text-slate-500">หมวดหมู่สินค้า</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{catalog.categories.length}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit">
              Backend-ready Architecture
            </Badge>
            <CardTitle>ตอนนี้ใช้ mock repository และ localStorage</CardTitle>
            <CardDescription>
              สลับไปใช้ API mode ได้ผ่าน env โดยไม่ต้องเปลี่ยนหน้า UI หรือ logic ของ form
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4">
              <Boxes className="mt-1 size-5 text-slate-500" />
              <div>
                <p className="font-semibold text-slate-900">Catalog Repository</p>
                <p className="text-sm leading-6 text-slate-600">
                  Interface กลางกำหนด contract ของ `get / create / update / delete`
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4">
              <Sparkles className="mt-1 size-5 text-slate-500" />
              <div>
                <p className="font-semibold text-slate-900">Mock-first Development</p>
                <p className="text-sm leading-6 text-slate-600">
                  Admin และ storefront ใช้ context เดียวกัน ทำให้หน้าจอพร้อมโชว์งานก่อน backend เสร็จ
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4">
              <ServerCrash className="mt-1 size-5 text-slate-500" />
              <div>
                <p className="font-semibold text-slate-900">API Contract พร้อมต่อ</p>
                <p className="text-sm leading-6 text-slate-600">
                  มี `api-catalog-repository.ts` เป็นตัวอย่าง endpoint contract สำหรับ backend จริง
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit">
              Current Catalog
            </Badge>
            <CardTitle>หมวดหมู่ที่ใช้งานอยู่</CardTitle>
            <CardDescription>
              การเพิ่มสินค้าพร้อมหมวดหมู่ใหม่จะสร้าง category ให้อัตโนมัติ
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {catalog.categories.map((category) => {
              const count = catalog.products.filter((product) => product.categoryId === category.id).length;

              return (
                <div key={category.id} className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{category.name}</p>
                      <p className="text-sm leading-6 text-slate-600">{category.description}</p>
                    </div>
                    <Badge>{count} รายการ</Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Separator />

      {error || actionError ? (
        <p className="rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {actionError ?? error}
        </p>
      ) : null}

      <section className="grid gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Inventory</p>
            <h2 className="text-3xl font-semibold text-slate-950">รายการสินค้าปัจจุบัน</h2>
          </div>
          <p className="text-sm text-slate-500">
            ข้อมูลจะสะท้อนกลับไปที่หน้าร้านทันทีหลังบันทึก
          </p>
        </div>

        <AdminProductList
          products={catalog.products}
          categories={catalog.categories}
          pending={isSaving}
          onEdit={(product) => {
            setEditingProduct(product);
            setDialogOpen(true);
          }}
          onDelete={(product) => {
            void handleDelete(product);
          }}
        />
      </section>

      {dialogOpen ? (
        <ProductFormDialog
          key={editingProduct?.id ?? "create"}
          open={dialogOpen}
          mode={editingProduct ? "edit" : "create"}
          initialValues={initialValues}
          categoryOptions={categoryOptions}
          pending={isSaving}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingProduct(null);
            }
          }}
          onSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
}

function mapProductToFormValues(
  product: Product,
  categoryOptions: string[],
  categories: Category[],
): ProductFormValues {
  const categoryName =
    resolveCategory(categories, product.categoryId)?.name ?? categoryOptions[0] ?? "";

  return {
    sku: product.sku,
    name: product.name,
    categoryName,
    price: String(product.price),
    summary: product.summary,
    description: product.description,
    imageUrl: product.imageUrl,
    highlights: product.highlights.join(", "),
    featured: product.featured,
  };
}

import { ArrowRight, LayoutDashboard, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type StoreHeroProps = {
  brandName: string;
  heroTitle: string;
  heroDescription: string;
  productCount: number;
  categoryCount: number;
  featuredCount: number;
  onBrowse: () => void;
};

export function StoreHero({
  brandName,
  heroTitle,
  heroDescription,
  productCount,
  categoryCount,
  featuredCount,
  onBrowse,
}: StoreHeroProps) {
  return (
    <section className="grid gap-5 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="hero-mesh overflow-hidden border-white/80 p-6 sm:p-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.14),transparent_70%)] lg:block" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-8 sm:gap-10">
          <div className="space-y-4 sm:space-y-5">
            <Badge variant="highlight">{brandName}</Badge>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="max-w-3xl text-[2.15rem] font-semibold leading-[1.05] sm:text-5xl">
                {heroTitle}
              </h2>
              <p className="max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-lg">
                {heroDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button size="lg" className="w-full sm:w-auto" onClick={onBrowse}>
              ดูสินค้าทั้งหมด
              <ArrowRight className="size-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/admin">
                เข้าหน้า Admin
                <LayoutDashboard className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        <Card className="border-white/80">
          <CardHeader>
            <Badge variant="secondary" className="w-fit">
              Quick Overview
            </Badge>
            <CardTitle>พร้อมเปิดใช้เป็น storefront demo ได้ทันที</CardTitle>
            <CardDescription>
              หน้า user เปิดสาธารณะ, มีค้นหาและ filter, และมีปุ่มต่อไปยัง Line สำหรับการปิดการขาย
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1">
            <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4">
              <p className="text-sm text-slate-500">สินค้าใน catalog</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{productCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4">
              <p className="text-sm text-slate-500">หมวดหมู่สินค้า</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{categoryCount}</p>
            </div>
            <div className="col-span-2 rounded-[1.5rem] border border-white/70 bg-white/80 p-4 sm:col-span-1">
              <p className="text-sm text-slate-500">สินค้าแนะนำ</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{featuredCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/80">
          <CardContent className="grid gap-4 pt-6">
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4">
              <Search className="mt-1 size-5 text-slate-500" />
              <div>
                <p className="font-semibold text-slate-900">ค้นหาได้เร็ว</p>
                <p className="text-sm leading-6 text-slate-600">
                  รองรับการค้นหาจากชื่อสินค้า, หมวดหมู่ และคำอธิบายแบบ real-time
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4">
              <LayoutDashboard className="mt-1 size-5 text-slate-500" />
              <div>
                <p className="font-semibold text-slate-900">Admin จัดการสินค้าได้ครบ</p>
                <p className="text-sm leading-6 text-slate-600">
                  เพิ่ม แก้ไข ลบสินค้าได้จากหน้าจอเดียว พร้อมสร้างหมวดหมู่ใหม่ได้จาก form
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4">
              <ShieldCheck className="mt-1 size-5 text-slate-500" />
              <div>
                <p className="font-semibold text-slate-900">พร้อมต่อ backend</p>
                <p className="text-sm leading-6 text-slate-600">
                  แยก repository และ api contract ไว้แล้ว เปลี่ยนจาก mock เป็น API ได้โดยไม่ต้องรื้อ UI
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

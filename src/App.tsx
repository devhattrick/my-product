import { LayoutDashboard, Sparkles, Store } from "lucide-react";
import { NavLink, Route, Routes } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AdminPage } from "@/pages/admin-page";
import { StorefrontPage } from "@/pages/storefront-page";

const navigationItems = [
  {
    to: "/",
    label: "หน้าร้าน",
    icon: Store,
    end: true,
  },
  {
    to: "/admin",
    label: "Admin",
    icon: LayoutDashboard,
  },
];

function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/78 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl border border-white/60 bg-[linear-gradient(135deg,#ffffff_0%,#dce7ff_55%,#fef3c7_100%)] shadow-[0_18px_40px_rgba(17,24,39,0.08)]">
                  <Sparkles className="size-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase sm:text-sm">
                    My Product
                  </p>
                  <h1 className="text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
                    Premium Product Showcase
                  </h1>
                </div>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Frontend-only storefront พร้อม admin panel, ค้นหาและกรองสินค้าได้,
                และเตรียม service layer สำหรับเชื่อม API/Database ภายหลัง
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Badge className="border border-sky-200 bg-sky-50 text-sky-700 shadow-none">
                Public storefront ไม่ต้อง login
              </Badge>
              <Badge className="border border-slate-200 bg-white text-slate-700 shadow-none">
                Mock mode พร้อมต่อ backend
              </Badge>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            {navigationItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "border-slate-900 bg-slate-950 text-white shadow-[0_18px_35px_rgba(15,23,42,0.18)]"
                      : "border-slate-200 bg-white/90 text-slate-600 hover:border-slate-300 hover:text-slate-900",
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8">
        <Routes>
          <Route path="/" element={<StorefrontPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/products/new": "Add Product",
  "/admin/orders": "Orders",
  "/admin/enquiries": "Enquiries",
  "/admin/catalogs": "Catalogs",
};

export default function Header() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Admin";

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 shrink-0">
      <div>
        <h1 className="text-lg font-black text-gray-900">{title}</h1>
        <p className="text-xs text-gray-400">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-gray-50 transition">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </button>
        <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}
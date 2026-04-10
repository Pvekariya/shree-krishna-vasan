"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ChevronLeft, Upload, X, Plus } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";

const CATEGORIES = ["Cookware", "Storage", "Dinner Set", "Accessories"];

export default function EditProductPage() {
  const { token } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((p) => {
        setForm({
          ...p,
          price: String(p.price),
          stock: String(p.stock ?? ""),
          features: p.features?.length ? p.features : [""],
        });
        setFetching(false);
      });
  }, [id]);

  const set = (key: string, val: any) =>
    setForm((f: any) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Name, price and category are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock) || 0,
          features: form.features.filter(Boolean),
        }),
      });
      if (res.ok) {
        toast.success("Product updated!");
        router.push("/admin/products");
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition mb-6"
      >
        <ChevronLeft size={16} /> Back to Products
      </Link>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-5">Edit Product</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Product Name *</label>
              <input
                value={form.name}
                onChange={(e) => { set("name", e.target.value); set("slug", slugify(e.target.value)); }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Category *</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition resize-none"
              />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={form.isFeatured}
                onChange={(e) => set("isFeatured", e.target.checked)}
                className="w-4 h-4 accent-orange-500"
              />
              <label htmlFor="featured" className="text-sm text-gray-700 font-medium">Mark as Featured</label>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Features</h2>
          <div className="space-y-2">
            {form.features.map((f: string, i: number) => (
              <div key={i} className="flex gap-2">
                <input
                  value={f}
                  onChange={(e) => {
                    const arr = [...form.features];
                    arr[i] = e.target.value;
                    set("features", arr);
                  }}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                />
                {form.features.length > 1 && (
                  <button onClick={() => set("features", form.features.filter((_: any, j: number) => j !== i))}
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button onClick={() => set("features", [...form.features, ""])}
              className="flex items-center gap-2 text-sm text-orange-500 font-semibold mt-1">
              <Plus size={14} /> Add Feature
            </button>
          </div>
        </div>

        {/* IMAGES PREVIEW */}
        {form.images?.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Current Images</h2>
            <div className="flex gap-3 flex-wrap">
              {form.images.map((url: string, i: number) => (
                <div key={i} className="relative group">
                  <img src={url} alt="" className="w-20 h-20 object-cover rounded-xl border border-gray-100" />
                  <button
                    onClick={() => set("images", form.images.filter((_: any, j: number) => j !== i))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white py-4 rounded-xl font-bold shadow-md hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Update Product"}
        </motion.button>
      </div>
    </div>
  );
}
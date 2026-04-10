"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Upload, Plus, X, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";

const CATEGORIES = ["Cookware", "Storage", "Dinner Set", "Accessories"];

export default function NewProductPage() {
  const { token } = useAuthStore();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    isFeatured: false,
    images: [] as string[],
    features: [""],
  });

  const update = (key: string, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Upload failed");
        }
        const { url } = await res.json();
        uploaded.push(url);
      }
      update("images", [...form.images, ...uploaded]);
      toast.success(`${uploaded.length} image(s) uploaded ✓`);
    } catch (err: any) {
      toast.error(err.message || "Upload failed — check Cloudinary env vars");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) { toast.error("Product name is required"); return; }
    if (!form.price) { toast.error("Price is required"); return; }
    if (!form.category) { toast.error("Category is required"); return; }
    if (form.images.length === 0) { toast.error("Upload at least one image"); return; }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug || slugify(form.name),
        price: Number(form.price),
        category: form.category,
        description: form.description.trim(),
        stock: Number(form.stock) || 0,
        isFeatured: form.isFeatured,
        images: form.images,
        features: form.features.filter((f) => f.trim()),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save product");
      }

      toast.success("Product saved! Now live on the website ✓");
      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition mb-6"
      >
        <ChevronLeft size={16} /> Back to Products
      </Link>

      <div className="space-y-5">

        {/* ── BASIC INFO ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-base">
            <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-black shrink-0">1</span>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="sm:col-span-2">
              <label className="label">Product Name *</label>
              <input
                value={form.name}
                onChange={(e) => {
                  update("name", e.target.value);
                  update("slug", slugify(e.target.value));
                }}
                placeholder="e.g. Stainless Steel Kadhai 28cm"
                className="input"
              />
            </div>

            <div>
              <label className="label">Category *</label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="input bg-white"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="499"
                min="0"
                className="input"
              />
            </div>

            <div>
              <label className="label">Stock Quantity</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => update("stock", e.target.value)}
                placeholder="100"
                min="0"
                className="input"
              />
            </div>

            <div>
              <label className="label">URL Slug (auto-generated)</label>
              <input
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                className="input bg-gray-50 text-gray-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe the product — materials, use case, special features..."
                rows={3}
                className="input resize-none"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-3 p-3.5 rounded-xl bg-orange-50 border border-orange-100 cursor-pointer"
              onClick={() => update("isFeatured", !form.isFeatured)}>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => update("isFeatured", e.target.checked)}
                className="w-4 h-4 accent-orange-500 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">⭐ Mark as Featured</p>
                <p className="text-xs text-gray-500">Shows in the Best Sellers section on the homepage</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── IMAGES ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-base">
            <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-black shrink-0">2</span>
            Product Images *
          </h2>
          <p className="text-xs text-gray-400 mb-4 ml-8">
            Upload 1–5 images. The first image is used as the main display image on the website.
          </p>

          <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition ${
            uploading
              ? "border-orange-300 bg-orange-50 cursor-not-allowed"
              : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/40"
          }`}>
            {uploading ? (
              <>
                <Loader2 size={26} className="text-orange-400 animate-spin mb-2" />
                <span className="text-sm text-orange-500 font-semibold">Uploading to Cloudinary...</span>
                <span className="text-xs text-orange-400 mt-1">Please wait</span>
              </>
            ) : (
              <>
                <Upload size={26} className="text-gray-300 mb-2" />
                <span className="text-sm text-gray-500 font-medium">Click to select images</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — multiple files supported</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <AnimatePresence>
            {form.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 mt-4 flex-wrap"
              >
                {form.images.map((url, i) => (
                  <motion.div
                    key={url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 text-[9px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold shadow">
                        MAIN
                      </span>
                    )}
                    <button
                      onClick={() =>
                        update("images", form.images.filter((_, j) => j !== i))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
                    >
                      <X size={10} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── FEATURES ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-base">
            <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-black shrink-0">3</span>
            Key Features
          </h2>
          <p className="text-xs text-gray-400 mb-4 ml-8">Bullet points shown on the product detail page.</p>
          <div className="space-y-2">
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={f}
                  onChange={(e) => {
                    const arr = [...form.features];
                    arr[i] = e.target.value;
                    update("features", arr);
                  }}
                  placeholder="e.g. Food-grade 304 stainless steel"
                  className="input flex-1"
                />
                {form.features.length > 1 && (
                  <button
                    onClick={() =>
                      update("features", form.features.filter((_, j) => j !== i))
                    }
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => update("features", [...form.features, ""])}
              className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-semibold mt-2"
            >
              <Plus size={14} /> Add feature
            </button>
          </div>
        </div>

        {/* ── SUBMIT ── */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={saving || uploading}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-200 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <><Loader2 size={18} className="animate-spin" /> Saving...</>
          ) : (
            "Save & Publish Product →"
          )}
        </motion.button>
        <p className="text-center text-xs text-gray-400 pb-2">
          Product will instantly appear on the public website.
        </p>
      </div>

      <style jsx global>{`
        .label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 0.375rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.15s;
        }
        .input:focus {
          border-color: #fb923c;
          box-shadow: 0 0 0 3px rgba(251,146,60,0.15);
        }
      `}</style>
    </div>
  );
}
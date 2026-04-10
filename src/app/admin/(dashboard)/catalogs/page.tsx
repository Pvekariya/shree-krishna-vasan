"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Trash2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminCatalogsPage() {
  const { token } = useAuthStore();
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", pdfUrl: "", coverImage: "" });

  const fetchCatalogs = async () => {
    const res = await fetch("/api/admin/catalogs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCatalogs(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchCatalogs(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "pdfUrl" | "coverImage") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      setForm((f) => ({ ...f, [field]: url }));
      toast.success("Uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.title || !form.pdfUrl) {
      toast.error("Title and PDF are required");
      return;
    }
    const res = await fetch("/api/admin/catalogs", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success("Catalog added!");
      setForm({ title: "", pdfUrl: "", coverImage: "" });
      setShowForm(false);
      fetchCatalogs();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this catalog?")) return;
    await fetch("/api/admin/catalogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    toast.success("Deleted");
    fetchCatalogs();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{catalogs.length} catalogs</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:opacity-90 transition"
        >
          <Plus size={16} />
          Add Catalog
        </button>
      </div>

      {/* ADD FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">New Catalog</h3>
              <button onClick={() => setShowForm(false)}>
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Festive Collection 2026"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">PDF File *</label>
                {form.pdfUrl ? (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <span className="text-green-700 text-sm font-semibold">✓ PDF uploaded</span>
                    <button onClick={() => setForm((f) => ({ ...f, pdfUrl: "" }))} className="ml-auto text-red-500"><X size={14} /></button>
                  </div>
                ) : (
                  <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-500">{uploading ? "Uploading..." : "Upload PDF"}</span>
                    <input type="file" accept=".pdf" onChange={(e) => handleUpload(e, "pdfUrl")} className="hidden" />
                  </label>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Cover Image (optional)</label>
                {form.coverImage ? (
                  <div className="flex items-center gap-3">
                    <img src={form.coverImage} alt="" className="w-16 h-16 object-cover rounded-xl" />
                    <button onClick={() => setForm((f) => ({ ...f, coverImage: "" }))} className="text-red-500 text-sm">Remove</button>
                  </div>
                ) : (
                  <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Upload cover image</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "coverImage")} className="hidden" />
                  </label>
                )}
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
              >
                Save Catalog
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIST */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : catalogs.length === 0 ? (
        <div className="text-center py-24">
          <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">No catalogs yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          <AnimatePresence>
            {catalogs.map((cat, i) => (
              <motion.div
                key={cat._id?.toString()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
              >
                {cat.coverImage ? (
                  <img src={cat.coverImage} alt={cat.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                    <BookOpen size={40} className="text-orange-200" />
                  </div>
                )}
                <div className="p-4 flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{cat.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(cat.createdAt).toLocaleDateString("en-IN")}
                    </p>
                    <a
                      href={cat.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-500 font-semibold mt-2 inline-block hover:underline"
                    >
                      View PDF →
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(cat._id?.toString())}
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
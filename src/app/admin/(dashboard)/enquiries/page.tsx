"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Trash2, Phone, Search } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminEnquiriesPage() {
  const { token } = useAuthStore();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    const res = await fetch("/api/admin/enquiries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setEnquiries(data);
    setFiltered(data);
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(enquiries.filter(
      (e) => e.name?.toLowerCase().includes(q) || e.phone?.includes(q) || e.message?.toLowerCase().includes(q)
    ));
  }, [search, enquiries]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await fetch("/api/admin/enquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    toast.success("Deleted");
    fetchEnquiries();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search enquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          />
        </div>
        <p className="text-sm text-gray-400">{filtered.length} results</p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">No enquiries found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map((enq, i) => (
              <motion.div
                key={enq._id?.toString()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-orange-100 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{enq.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      enq.type === "dealer"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {enq.type === "dealer" ? "Dealer" : "Contact"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(enq._id?.toString())}
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <a
                  href={`tel:${enq.phone}`}
                  className="flex items-center gap-2 text-sm text-orange-600 font-semibold mb-2 hover:underline"
                >
                  <Phone size={13} />
                  {enq.phone}
                </a>

                {enq.business && (
                  <p className="text-sm text-gray-600 mb-1">🏪 {enq.business}</p>
                )}
                {enq.city && (
                  <p className="text-sm text-gray-500 mb-2">📍 {enq.city}</p>
                )}
                {enq.message && (
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 mt-2 leading-relaxed">
                    "{enq.message}"
                  </p>
                )}

                <p className="text-[11px] text-gray-400 mt-3">
                  {new Date(enq.createdAt).toLocaleString("en-IN")}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
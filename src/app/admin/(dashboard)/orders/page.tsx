"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-600",
};

export default function AdminOrdersPage() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, paymentStatus: string) => {
    await fetch("/api/admin/orders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, paymentStatus }),
    });
    toast.success("Status updated");
    fetchOrders();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{orders.length} total orders</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingCart size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">No orders yet</p>
        </div>
      ) : (
        orders.map((order, i) => {
          const isOpen = expanded === order._id?.toString();
          return (
            <motion.div
              key={order._id?.toString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* HEADER ROW */}
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50/50 transition"
                onClick={() => setExpanded(isOpen ? null : order._id?.toString())}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {order.customer?.name || "—"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.customer?.phone} · {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-black text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </span>
                  <select
                    value={order.paymentStatus}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateStatus(order._id?.toString(), e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[order.paymentStatus]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </div>
              </div>

              {/* EXPANDED */}
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-100 px-6 py-4 bg-gray-50/30"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Items</p>
                      <div className="space-y-2">
                        {order.items?.map((item: any, j: number) => (
                          <div key={j} className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.name} × {item.quantity}</span>
                            <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Delivery</p>
                      <p className="text-sm text-gray-700">{order.customer?.address || "—"}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import StatCard from "@/components/admin/StatCard";
import { Package, ShoppingCart, MessageSquare, BookOpen, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { token } = useAuthStore();
  const [data, setData] = useState({
    products: [] as any[],
    orders: [] as any[],
    enquiries: [] as any[],
    catalogs: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch("/api/admin/products", { headers }).then((r) => r.json()),
      fetch("/api/admin/orders", { headers }).then((r) => r.json()),
      fetch("/api/admin/enquiries", { headers }).then((r) => r.json()),
      fetch("/api/admin/catalogs", { headers }).then((r) => r.json()),
    ]).then(([products, orders, enquiries, catalogs]) => {
      setData({ products, orders, enquiries, catalogs });
      setLoading(false);
    });
  }, [token]);

  const totalRevenue = data.orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  const recentOrders = data.orders.slice(0, 5);
  const recentEnquiries = data.enquiries.slice(0, 5);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Products"
          value={data.products.length}
          icon={<Package size={20} />}
          color="orange"
        />
        <StatCard
          title="Total Orders"
          value={data.orders.length}
          icon={<ShoppingCart size={20} />}
          color="blue"
          trend="12%"
          trendUp
        />
        <StatCard
          title="Enquiries"
          value={data.enquiries.length}
          icon={<MessageSquare size={20} />}
          color="purple"
        />
        <StatCard
          title="Revenue"
          value={formatPrice(totalRevenue)}
          icon={<BookOpen size={20} />}
          color="green"
          trend="8%"
          trendUp
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* RECENT ORDERS */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-gray-900">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs text-orange-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-6">No orders yet</p>
            )}
            {recentOrders.map((order, i) => (
              <motion.div
                key={order._id?.toString()}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {order.customer?.name || "—"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {order.items?.length} item(s) ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus === "failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RECENT ENQUIRIES */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-gray-900">Recent Enquiries</h2>
            <Link
              href="/admin/enquiries"
              className="text-xs text-orange-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentEnquiries.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-6">No enquiries yet</p>
            )}
            {recentEnquiries.map((enq, i) => (
              <motion.div
                key={enq._id?.toString()}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="py-2.5 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-gray-800">{enq.name}</p>
                  <span className="text-[10px] text-gray-400">
                    {new Date(enq.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{enq.phone}</p>
                {enq.message && (
                  <p className="text-xs text-gray-400 mt-1 truncate">{enq.message}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Add Product", href: "/admin/products/new", icon: "📦", color: "from-orange-500 to-amber-400" },
          { label: "View Orders", href: "/admin/orders", icon: "🛒", color: "from-blue-500 to-sky-400" },
          { label: "Enquiries", href: "/admin/enquiries", icon: "💬", color: "from-purple-500 to-violet-400" },
          { label: "Add Catalog", href: "/admin/catalogs", icon: "📄", color: "from-emerald-500 to-teal-400" },
        ].map((a, i) => (
          <Link key={i} href={a.href}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`bg-gradient-to-r ${a.color} text-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition`}
            >
              <div className="text-3xl mb-2">{a.icon}</div>
              <p className="font-bold text-sm">{a.label}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
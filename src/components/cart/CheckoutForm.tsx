"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutForm() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);

    try {
      // Create Razorpay order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total() + (total() >= 2000 ? 0 : 100) }),
      });
      const { orderId, amount, currency } = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Shree Krishna Vasan Bhandar",
        description: "Purchase",
        order_id: orderId,
        handler: async (response: any) => {
          // Verify & save order
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer: { name: form.name, phone: form.phone, address: `${form.address}, ${form.city} - ${form.pincode}` },
              items: items.map((i) => ({
                productId: i._id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
              })),
              totalAmount: amount / 100,
            }),
          });
          const result = await verifyRes.json();
          if (result.success) {
            clearCart();
            toast.success("Order placed successfully! 🎉");
            router.push("/");
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: { name: form.name, contact: form.phone, email: form.email },
        theme: { color: "#f97316" },
      };

      const rp = new window.Razorpay(options);
      rp.open();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "name", label: "Full Name *", placeholder: "Ravi Patel" },
          { name: "phone", label: "Phone *", placeholder: "+91 98765 43210" },
          { name: "email", label: "Email", placeholder: "you@example.com" },
          { name: "city", label: "City", placeholder: "Ahmedabad" },
          { name: "pincode", label: "Pincode", placeholder: "380001" },
        ].map((f) => (
          <div key={f.name} className={f.name === "name" ? "col-span-2 md:col-span-1" : ""}>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              {f.label}
            </label>
            <input
              name={f.name}
              value={(form as any)[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
            />
          </div>
        ))}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Delivery Address *
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="House/Shop No., Street, Area..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition resize-none"
          />
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={loading || items.length === 0}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white py-4 rounded-xl font-bold shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Processing..." : `Pay ${formatPrice(total() + (total() >= 2000 ? 0 : 100))}`}
      </motion.button>

      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
        🔒 Secured by Razorpay
      </p>
    </div>
  );
}
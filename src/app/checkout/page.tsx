"use client";

import CheckoutForm from "@/components/cart/CheckoutForm";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Script from "next/script";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const subtotal = total();
  const shipping = subtotal >= 2000 ? 0 : 100;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="mb-10">
            <Link href="/cart" className="text-sm text-gray-400 hover:text-orange-500 mb-2 inline-block">
              ← Back to Cart
            </Link>
            <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* FORM */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-lg text-gray-900 mb-6">Delivery Details</h2>
                <CheckoutForm />
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
                <h2 className="font-bold text-lg text-gray-900 mb-5">Your Order</h2>

                <div className="space-y-3 max-h-64 overflow-y-auto mb-5">
                  {items.map((item) => (
                    <div key={item._id} className="flex gap-3 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-800 shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{formatPrice(subtotal + shipping)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
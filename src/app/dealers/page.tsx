"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import toast from "react-hot-toast";
import { CheckCircle2, Package, Tag, Headphones, Truck, FileText, Star } from "lucide-react";

const benefits = [
  { icon: <Tag size={22} />, title: "Wholesale Pricing", desc: "Up to 40% below MRP on all products for authorized dealers." },
  { icon: <Package size={22} />, title: "Priority Stock", desc: "First access to new arrivals and festive season inventory." },
  { icon: <FileText size={22} />, title: "Exclusive Catalogs", desc: "Dealer-only catalogs with full product specs and pricing." },
  { icon: <Truck size={22} />, title: "Fast Dispatch", desc: "Bulk orders dispatched within 24–48 hours pan-India." },
  { icon: <Headphones size={22} />, title: "Dedicated Support", desc: "Personal account manager for all your order queries." },
  { icon: <Star size={22} />, title: "Co-Marketing", desc: "Featured as authorized dealer on our website and materials." },
];

const steps = [
  { step: "01", title: "Fill the Form", desc: "Submit your dealership enquiry with business details." },
  { step: "02", title: "Verification", desc: "Our team reviews your application within 24 hours." },
  { step: "03", title: "Onboarding", desc: "Receive dealer credentials, catalog & pricing sheet." },
  { step: "04", title: "Start Selling", desc: "Place your first order and start earning." },
];

export default function DealersPage() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", city: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.business) {
      toast.error("Please fill required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "dealer" }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Application submitted! We'll contact you within 24 hours 🎉");
      } else {
        toast.error("Submission failed. Try again or call us.");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-br from-gray-950 to-gray-900 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/30 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4 block">
            Partnership Program
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Become an Authorized{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Dealer
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            Join 500+ retailers who trust Shree Krishna Vasan Bhandar for quality
            products and profitable margins.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:opacity-90 transition text-lg"
          >
            Apply Now →
          </a>
        </motion.div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
              Dealer Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Why Partner With Us?
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-500 text-orange-500 group-hover:text-white rounded-xl flex items-center justify-center mb-4 transition">
                  {b.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
                Process
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                How It Works
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl font-black text-orange-100 mb-3">{s.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
                Get Started
              </span>
              <h2 className="text-3xl font-black text-gray-900">Apply for Dealership</h2>
              <p className="text-gray-500 mt-2 text-sm">
                Fill the form and we'll reach out within 24 hours.
              </p>
            </div>
          </ScrollReveal>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-2">Application Received!</h3>
              <p className="text-gray-500">Our team will contact you within 24 hours.</p>
            </motion.div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              <div className="space-y-4">
                {[
                  { name: "name", label: "Your Name *", placeholder: "Ravi Patel" },
                  { name: "business", label: "Business Name *", placeholder: "Patel Kitchenware" },
                  { name: "phone", label: "Phone Number *", placeholder: "+91 98765 43210" },
                  { name: "city", label: "City", placeholder: "Ahmedabad" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
                    <input
                      name={f.name}
                      value={(form as any)[f.name]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Additional Notes</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your business or any specific requirements..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition resize-none"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white py-4 rounded-xl font-bold shadow-md hover:opacity-90 transition disabled:opacity-60 text-base"
                >
                  {loading ? "Submitting..." : "Submit Application →"}
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
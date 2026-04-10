"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      toast.error("Name and phone are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "contact" }),
      });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon 🙏");
        setForm({ name: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send. Try WhatsApp instead.");
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
      <section className="bg-gradient-to-br from-orange-600 to-amber-500 text-white py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white/70 text-xs font-bold tracking-widest uppercase mb-3 block">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Contact Us</h1>
          <p className="text-white/80 max-w-md mx-auto">
            Questions about products, bulk orders, or partnerships? We're here to help.
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">

          {/* FORM */}
          <ScrollReveal direction="left">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Send a Message</h2>
              <div className="space-y-4">
                {[
                  { name: "name", label: "Your Name *", placeholder: "Ravi Patel", type: "text" },
                  { name: "phone", label: "Phone Number *", placeholder: "+91 98765 43210", type: "tel" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={(form as any)[f.name]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition resize-none"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white py-3.5 rounded-xl font-bold shadow-md hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
                <p className="text-center text-sm text-gray-400">
                  Or reach us directly on{" "}
                  <a
                    href="https://wa.me/919999999999"
                    className="text-green-600 font-semibold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* INFO */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-6">Contact Info</h2>
                {[
                  {
                    icon: <MapPin size={18} />,
                    title: "Address",
                    lines: ["Shop No. 12, Raipur Darwaja", "Ahmedabad, Gujarat – 380001"],
                  },
                  {
                    icon: <Phone size={18} />,
                    title: "Phone",
                    lines: ["+91 99999 99999", "+91 88888 88888"],
                  },
                  {
                    icon: <Mail size={18} />,
                    title: "Email",
                    lines: ["info@skvb.in", "orders@skvb.in"],
                  },
                  {
                    icon: <Clock size={18} />,
                    title: "Shop Hours",
                    lines: ["Mon–Sat: 9 AM – 8 PM", "Sunday: 10 AM – 5 PM"],
                  },
                ].map((c, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-orange-50 transition">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                        {c.title}
                      </p>
                      {c.lines.map((l, j) => (
                        <p key={j} className="text-gray-700 text-sm">{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* MAP */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-52">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9!2d72.587!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzUnMTMuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Shop Location"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
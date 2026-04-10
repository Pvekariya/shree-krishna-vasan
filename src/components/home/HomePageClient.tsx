"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Star, Truck, Shield, Award, ArrowRight, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

const slides = [
  {
    title: "Kitchenware You'd Love to Own",
    subtitle: "Premium stainless steel — crafted for Indian kitchens",
    cta: "Shop Cookware",
    href: "/products?category=Cookware",
    image: "https://lh3.googleusercontent.com/p/AF1QipP8hNmptnuhNv0CkL_SXvgD1ZDkJoPe3hKlbaKw=s1360-w1360-h1020",
    badge: "New Arrivals",
  },
  {
    title: "Elegant Dinnerware Collection",
    subtitle: "Set a table that impresses every guest",
    cta: "Explore Dinnerware",
    href: "/products?category=Dinner Set",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqAUY-sD6X0Zjjf8UQzslfkE-zT5I7wOOY-7lczWNUke3IyHhRaAoErcEk0gKhGO1oZjiYcWdLbDLTxDbqvwb6THi6DwI1zteung3lLA-PTWNpq2P2YeMTY0YVJm6-aSGIUm3vNFg=s1360-w1360-h1020",
    badge: "Bestseller",
  },
  {
    title: "Modern Storage Solutions",
    subtitle: "Keep your kitchen organized in style",
    cta: "View Storage",
    href: "/products?category=Storage",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweru-vfMacqLBRVtzIRxqf3SXWjoDGrZ9Hd0MFGT7hHacLAPGSDhZ1hpmmcixhQU-MoOeacMJtKALkatVHwABqhk7z881XthVrYWqNUzVjmeu7sIPKdyW1Nl51VmI7EtXZiPVDiP=s1360-w1360-h1020",
    badge: "Popular",
  },
  {
    title: "Durable Cookware Range",
    subtitle: "Built for everyday use, made to last a lifetime",
    cta: "Shop Now",
    href: "/products",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqihovUFJGW1ems3Qmm9l1vGfQ49KAwFNlRcWzJ41EXZK_G2W3JxIH9VZa51kVkLh4iFUbQKdWlV9J1qNApJ8azSFgk9TBhyjI23oxUZ1IFKuWrLdNNJ-JOtKTfb-Q6CdMsK9viJw=s1360-w1360-h1020",
    badge: "Sale",
  },
];

const categories = [
  {
    name: "Cookware",
    desc: "Pans, kadhai & more",
    image: "blob:null/864a22a2-de29-49de-93d1-02e163d63347",
    count: "120+ items",
  },
  {
    name: "Storage",
    desc: "Containers & bottles",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
    count: "80+ items",
  },
  {
    name: "Dinner Set",
    desc: "Plates, bowls & thali",
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&q=80",
    count: "60+ items",
  },
  {
    name: "Accessories",
    desc: "Tools & serving items",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80",
    count: "90+ items",
  },
];

const stats = [
  { label: "Products", value: "350+", icon: "📦" },
  { label: "Retailers", value: "500+", icon: "🏪" },
  { label: "Years of Trust", value: "20+", icon: "⭐" },
  { label: "Cities Served", value: "25+", icon: "🗺️" },
];

const benefits = [
  {
    icon: <Truck size={22} />,
    title: "Fast Delivery",
    desc: "Pan-India shipping within 3–5 days",
  },
  {
    icon: <Shield size={22} />,
    title: "ISI Certified",
    desc: "All products meet quality standards",
  },
  {
    icon: <Award size={22} />,
    title: "20 Years Trust",
    desc: "Serving retailers since 2005",
  },
  {
    icon: <Star size={22} />,
    title: "Premium Grade",
    desc: "Food-safe, food-grade stainless steel",
  },
];

export default function HomePageClient({ products }: any) {
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const featured = products?.slice(0, 8) || [];

  return (
    <main className="bg-white text-gray-900">

      {/* ===== HERO CAROUSEL ===== */}
      <section className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            navigation
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={900}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            className="rounded-2xl overflow-hidden [&_.swiper-button-next]:!text-orange-500 [&_.swiper-button-prev]:!text-orange-500 [&_.swiper-button-next]:!bg-white/80 [&_.swiper-button-prev]:!bg-white/80 [&_.swiper-button-next]:!w-10 [&_.swiper-button-prev]:!w-10 [&_.swiper-button-next]:!h-10 [&_.swiper-button-prev]:!h-10 [&_.swiper-button-next]:!rounded-full [&_.swiper-button-prev]:!rounded-full [&_.swiper-button-next]:!shadow-md [&_.swiper-button-prev]:!shadow-md [&_.swiper-button-next:after]:!text-sm [&_.swiper-button-prev:after]:!text-sm"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[360px] md:min-h-[420px] px-4 md:px-8">
                  {/* IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 w-full"
                  >
                    <div className="relative">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-[260px] md:h-[360px] object-cover rounded-xl shadow-lg"
                      />
                      <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        {slide.badge}
                      </span>
                    </div>
                  </motion.div>

                  {/* TEXT */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex-1 text-center md:text-left"
                  >
                    <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-gray-900">
                      {slide.title}
                    </h1>
                    <p className="text-gray-500 mb-8 text-base md:text-lg">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <Link
                        href={slide.href}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white px-7 py-3.5 rounded-xl shadow-lg font-semibold hover:shadow-orange-200 hover:scale-105 transition"
                      >
                        {slide.cta}
                        <ArrowRight size={16} />
                      </Link>
                      <Link
                        href="/catalogs"
                        className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition"
                      >
                        View Catalog
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div>
                  <div className="text-3xl mb-1">{s.icon}</div>
                  <div className="text-3xl font-black">{s.value}</div>
                  <div className="text-white/80 text-sm mt-1">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
              Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Explore our wide range of premium kitchen products
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Link
                href={`/products?category=${cat.name}`}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-52 md:h-64">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-white/70 text-xs">{cat.desc}</p>
                  <span className="text-orange-300 text-xs mt-1 block">{cat.count}</span>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-orange-500 rounded-full p-1.5">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      {featured.length > 0 && (
        <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
                    Featured
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                    Best Sellers
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="hidden md:flex items-center gap-1 text-orange-600 font-semibold text-sm hover:gap-2 transition-all"
                >
                  View All <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {featured.map((product: any, i: number) => (
                <ScrollReveal key={product._id} delay={i * 0.08}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
                    <Link href={`/products/${product._id}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-full h-44 object-cover group-hover:scale-110 transition duration-700"
                        />
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          New
                        </span>
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/products/${product._id}`}>
                        <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-orange-600 transition mb-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-600 font-black">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.price + 200)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          addItem({
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.images?.[0],
                          });
                          toast.success("Added to cart!");
                        }}
                        className="w-full mt-3 bg-gray-50 hover:bg-orange-500 hover:text-white text-gray-700 py-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={13} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white px-6 py-3 rounded-xl font-semibold"
              >
                View All Products <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== WHY US ===== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Built on Trust & Quality
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-500 text-orange-500 group-hover:text-white rounded-xl flex items-center justify-center mx-auto mb-4 transition">
                  {b.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{b.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== DEALER CTA ===== */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <ScrollReveal>
            <span className="text-white/80 text-xs font-bold tracking-widest uppercase mb-4 block">
              For Businesses
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Become an Authorized Dealer
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Get wholesale pricing, priority stock access, exclusive catalogs,
              and dedicated support. Join 500+ retailers across Gujarat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dealers"
                className="bg-white text-orange-600 px-8 py-3.5 rounded-xl font-bold shadow hover:bg-orange-50 transition inline-flex items-center gap-2"
              >
                Apply Now <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="border border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Talk to Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

export default function HomePageClient({ products }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-gradient-to-br from-orange-50 via-yellow-50 to-white text-black">

      {/* HERO CAROUSEL */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">

          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            navigation={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            className="relative [&_.swiper-button-next]:!text-orange-500 [&_.swiper-button-prev]:!text-orange-500 [&_.swiper-button-next]:right-0 [&_.swiper-button-prev]:left-0 [&_.swiper-button-next]:top-1/2 [&_.swiper-button-prev]:top-1/2 [&_.swiper-button-next]:-translate-y-1/2 [&_.swiper-button-prev]:-translate-y-1/2"
            style={{ transitionTimingFunction: "ease-in-out" }}
          >

            {[
              {
                title: "Kitchenware you would Love to Have",
                subtitle: "Premium stainless steel utensils",
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
              },
              {
                title: "Premium Dinnerware Collection",
                subtitle: "Elegant plates and serving sets",
                image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
              },
              {
                title: "Modern Storage & Bottles",
                subtitle: "Keep your kitchen organized",
                image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707",
              },
              {
                title: "Cookware for Everyday Use",
                subtitle: "Durable and long-lasting steel",
                image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1",
              },
            ].map((slide, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col md:flex-row items-center gap-12 min-h-[400px]"
                >

                  <div className="flex-1">
                    <img
                      src={slide.image}
                      className="w-full h-[350px] object-cover rounded-xl shadow-md"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      {slide.title}
                    </h1>

                    <p className="text-gray-600 mb-6">
                      {slide.subtitle}
                    </p>

                    <Link
                      href="/products"
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
                    >
                      Shop Now
                    </Link>
                  </div>

                </motion.div>
              </SwiperSlide>
            ))}

          </Swiper>

        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center text-orange-600">
          Kitchen Appliances
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Cookware", "Storage", "Dinner Set", "Accessories"].map((item, i) => (
            <Link
              key={i}
              href={`/products?category=${encodeURIComponent(item)}`}
              className="block bg-white border border-orange-100 p-6 rounded-lg text-center hover:shadow-md hover:scale-105 transition cursor-pointer"
            >
              <h3 className="font-medium">{item}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center text-orange-600">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products?.slice(0, 8).map((product: any) => (
            <div
              key={product._id}
              className="bg-white border border-orange-100 rounded-xl p-4 hover:shadow-xl transition"
            >
              <img
                src={product.images?.[0]}
                className="w-full h-40 object-cover mb-3 rounded"
              />

              <h3 className="font-medium">{product.name}</h3>
              <p className="text-orange-600 font-semibold">₹{product.price}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
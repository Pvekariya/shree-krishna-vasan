"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";

const slides = [
  {
    title: "Kitchenware you would Love to Have",
    subtitle: "Premium stainless steel utensils",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    title: "Premium Dinnerware Collection",
    subtitle: "Elegant plates and serving sets",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
  },
  {
    title: "Modern Storage & Bottles",
    subtitle: "Keep your kitchen organized",
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707",
  },
  {
    title: "Cookware for Everyday Use",
    subtitle: "Durable and long-lasting steel",
    image:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1",
  },
];

export default function HeroCarousel() {
  return (
    <section className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3000 }}
          loop={true}
          className="rounded-xl overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-center gap-10">

                {/* IMAGE */}
                <div className="flex-1">
                  <img
                    src={slide.image}
                    className="w-full h-[350px] object-cover rounded-lg"
                  />
                </div>

                {/* TEXT */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-gray-600 mb-6">
                    {slide.subtitle}
                  </p>

                  <Link
                    href="/products"
                    className="bg-black text-white px-6 py-3 rounded-lg"
                  >
                    Shop Now
                  </Link>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FileText, Download, Link, ChevronRight } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getCatalogs() {
  try {
    const res = await fetch(`${BASE}/api/catalogs`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const categories = [
  {
    name: "Cookware",
    desc: "Pans, kadhai & more",
    image: "https://lh3.googleusercontent.com/p/AF1QipP8hNmptnuhNv0CkL_SXvgD1ZDkJoPe3hKlbaKw=s1360-w1360-h1020",
    count: "120+ items",
  },
  {
    name: "Storage",
    desc: "Containers & bottles",
    image: "https://lh3.googleusercontent.com/p/AF1QipP8hNmptnuhNv0CkL_SXvgD1ZDkJoPe3hKlbaKw=s1360-w1360-h1020",
    count: "80+ items",
  },
  {
    name: "Dinner Set",
    desc: "Plates, bowls & thali",
    image: "https://drive.google.com/file/d/1g_Y3-9kozj2CvptUuINSl8LJLA2srvbb/view?usp=drive_link",
    count: "60+ items",
  },
  {
    name: "Accessories",
    desc: "Tools & serving items",
    image: "https://drive.google.com/file/d/19fLKT6YELiUDfKLwmBDnzhSVRacgJrWX/view?usp=drive_link",
    count: "90+ items",
  },
];

export default async function CatalogsPage() {
  const catalogs = await getCatalogs();

  return (
    <main className="bg-white min-h-screen">
      {/* HERO */}
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
      <section className="bg-gradient-to-br from-orange-600 to-amber-500 text-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-white/70 text-xs font-bold tracking-widest uppercase mb-3 block">
            Downloads
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Product Catalogs</h1>
          <p className="text-white/80 text-lg">
            Download our latest product catalogs with full specs, pricing, and imagery.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        {catalogs.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={64} className="mx-auto text-orange-200 mb-6" />
            <h2 className="text-xl font-bold text-gray-600 mb-2">
              Catalogs Coming Soon
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Our digital catalogs are being updated. Meanwhile, you can request one via WhatsApp.
            </p>
            <a
              href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20your%20product%20catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            >
              Request on WhatsApp →
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {catalogs.map((cat: any, i: number) => (
              <ScrollReveal key={cat._id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition overflow-hidden group">
                  {cat.coverImage ? (
                    <img
                      src={cat.coverImage}
                      alt={cat.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                      <FileText size={48} className="text-orange-300" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
                    <p className="text-gray-500 text-xs mb-4">
                      {new Date(cat.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                    <a
                      href={cat.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition w-full justify-center"
                    >
                      <Download size={15} />
                      Download PDF
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
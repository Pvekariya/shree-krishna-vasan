"use client";

const messages = [
  "🎉 Free shipping on orders above ₹2,000",
  "✨ New Festive Collection Now Available",
  "📦 Bulk orders & dealer enquiries welcome",
  "🏆 Trusted by 500+ retailers across Gujarat",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="mx-12 font-medium tracking-wide">
            {msg}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </div>
  );
}
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { Providers } from "@/components/ui/Providers";

export const metadata = {
  title: "Shree Krishna Vasan Bhandar | Premium Utensils",
  description:
    "Premium quality stainless steel utensils, cookware, dinnerware & storage – trusted supplier in Ahmedabad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <div className="pt-24">{children}</div>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Shree Krishna Vasan Bhandar",
  description: "Premium Utensils Supplier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
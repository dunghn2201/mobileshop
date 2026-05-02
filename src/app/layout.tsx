import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Tuấn Anh Mobile - Mua bán & Sửa chữa điện thoại uy tín",
  description:
    "Cửa hàng điện thoại Tuấn Anh Mobile - Chuyên mua bán iPhone, Samsung, Xiaomi chính hãng. Dịch vụ sửa chữa điện thoại uy tín, nhanh chóng, giá tốt.",
  keywords: "điện thoại, iPhone, Samsung, Xiaomi, sửa chữa, trả góp",
  openGraph: {
    title: "Tuấn Anh Mobile",
    description: "Mua bán & Sửa chữa điện thoại uy tín",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingActions />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin/dashboard", label: "Tổng quan", icon: "📊" },
  { href: "/admin/products", label: "Sản phẩm", icon: "📱" },
  { href: "/admin/orders", label: "Đơn hàng", icon: "📦" },
  { href: "/admin/bookings", label: "Lịch sửa chữa", icon: "🔧" },
  { href: "/admin/services", label: "Dịch vụ & Giá", icon: "⚙️" },
  { href: "/admin/settings", label: "Cài đặt cửa hàng", icon: "🏪" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== "/admin") {
        router.replace("/admin");
      }
      setChecking(false);
    });
    return unsub;
  }, [router, pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Đã đăng xuất");
    router.push("/admin");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === "/admin") return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-white border-r border-gray-100 transform transition-transform md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white font-bold">T</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Tuấn Anh Mobile</p>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-3 right-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <span>🚪</span>
            Đăng xuất
          </button>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors mt-1"
          >
            <span>🏠</span>
            Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4 sticky top-0 z-20">
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100"
            onClick={() => setMenuOpen(true)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="font-semibold text-gray-900 text-sm">
            {navItems.find((n) => n.href === pathname)?.label || "Admin"}
          </h1>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

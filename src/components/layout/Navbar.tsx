"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { SHOP_INFO } from "@/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/repair", label: "Sửa chữa" },
    { href: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-white text-xs py-1.5 px-4 text-center hidden md:block">
        📞 Hotline: {SHOP_INFO.phoneDisplay} | ⏰ {SHOP_INFO.hours} | 📍{" "}
        {SHOP_INFO.addressShort}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <div>
              <div className="font-bold text-gray-900 leading-tight text-sm md:text-base">
                Tuấn Anh Mobile
              </div>
              <div className="text-[10px] text-gray-500 hidden sm:block">
                Uy tín - Chất lượng
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary-50 font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Giỏ hàng"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center font-bold px-1">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <div className="w-5 space-y-1">
                <span
                  className={cn(
                    "block h-0.5 bg-gray-700 transition-transform",
                    menuOpen && "translate-y-1.5 rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 bg-gray-700 transition-opacity",
                    menuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 bg-gray-700 transition-transform",
                    menuOpen && "-translate-y-1.5 -rotate-45"
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden py-3 border-t border-gray-100 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-gray-700 hover:text-primary hover:bg-primary-50 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

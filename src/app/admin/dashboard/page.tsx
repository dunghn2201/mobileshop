"use client";

import { useEffect, useState } from "react";
import { getProducts, getOrders, getBookings } from "@/lib/firestore";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    bookings: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getOrders(), getBookings()])
      .then(([products, orders, bookings]) => {
        const revenue = orders
          .filter((o) => o.status !== "cancelled")
          .reduce((sum, o) => sum + o.totalPrice, 0);
        setStats({
          products: products.length,
          orders: orders.length,
          bookings: bookings.length,
          revenue,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Sản phẩm", value: stats.products, icon: "📱", href: "/admin/products", color: "bg-blue-50 text-blue-600" },
    { label: "Đơn hàng", value: stats.orders, icon: "📦", href: "/admin/orders", color: "bg-green-50 text-green-600" },
    { label: "Lịch sửa", value: stats.bookings, icon: "🔧", href: "/admin/bookings", color: "bg-orange-50 text-orange-600" },
    { label: "Doanh thu", value: formatPrice(stats.revenue), icon: "💰", href: "/admin/orders", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tổng quan</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="card p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${card.color}`}>
              {card.icon}
            </div>
            <p className="text-2xl font-extrabold text-gray-900">
              {loading ? (
                <span className="inline-block h-7 w-16 skeleton rounded" />
              ) : (
                card.value
              )}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/products/new" className="card p-5 flex items-center gap-4 hover:shadow-md transition-shadow border-dashed border-2 border-gray-200 hover:border-primary group">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            +
          </div>
          <div>
            <p className="font-semibold text-gray-900">Thêm sản phẩm</p>
            <p className="text-sm text-gray-500">Thêm sản phẩm mới vào kho</p>
          </div>
        </Link>
        <Link href="/admin/orders" className="card p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">📦</div>
          <div>
            <p className="font-semibold text-gray-900">Quản lý đơn hàng</p>
            <p className="text-sm text-gray-500">Xem và cập nhật trạng thái</p>
          </div>
        </Link>
        <Link href="/admin/bookings" className="card p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl">🔧</div>
          <div>
            <p className="font-semibold text-gray-900">Lịch sửa chữa</p>
            <p className="text-sm text-gray-500">Xem lịch hẹn khách hàng</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

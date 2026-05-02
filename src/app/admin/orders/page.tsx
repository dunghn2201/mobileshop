"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getOrders, updateOrderStatus } from "@/lib/firestore";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { STATUS_LABELS, ORDER_STATUS_COLORS } from "@/constants";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => toast.error("Không thể tải đơn hàng"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, status: Order["status"]) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
      toast.success("Đã cập nhật trạng thái");
    } catch {
      toast.error("Không thể cập nhật");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Đơn hàng</h1>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-4">
              <div className="skeleton h-4 w-1/3 mb-2" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-500">Chưa có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-bold text-gray-900">
                    {order.customerName}
                  </p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {order.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-primary">
                    {formatPrice(order.totalPrice)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(order.createdAt as Date)}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <span
                  className={`badge ${
                    ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS] ||
                    "bg-gray-100 text-gray-600"
                  } px-3 py-1`}
                >
                  {STATUS_LABELS[order.status as keyof typeof STATUS_LABELS]}
                </span>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id!, e.target.value as Order["status"])
                  }
                  className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="shipping">Đang giao</option>
                  <option value="delivered">Đã giao</option>
                  <option value="cancelled">Đã huỷ</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

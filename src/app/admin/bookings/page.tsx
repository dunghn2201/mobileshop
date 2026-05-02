"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getBookings, updateBookingStatus } from "@/lib/firestore";
import { Booking } from "@/types";
import { formatDate } from "@/lib/utils";
import { STATUS_LABELS, BOOKING_STATUS_COLORS } from "@/constants";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then(setBookings)
      .catch(() => toast.error("Không thể tải lịch"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, status: Booking["status"]) => {
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      toast.success("Đã cập nhật trạng thái");
    } catch {
      toast.error("Không thể cập nhật");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Lịch sửa chữa</h1>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-4">
              <div className="skeleton h-4 w-1/3 mb-2" />
              <div className="skeleton h-3 w-2/3" />
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔧</div>
          <p className="text-gray-500">Chưa có lịch hẹn nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-bold text-gray-900">{booking.name}</p>
                  <p className="text-sm text-gray-500">{booking.phone}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {formatDate(booking.createdAt as Date)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-1 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-500 flex-shrink-0">Thiết bị:</span>
                  <span className="font-medium text-gray-900">{booking.device}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 flex-shrink-0">Sự cố:</span>
                  <span className="text-gray-700">{booking.issue}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`badge ${
                    BOOKING_STATUS_COLORS[booking.status as keyof typeof BOOKING_STATUS_COLORS] ||
                    "bg-gray-100 text-gray-600"
                  } px-3 py-1`}
                >
                  {STATUS_LABELS[booking.status as keyof typeof STATUS_LABELS]}
                </span>
                <select
                  value={booking.status}
                  onChange={(e) =>
                    handleStatusChange(booking.id!, e.target.value as Booking["status"])
                  }
                  className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="in-progress">Đang xử lý</option>
                  <option value="completed">Hoàn thành</option>
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

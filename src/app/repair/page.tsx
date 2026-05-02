"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { createBooking } from "@/lib/firestore";
import { REPAIR_SERVICES } from "@/constants";
import { formatPrice } from "@/lib/utils";
import { Booking } from "@/types";

type BookingForm = Omit<Booking, "id" | "status" | "createdAt">;

export default function RepairPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingForm>();

  const onSubmit = async (data: BookingForm) => {
    setSubmitting(true);
    try {
      await createBooking({ ...data, status: "pending" });
      toast.success("Đặt lịch thành công! Chúng tôi sẽ liên hệ sớm.");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="section-title mb-3">Dịch vụ Sửa chữa</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Thợ lành nghề, linh kiện chính hãng, bảo hành minh bạch. Đặt lịch
          online — nhận phản hồi trong 15 phút.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {REPAIR_SERVICES.map((svc) => (
          <div
            key={svc.id}
            id={svc.id}
            className="card p-6 flex gap-4"
          >
            <div className="text-3xl flex-shrink-0">{svc.icon}</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{svc.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{svc.description}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-primary font-semibold">
                  Từ {formatPrice(svc.priceFrom)}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{svc.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            📅 Đặt lịch sửa chữa
          </h2>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Đặt lịch thành công!
              </h3>
              <p className="text-gray-500 mb-6">
                Chúng tôi sẽ liên hệ với bạn qua số điện thoại để xác nhận
                lịch.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary"
              >
                Đặt lịch khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="input-field"
                    {...register("name", {
                      required: "Vui lòng nhập họ tên",
                      minLength: { value: 2, message: "Tên quá ngắn" },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0901234567"
                    className="input-field"
                    {...register("phone", {
                      required: "Vui lòng nhập số điện thoại",
                      pattern: {
                        value: /^(0[3-9])[0-9]{8}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Thiết bị <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="iPhone 14 Pro Max, Samsung S24..."
                  className="input-field"
                  {...register("device", {
                    required: "Vui lòng nhập tên thiết bị",
                  })}
                />
                {errors.device && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.device.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mô tả sự cố <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Màn hình bị vỡ, máy không sạc được, pin yếu..."
                  className="input-field resize-none"
                  {...register("issue", {
                    required: "Vui lòng mô tả sự cố",
                    minLength: { value: 10, message: "Mô tả quá ngắn" },
                  })}
                />
                {errors.issue && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.issue.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-base py-3.5"
              >
                {submitting ? "Đang gửi..." : "Đặt lịch ngay"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Hoặc gọi trực tiếp:{" "}
                <a href="tel:0901234567" className="text-primary font-semibold">
                  0901234567
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

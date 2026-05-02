"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { createOrder } from "@/lib/firestore";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import Link from "next/link";

type CheckoutForm = {
  customerName: string;
  phone: string;
  address: string;
  note: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { items, totalPrice, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Giỏ hàng trống
        </h1>
        <Link href="/products" className="btn-primary">
          Quay lại mua sắm
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutForm) => {
    setSubmitting(true);
    try {
      const orderData: Omit<Order, "id" | "createdAt"> = {
        items,
        totalPrice: totalPrice(),
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        note: data.note,
        status: "pending",
      };
      const orderId = await createOrder(orderData);
      clearCart();
      toast.success("Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận.");
      router.push(`/order-success?id=${orderId}`);
    } catch {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="section-title mb-6">Thanh toán</h1>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-5">
              Thông tin giao hàng
            </h2>

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
                    {...register("customerName", {
                      required: "Vui lòng nhập họ tên",
                    })}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.customerName.message}
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
                  Địa chỉ giao hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="123 Đường ABC, Phường 1, Quận 1, TP.HCM"
                  className="input-field"
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ",
                    minLength: { value: 10, message: "Địa chỉ quá ngắn" },
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ghi chú
                </label>
                <textarea
                  rows={3}
                  placeholder="Giao hàng giờ hành chính, gọi trước khi giao..."
                  className="input-field resize-none"
                  {...register("note")}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm">
                <p className="font-semibold text-yellow-800 mb-1">
                  💳 Phương thức thanh toán
                </p>
                <p className="text-yellow-700">
                  Thanh toán khi nhận hàng (COD). Hỗ trợ trả góp 0% khi đến
                  cửa hàng.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-base py-3.5"
              >
                {submitting ? "Đang đặt hàng..." : `Đặt hàng — ${formatPrice(totalPrice())}`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="card p-6 sticky top-24">
            <h2 className="font-bold text-lg text-gray-900 mb-4">
              Đơn hàng ({items.length} sản phẩm)
            </h2>

            <div className="space-y-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate flex-1 mr-2">
                    {product.name}
                    <span className="text-gray-400"> x{quantity}</span>
                  </span>
                  <span className="font-medium flex-shrink-0">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="font-semibold">Tổng cộng</span>
              <span className="text-xl font-extrabold text-primary">
                {formatPrice(totalPrice())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

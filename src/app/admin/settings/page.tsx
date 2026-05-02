"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getShopSettings, updateShopSettings } from "@/lib/firestore";
import { ShopSettings } from "@/types";
import { SHOP_INFO } from "@/constants";

const DEFAULT: ShopSettings = {
  phone: SHOP_INFO.phone,
  phoneDisplay: SHOP_INFO.phoneDisplay,
  address: SHOP_INFO.address,
  addressShort: SHOP_INFO.addressShort,
  hours: SHOP_INFO.hours,
  mapUrl: "",
  facebookUrl: "",
  zaloUrl: "",
  aboutText: "",
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ShopSettings>({ defaultValues: DEFAULT });

  useEffect(() => {
    getShopSettings()
      .then((data) => {
        if (data) reset({ ...DEFAULT, ...data });
        else reset(DEFAULT);
      })
      .catch(() => reset(DEFAULT))
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: ShopSettings) => {
    setSaving(true);
    try {
      await updateShopSettings(data);
      toast.success("Đã lưu cài đặt cửa hàng");
      reset(data);
    } catch {
      toast.error("Không thể lưu cài đặt");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-4 space-y-2">
            <div className="skeleton h-4 w-1/4 rounded" />
            <div className="skeleton h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl">⚙️</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt cửa hàng</h1>
          <p className="text-sm text-gray-500">Thông tin liên hệ, giờ mở cửa, mạng xã hội</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Thông tin liên hệ */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <span>📞</span> Thông tin liên hệ
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại (không dấu cách)
              </label>
              <input
                {...register("phone", { required: "Bắt buộc" })}
                className="input-field"
                placeholder="0768678777"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại (hiển thị)
              </label>
              <input
                {...register("phoneDisplay", { required: "Bắt buộc" })}
                className="input-field"
                placeholder="0768 678 777"
              />
              {errors.phoneDisplay && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneDisplay.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ đầy đủ
            </label>
            <input
              {...register("address", { required: "Bắt buộc" })}
              className="input-field"
              placeholder="182 Nguyễn Chí Thanh, Quảng Hòa, Tx Ba Đồn, Quảng Bình"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ ngắn (hiển thị trên thanh nav)
            </label>
            <input
              {...register("addressShort", { required: "Bắt buộc" })}
              className="input-field"
              placeholder="182 Nguyễn Chí Thanh, Quảng Hòa, Tx Ba Đồn"
            />
            {errors.addressShort && (
              <p className="text-red-500 text-xs mt-1">{errors.addressShort.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giờ mở cửa
            </label>
            <input
              {...register("hours", { required: "Bắt buộc" })}
              className="input-field"
              placeholder="7:00 - 21:00 (Mỗi ngày)"
            />
            {errors.hours && (
              <p className="text-red-500 text-xs mt-1">{errors.hours.message}</p>
            )}
          </div>
        </div>

        {/* Liên kết & bản đồ */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <span>🔗</span> Liên kết & Bản đồ
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Maps URL
            </label>
            <input
              {...register("mapUrl")}
              className="input-field"
              placeholder="https://maps.google.com/..."
              type="url"
            />
            <p className="text-xs text-gray-400 mt-1">
              Vào Google Maps → Chia sẻ → Nhúng bản đồ → Copy URL
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook Page URL
            </label>
            <input
              {...register("facebookUrl")}
              className="input-field"
              placeholder="https://facebook.com/tuananhmobile"
              type="url"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zalo URL
            </label>
            <input
              {...register("zaloUrl")}
              className="input-field"
              placeholder="https://zalo.me/0768678777"
              type="url"
            />
          </div>
        </div>

        {/* Giới thiệu */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <span>📝</span> Giới thiệu cửa hàng
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả ngắn (hiển thị ở footer)
            </label>
            <textarea
              {...register("aboutText")}
              className="input-field resize-none"
              rows={3}
              placeholder="Cửa hàng điện thoại uy tín tại Ba Đồn, Quảng Bình..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || !isDirty}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Đang lưu...
              </span>
            ) : (
              "💾 Lưu cài đặt"
            )}
          </button>
          {!isDirty && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              ✓ Đã đồng bộ
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

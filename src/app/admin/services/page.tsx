"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getRepairServicesDB,
  addRepairService,
  updateRepairService,
  deleteRepairService,
} from "@/lib/firestore";
import { REPAIR_SERVICES } from "@/constants";
import { RepairService } from "@/types";
import { formatPrice } from "@/lib/utils";

type ServiceForm = Omit<RepairService, "id">;

const EMPTY_FORM: ServiceForm = {
  name: "",
  icon: "🔧",
  description: "",
  priceFrom: 0,
  duration: "",
  warranty: "",
  order: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<RepairService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | "new" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceForm>({ defaultValues: EMPTY_FORM });

  const load = async () => {
    setLoading(true);
    try {
      const data = await getRepairServicesDB();
      // Nếu Firestore chưa có dữ liệu → dùng constants làm mặc định (display only)
      setServices(data.length > 0 ? data : REPAIR_SERVICES);
    } catch {
      setServices(REPAIR_SERVICES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    reset({ ...EMPTY_FORM, order: services.length });
    setEditId("new");
  };

  const openEdit = (service: RepairService) => {
    reset({
      name: service.name,
      icon: service.icon,
      description: service.description,
      priceFrom: service.priceFrom,
      duration: service.duration,
      warranty: service.warranty ?? "",
      order: service.order ?? 0,
    });
    setEditId(service.id);
  };

  const cancelEdit = () => {
    setEditId(null);
    reset(EMPTY_FORM);
  };

  const onSubmit = async (data: ServiceForm) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        priceFrom: Number(data.priceFrom),
        order: Number(data.order ?? 0),
      };
      if (editId === "new") {
        await addRepairService(payload);
        toast.success("Đã thêm dịch vụ");
      } else if (editId) {
        await updateRepairService(editId, payload);
        toast.success("Đã cập nhật dịch vụ");
      }
      setEditId(null);
      reset(EMPTY_FORM);
      await load();
    } catch {
      toast.error("Không thể lưu dịch vụ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Xoá dịch vụ "${name}"?`)) return;
    try {
      await deleteRepairService(id);
      toast.success("Đã xoá dịch vụ");
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      toast.error("Không thể xoá dịch vụ");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl">🔧</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dịch vụ sửa chữa</h1>
            <p className="text-sm text-gray-500">Quản lý danh sách, giá cả và mô tả dịch vụ</p>
          </div>
        </div>
        {editId === null && (
          <button onClick={openNew} className="btn-primary text-sm py-2">
            + Thêm dịch vụ
          </button>
        )}
      </div>

      {/* Form thêm/sửa */}
      {editId !== null && (
        <div className="card p-6 mb-6 border-2 border-primary/20">
          <h2 className="font-semibold text-gray-800 mb-4">
            {editId === "new" ? "➕ Thêm dịch vụ mới" : "✏️ Chỉnh sửa dịch vụ"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon (emoji)
                </label>
                <input
                  {...register("icon", { required: "Bắt buộc" })}
                  className="input-field"
                  placeholder="🔧"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên dịch vụ <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: "Bắt buộc" })}
                  className="input-field"
                  placeholder="Thay màn hình"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả ngắn
              </label>
              <textarea
                {...register("description")}
                className="input-field resize-none"
                rows={2}
                placeholder="Thay màn hình zin chính hãng, bảo hành 3-6 tháng..."
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá từ (VND) <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("priceFrom", {
                    required: "Bắt buộc",
                    min: { value: 0, message: "Phải ≥ 0" },
                  })}
                  type="number"
                  className="input-field"
                  placeholder="500000"
                />
                {errors.priceFrom && (
                  <p className="text-red-500 text-xs mt-1">{errors.priceFrom.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời gian
                </label>
                <input
                  {...register("duration")}
                  className="input-field"
                  placeholder="30-60 phút"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bảo hành
                </label>
                <input
                  {...register("warranty")}
                  className="input-field"
                  placeholder="3 tháng"
                />
              </div>
            </div>

            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thứ tự hiển thị
              </label>
              <input
                {...register("order")}
                type="number"
                className="input-field"
                placeholder="0"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary disabled:opacity-50"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang lưu...
                  </span>
                ) : editId === "new" ? (
                  "Thêm dịch vụ"
                ) : (
                  "Lưu thay đổi"
                )}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="btn-outline text-sm"
              >
                Huỷ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Danh sách dịch vụ */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-4 flex gap-4">
              <div className="skeleton w-12 h-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-1/3" />
                <div className="skeleton h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">🔧</div>
          <p className="text-gray-500 mb-4">Chưa có dịch vụ nào</p>
          <button onClick={openNew} className="btn-primary">
            Thêm dịch vụ đầu tiên
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={`card p-4 flex items-center gap-4 transition-all ${
                editId === service.id ? "ring-2 ring-primary/30" : ""
              }`}
            >
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{service.name}</p>
                <p className="text-sm text-gray-500 truncate">{service.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-primary font-medium text-sm">
                    Từ {formatPrice(service.priceFrom)}
                  </span>
                  {service.duration && (
                    <span className="text-xs text-gray-400">⏱ {service.duration}</span>
                  )}
                  {service.warranty && (
                    <span className="text-xs text-green-600">🛡 {service.warranty}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(service)}
                  className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(service.id, service.name)}
                  className="text-sm px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {services.length > 0 && !loading && (
        <p className="text-xs text-gray-400 mt-4 text-center">
          {services.length} dịch vụ · Dữ liệu được đồng bộ với trang chủ
        </p>
      )}
    </div>
  );
}

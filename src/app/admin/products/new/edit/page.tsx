"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addProduct, uploadProductImage } from "@/lib/firestore";
import { Product } from "@/types";

type ProductForm = Omit<Product, "id" | "createdAt" | "images" | "specs"> & {
  specsRaw: string;
};

export default function NewProductEditPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Ảnh tối đa 5MB"); return; }
    setUploading(true);
    try {
      const url = await uploadProductImage(file, `temp_${Date.now()}`);
      setImages((prev) => [...prev, url]);
      toast.success("Tải ảnh thành công");
    } catch {
      toast.error("Không thể tải ảnh lên");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProductForm) => {
    if (images.length === 0) { toast.error("Vui lòng thêm ít nhất 1 ảnh"); return; }
    setSubmitting(true);
    const specs: Record<string, string> = {};
    if (data.specsRaw) {
      data.specsRaw.split("\n").forEach((line) => {
        const [k, ...rest] = line.split(":");
        if (k && rest.length) specs[k.trim()] = rest.join(":").trim();
      });
    }
    try {
      await addProduct({
        name: data.name, brand: data.brand,
        price: Number(data.price),
        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
        storage: data.storage, description: data.description,
        isInstallmentAvailable: data.isInstallmentAvailable,
        stock: data.stock ? Number(data.stock) : undefined,
        images, specs,
      });
      toast.success("Đã thêm sản phẩm");
      router.push("/admin/products");
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Thêm sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Thông tin cơ bản</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tên sản phẩm <span className="text-red-500">*</span></label>
            <input type="text" className="input-field" placeholder="iPhone 15 Pro Max" {...register("name", { required: "Bắt buộc" })} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Thương hiệu <span className="text-red-500">*</span></label>
              <select className="input-field" {...register("brand", { required: "Bắt buộc" })}>
                <option value="">Chọn thương hiệu</option>
                <option value="iPhone">iPhone</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bộ nhớ / RAM <span className="text-red-500">*</span></label>
              <input type="text" className="input-field" placeholder="8GB + 256GB" {...register("storage", { required: "Bắt buộc" })} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Giá bán (VNĐ) <span className="text-red-500">*</span></label>
              <input type="number" className="input-field" placeholder="28000000" {...register("price", { required: "Bắt buộc", min: { value: 1, message: "Giá không hợp lệ" } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Giá gốc</label>
              <input type="number" className="input-field" placeholder="32000000" {...register("originalPrice")} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tồn kho</label>
              <input type="number" className="input-field" placeholder="10" {...register("stock")} />
            </div>
            <div className="flex items-center gap-3 pt-7">
              <input type="checkbox" id="installment" className="w-4 h-4 accent-primary" {...register("isInstallmentAvailable")} />
              <label htmlFor="installment" className="text-sm font-medium text-gray-700">Cho phép trả góp 0%</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả</label>
            <textarea rows={4} className="input-field resize-none" placeholder="Mô tả sản phẩm..." {...register("description")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Thông số kỹ thuật <span className="text-gray-400 font-normal">(mỗi dòng: Tên: Giá trị)</span></label>
            <textarea rows={5} className="input-field resize-none font-mono text-xs" placeholder={"Màn hình: 6.7 inch OLED\nChip: A17 Pro"} {...register("specsRaw")} />
          </div>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Hình ảnh</h2>
          <div className="flex flex-wrap gap-3 mb-3">
            {images.map((url, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img src={url} alt="" className="w-full h-full object-contain p-1" />
                <button type="button" onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">×</button>
              </div>
            ))}
            <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary flex flex-col items-center justify-center cursor-pointer transition-colors">
              <span className="text-2xl text-gray-400">+</span>
              <span className="text-xs text-gray-400">Thêm ảnh</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
          {uploading && <p className="text-sm text-primary">Đang tải ảnh...</p>}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">Huỷ</button>
          <button type="submit" disabled={submitting || uploading} className="btn-primary flex-1">
            {submitting ? "Đang lưu..." : "Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}

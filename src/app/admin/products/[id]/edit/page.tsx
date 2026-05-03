"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addProduct, updateProduct, getProductById } from "@/lib/firestore";
import { Product } from "@/types";

type ProductForm = Omit<Product, "id" | "createdAt" | "images" | "specs"> & {
  specsRaw: string;
};

const PLACEHOLDER_IMAGE = "https://placehold.co/400x400/f3f4f6/9ca3af?text=No+Image";

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const isEdit = !!id && id !== "new";

  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [customBrand, setCustomBrand] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductForm>();

  const selectedBrand = watch("brand");

  useEffect(() => {
    if (isEdit && id) {
      getProductById(id).then((product) => {
        if (!product) return;
        const knownBrands = ["iPhone", "Samsung", "Xiaomi"];
        if (!knownBrands.includes(product.brand)) {
          setCustomBrand(product.brand);
        }
        reset({
          name: product.name,
          brand: knownBrands.includes(product.brand) ? product.brand : "Khác",
          price: product.price,
          originalPrice: product.originalPrice,
          storage: product.storage,
          description: product.description,
          isInstallmentAvailable: product.isInstallmentAvailable,
          stock: product.stock,
          specsRaw: product.specs
            ? Object.entries(product.specs)
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n")
            : "",
        });
        setImages(product.images);
      });
    }
  }, [isEdit, id, reset]);

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!/^https?:\/\/.+/.test(trimmed)) { toast.error("URL không hợp lệ"); return; }
    setImages((prev) => [...prev, trimmed]);
    setUrlInput("");
    toast.success("Đã thêm ảnh từ URL");
  };

  const onSubmit = async (data: ProductForm) => {
    if (data.brand === "Khác" && !customBrand.trim()) {
      toast.error("Vui lòng nhập tên thương hiệu");
      return;
    }
    setSubmitting(true);
    const specs: Record<string, string> = {};
    if (data.specsRaw) {
      data.specsRaw.split("\n").forEach((line) => {
        const [k, ...rest] = line.split(":");
        if (k && rest.length) specs[k.trim()] = rest.join(":").trim();
      });
    }
    const brand = data.brand === "Khác" ? customBrand.trim() : data.brand;
    const payload = {
      name: data.name,
      brand,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      storage: data.storage,
      description: data.description,
      isInstallmentAvailable: data.isInstallmentAvailable,
      stock: data.stock ? Number(data.stock) : undefined,
      images: images.length > 0 ? images : [PLACEHOLDER_IMAGE],
      specs,
    };
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 5000)
      );
      if (isEdit && id) {
        await Promise.race([updateProduct(id, payload), timeout]);
        toast.success("Đã cập nhật sản phẩm");
      } else {
        await Promise.race([addProduct(payload), timeout]);
        toast.success("Đã thêm sản phẩm");
      }
      router.push("/admin/products");
    } catch (err: unknown) {
      console.error("[saveProduct error]", err);
      const msg = err instanceof Error && err.message === "timeout"
        ? "Timeout 5s — kiểm tra kết nối mạng"
        : `Lỗi: ${err instanceof Error ? err.message : String(err)}`;
      toast.error(msg, { duration: 8000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Thông tin cơ bản</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input type="text" className="input-field" placeholder="iPhone 15 Pro Max 256GB" {...register("name", { required: "Bắt buộc" })} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Thương hiệu <span className="text-red-500">*</span>
              </label>
              <select className="input-field" {...register("brand", { required: "Bắt buộc" })}>
                <option value="">Chọn thương hiệu</option>
                <option value="iPhone">iPhone</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Khác">Khác</option>
              </select>
              {selectedBrand === "Khác" && (
                <input
                  type="text"
                  className="input-field mt-2"
                  placeholder="Nhập tên thương hiệu..."
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Bộ nhớ / RAM <span className="text-red-500">*</span>
              </label>
              <input type="text" className="input-field" placeholder="8GB + 256GB" {...register("storage", { required: "Bắt buộc" })} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Giá bán (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input type="number" className="input-field" placeholder="28000000" {...register("price", { required: "Bắt buộc", min: { value: 1, message: "Giá không hợp lệ" } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Giá gốc (để trống nếu không giảm giá)
              </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Thông số kỹ thuật{" "}
              <span className="text-gray-400 font-normal">(mỗi dòng: Tên: Giá trị)</span>
            </label>
            <textarea
              rows={5}
              className="input-field resize-none font-mono text-xs"
              placeholder={"Màn hình: 6.7 inch OLED\nChip: A17 Pro\nCamera: 48MP + 12MP + 12MP"}
              {...register("specsRaw")}
            />
          </div>
        </div>

        {/* Images */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Hình ảnh</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">Không bắt buộc</span>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {images.length === 0 && (
              <div className="w-20 h-20 rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
                <span className="text-2xl">📷</span>
                <span className="text-[10px] text-gray-400 mt-0.5">Placeholder</span>
              </div>
            )}
            {images.map((url, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-contain p-1" onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }} />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                  className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}

          </div>

          {/* URL input */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Nhập URL ảnh (copy link từ Google, trang web...):</p>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUrl())}
                className="input-field flex-1 text-sm"
                placeholder="https://example.com/image.jpg"
              />
              <button type="button" onClick={handleAddUrl} className="btn-secondary text-sm px-4 flex-shrink-0">
                Thêm
              </button>
            </div>
          </div>

          {images.length === 0 && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mt-3">
              ⚠️ Chưa có ảnh — sản phẩm sẽ hiển thị ảnh placeholder. Bạn có thể cập nhật ảnh sau.
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">
            Huỷ
          </button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1">
            {submitting ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}

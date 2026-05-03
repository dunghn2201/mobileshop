"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addProduct } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { Product } from "@/types";

type ProductForm = Omit<Product, "id" | "createdAt" | "images" | "specs"> & {
  specsRaw: string;
};

const PLACEHOLDER_IMAGE = "https://placehold.co/400x400/f3f4f6/9ca3af?text=No+Image";

const SEED_PRODUCTS = [
  {
    name: "Vivo X300 Ultra",
    brand: "Vivo",
    storage: "16GB + 512GB",
    price: 39990000,
    originalPrice: 49990000,
    stock: 15,
    isInstallmentAvailable: false,
    description: "Đặc điểm nổi bật của vivo X300 Ultra\nChip Snapdragon 8 Elite tiến trình 3 nm xử lý tác vụ cực nhanh.\nCamera 200 MP kết hợp ống kính Zeiss cho ảnh chụp sắc nét.\nPin Blue Ocean 6600 mAh giúp bạn sử dụng bền bỉ cả ngày.\nMàn hình 2K AMOLED 144 Hz hiển thị hình ảnh vô cùng sống động.\nSạc nhanh 100W tiết kiệm thời gian chờ đợi pin đầy mỗi ngày.",
    images: ["https://cdnv2.tgdd.vn/mwg-static/common/Campaign/68/39/6839b726942b82e2a81031f194f46d5c.png"],
    specs: {
      "Màn hình": "AMOLED 6.82\"",
      "Hệ điều hành": "OriginOS 6",
      "Camera sau": "Chính 200 MP & Phụ 50 MP, 200 MP, 5 MP",
      "Camera trước": "50 MP",
      "Chip": "Qualcomm Snapdragon 8 Elite Gen 5 8 nhân",
      "RAM": "16 GB",
      "Dung lượng lưu trữ": "512 GB",
      "SIM": "2 Nano SIM hoặc 2 eSIM hoặc 1 Nano SIM + 1 eSIM",
      "Hỗ trợ 5G": "Có",
      "Pin": "6600 mAh",
      "Sạc": "100W",
    },
  },
];

const KNOWN_BRANDS = ["iPhone", "Samsung", "Xiaomi", "Vivo"];

export default function NewProductEditPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductForm>();

  const selectedBrand = watch("brand");
  const [customBrand, setCustomBrand] = useState("");
  const [seedIndex, setSeedIndex] = useState(0);

  const handleFillSeed = () => {
    const p = SEED_PRODUCTS[seedIndex];
    const specsRaw = Object.entries(p.specs)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const isKnown = KNOWN_BRANDS.includes(p.brand);
    reset({
      name: p.name,
      brand: isKnown ? p.brand : "Khác",
      storage: p.storage,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: p.stock,
      isInstallmentAvailable: p.isInstallmentAvailable,
      description: p.description,
      specsRaw,
    });
    if (!isKnown) setCustomBrand(p.brand);
    setImages(p.images);
    toast.success(`Đã điền dữ liệu mẫu: ${p.name}`);
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!/^https?:\/\/.+/.test(trimmed)) { toast.error("URL không hợp lệ (phải bắt đầu bằng http/https)"); return; }
    setImages((prev) => [...prev, trimmed]);
    setUrlInput("");
    toast.success("Đã thêm ảnh từ URL");
  };

  const onSubmit = async (data: ProductForm) => {
    if (!auth.currentUser) {
      toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại tại /admin", { duration: 6000 });
      return;
    }
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
      name: data.name, brand,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      storage: data.storage, description: data.description,
      isInstallmentAvailable: data.isInstallmentAvailable,
      stock: data.stock ? Number(data.stock) : undefined,
      images: images.length > 0 ? images : [PLACEHOLDER_IMAGE],
      specs,
    };
    console.log("[addProduct] auth uid:", auth.currentUser?.uid);
    console.log("[addProduct] payload:", JSON.stringify(payload, null, 2));
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout: Không thể kết nối đến máy chủ (15s). Kiểm tra VPN / tường lửa / mạng.")), 15000)
    );
    try {
      console.log("[addProduct] calling addDoc...");
      const id = await Promise.race([addProduct(payload), timeoutPromise]);
      console.log("[addProduct] success, id:", id);
      toast.success("Đã thêm sản phẩm");
      router.push("/admin/products");
    } catch (err: unknown) {
      console.error("[addProduct error] raw:", err);
      console.error("[addProduct error] code:", (err as {code?: string})?.code);
      console.error("[addProduct error] message:", err instanceof Error ? err.message : String(err));
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Lỗi: ${msg}`, { duration: 10000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Thêm sản phẩm</h1>
        <div className="flex items-center gap-2">
          {SEED_PRODUCTS.length > 1 && (
            <select
              className="input-field text-sm py-1.5"
              value={seedIndex}
              onChange={(e) => setSeedIndex(Number(e.target.value))}
            >
              {SEED_PRODUCTS.map((p, i) => (
                <option key={i} value={i}>{p.name}</option>
              ))}
            </select>
          )}
          <button
            type="button"
            onClick={handleFillSeed}
            className="btn-secondary text-sm py-2"
          >
            🌱 Fill dữ liệu mẫu
          </button>
        </div>
      </div>
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
                <option value="Vivo">Vivo</option>
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

        {/* Images */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Hình ảnh</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">Không bắt buộc</span>
          </div>

          {/* Thumbnails */}
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
                <button type="button" onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">×</button>
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
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">Huỷ</button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1">
            {submitting ? "Đang lưu..." : "Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}

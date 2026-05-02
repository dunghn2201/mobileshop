"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { getProductById } from "@/lib/firestore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { ProductDetailSkeleton } from "@/components/ui/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    getProductById(params.id)
      .then((p) => {
        if (!p) setError("Không tìm thấy sản phẩm.");
        else setProduct(p);
      })
      .catch(() => setError("Không thể tải thông tin sản phẩm."))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    toast.success(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng`);
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error || !product) return <ErrorMessage message={error || "Lỗi"} />;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">Trang chủ</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Sản phẩm</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="aspect-square relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <Image
              src={product.images[selectedImage] || "https://via.placeholder.com/600x600?text=No+Image"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6"
              priority
            />
            {discount && (
              <span className="absolute top-4 left-4 badge bg-red-500 text-white text-sm px-3 py-1">
                -{discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={64}
                    height={64}
                    className="object-contain p-1 w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-2">
            {product.brand}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-500 text-sm mb-4">Bộ nhớ: {product.storage}</p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-extrabold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Installment */}
          {product.isInstallmentAvailable && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 flex items-center gap-2">
              <span className="text-blue-600 text-xl">💳</span>
              <div>
                <p className="font-semibold text-blue-800 text-sm">Trả góp 0%</p>
                <p className="text-blue-600 text-xs">
                  Từ {formatPrice(Math.ceil(product.price / 12))}/tháng • 12
                  tháng
                </p>
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <p className="text-sm font-medium text-gray-700">Số lượng:</p>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button onClick={handleAddToCart} className="btn-primary flex-1 text-base py-3.5">
              🛒 Thêm vào giỏ
            </button>
            <Link href="/cart" className="btn-outline flex-1 text-center text-base py-3.5">
              Mua ngay
            </Link>
          </div>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Thông số kỹ thuật
              </h3>
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <div
                    key={key}
                    className={`flex text-sm ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <span className="w-1/3 px-4 py-2.5 text-gray-500 font-medium">
                      {key}
                    </span>
                    <span className="w-2/3 px-4 py-2.5 text-gray-900">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Mô tả</h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

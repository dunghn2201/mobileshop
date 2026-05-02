"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    addItem(product);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
    setTimeout(() => setAdding(false), 600);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <Link href={`/products/${product.id}`} className="card group block">
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-gray-50">
        <Image
          src={product.images[0] || "https://via.placeholder.com/400x400?text=No+Image"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <span className="absolute top-2 left-2 badge bg-red-500 text-white">
            -{discount}%
          </span>
        )}
        {product.isInstallmentAvailable && (
          <span className="absolute top-2 right-2 badge bg-primary text-white">
            Trả góp 0%
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wide">
          {product.brand}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{product.storage}</p>

        <div className="mb-3">
          <span className="text-primary font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="ml-2 text-gray-400 text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="flex-1 btn-primary text-sm py-2.5"
          >
            {adding ? "Đang thêm..." : "Mua ngay"}
          </button>
          {product.isInstallmentAvailable && (
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 btn-outline text-sm py-2.5"
            >
              Trả góp
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(10,132,255,0.12)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl bg-white shadow-sm border border-transparent hover:border-primary/10"
    >
      <Link href={`/products/${product.id}`} className="block group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-gray-50">
          <motion.div
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[0] || "https://via.placeholder.com/400x400?text=No+Image"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4"
            />
          </motion.div>

          {discount && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-2 left-2 badge bg-red-500 text-white"
            >
              -{discount}%
            </motion.span>
          )}
          {product.isInstallmentAvailable && (
            <span className="absolute top-2 right-2 badge bg-primary text-white">
              Trả góp 0%
            </span>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
        </div>

        {/* Info */}
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
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 btn-primary text-sm py-2.5"
            >
              {adding ? "Đang thêm..." : "Mua ngay"}
            </motion.button>
            {product.isInstallmentAvailable && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 btn-outline text-sm py-2.5"
              >
                Trả góp
              </motion.button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Giỏ hàng trống
        </h1>
        <p className="text-gray-500 mb-8">
          Hãy chọn sản phẩm yêu thích để thêm vào giỏ hàng
        </p>
        <Link href="/products" className="btn-primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="section-title mb-6">
        Giỏ hàng ({totalItems()} sản phẩm)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="card p-4 flex gap-4 items-start"
            >
              <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                <Image
                  src={product.images[0] || "https://via.placeholder.com/80x80"}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${product.id}`}
                  className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 text-sm"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-gray-500 mt-0.5">{product.storage}</p>
                <p className="text-primary font-bold mt-1">
                  {formatPrice(product.price)}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
                  >
                    Xoá
                  </button>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-bold text-lg text-gray-900 mb-4">
              Tổng đơn hàng
            </h2>

            <div className="space-y-2 text-sm mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between">
                  <span className="text-gray-600 truncate flex-1 mr-2">
                    {product.name} x{quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
              <span className="font-semibold text-gray-900">Tổng cộng</span>
              <span className="text-xl font-extrabold text-primary">
                {formatPrice(totalPrice())}
              </span>
            </div>

            <Link href="/checkout" className="btn-primary w-full text-center block text-base py-3.5">
              Tiến hành thanh toán →
            </Link>

            <Link
              href="/products"
              className="block text-center text-primary text-sm font-medium mt-3 hover:underline"
            >
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

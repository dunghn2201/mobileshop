"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { getProducts, deleteProduct } from "@/lib/firestore";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => toast.error("Không thể tải sản phẩm"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Xoá sản phẩm "${name}"?`)) return;
    try {
      await deleteProduct(id);
      toast.success("Đã xoá sản phẩm");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toast.error("Không thể xoá sản phẩm");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>
        <Link href="/admin/products/new" className="btn-primary text-sm py-2">
          + Thêm sản phẩm
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-4 flex gap-4">
              <div className="skeleton w-16 h-16 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-500">Chưa có sản phẩm nào</p>
          <Link href="/admin/products/new" className="btn-primary mt-4 inline-block">
            Thêm sản phẩm đầu tiên
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Sản phẩm</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Thương hiệu</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Giá</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Bộ nhớ</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                          <Image
                            src={product.images[0] || "https://via.placeholder.com/48x48"}
                            alt={product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <span className="font-medium text-gray-900 line-clamp-1">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                    <td className="px-4 py-3 font-semibold text-primary">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.storage}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="px-3 py-1.5 text-xs font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Xoá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import { getProducts } from "@/lib/firestore";
import { BRAND_FILTERS, PRICE_FILTERS } from "@/constants";
import ProductCard from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "Tất cả"
  );
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(
        selectedBrand !== "Tất cả" ? selectedBrand : undefined
      );
      setProducts(data);
    } catch {
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [selectedBrand]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredProducts = products.filter((p) => {
    const priceFilter = PRICE_FILTERS[selectedPriceIdx];
    return p.price >= priceFilter.min && p.price <= priceFilter.max;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="section-title">Sản phẩm</h1>
        <p className="text-gray-500 mt-1">
          Điện thoại chính hãng, bảo hành đầy đủ
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm space-y-4">
        {/* Brand filter */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Thương hiệu</p>
          <div className="flex flex-wrap gap-2">
            {BRAND_FILTERS.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  selectedBrand === brand
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                )}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Price filter */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Mức giá</p>
          <div className="flex flex-wrap gap-2">
            {PRICE_FILTERS.map((filter, idx) => (
              <button
                key={filter.label}
                onClick={() => setSelectedPriceIdx(idx)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  selectedPriceIdx === idx
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      {!loading && !error && (
        <p className="text-sm text-gray-500 mb-4">
          Tìm thấy{" "}
          <span className="font-semibold text-gray-900">
            {filteredProducts.length}
          </span>{" "}
          sản phẩm
        </p>
      )}

      {/* Error */}
      {error && <ErrorMessage message={error} onRetry={load} />}

      {/* Grid */}
      {!error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : filteredProducts.length === 0
            ? null
            : filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-gray-500">
            Thử thay đổi bộ lọc để xem thêm sản phẩm
          </p>
        </div>
      )}
    </div>
  );
}

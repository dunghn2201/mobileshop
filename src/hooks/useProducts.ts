"use client";

import { useState, useEffect, useCallback } from "react";
import { getProducts, getProductById } from "@/lib/firestore";
import { Product } from "@/types";

export function useProducts(brand?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(brand);
      setProducts(data);
    } catch {
      setError("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  }, [brand]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, error, refetch: load };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getProductById(id)
      .then((p) => {
        if (!p) setError("Không tìm thấy sản phẩm.");
        else setProduct(p);
      })
      .catch(() => setError("Không thể tải thông tin sản phẩm."))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}

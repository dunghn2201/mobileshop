import Link from "next/link";
import { SHOP_INFO } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <div>
                <div className="font-bold text-white">Tuấn Anh Mobile</div>
                <div className="text-xs text-gray-500">Uy tín - Chất lượng</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Chuyên mua bán điện thoại chính hãng và sửa chữa các loại điện
              thoại uy tín, giá tốt tại Ba Đồn, Quảng Bình.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Danh mục</h3>
            <ul className="space-y-2 text-sm">
              {["iPhone", "Samsung", "Xiaomi"].map((brand) => (
                <li key={brand}>
                  <Link
                    href={`/products?brand=${brand}`}
                    className="hover:text-primary transition-colors"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/repair"
                  className="hover:text-primary transition-colors"
                >
                  Dịch vụ sửa chữa
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2 text-sm">
              <li>Thay màn hình zin</li>
              <li>Ép kính – Thẩm mỹ như mới</li>
              <li>Thay pin – Bảo hành 6 tháng</li>
              <li>Thay lưng, thay vỏ</li>
              <li>Sửa main chuyên sâu</li>
              <li>Trả góp 0%</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{SHOP_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {SHOP_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>⏰</span>
                <span>{SHOP_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 Tuấn Anh Mobile. All rights reserved.</p>
          <p>Thiết kế bởi Tuấn Anh Mobile Team</p>
        </div>
      </div>
    </footer>
  );
}

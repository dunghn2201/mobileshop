import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">😕</div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">404</h1>
      <p className="text-xl font-semibold text-gray-700 mb-2">
        Trang không tìm thấy
      </p>
      <p className="text-gray-500 mb-8 max-w-sm">
        Trang bạn đang tìm không tồn tại hoặc đã bị xoá.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link href="/" className="btn-primary">
          Về trang chủ
        </Link>
        <Link href="/products" className="btn-secondary">
          Xem sản phẩm
        </Link>
      </div>
    </div>
  );
}

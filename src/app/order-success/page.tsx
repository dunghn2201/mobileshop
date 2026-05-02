import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="text-7xl mb-6">🎉</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Đặt hàng thành công!
      </h1>
      <p className="text-gray-500 mb-8">
        Cảm ơn bạn đã tin tưởng Tuấn Anh Mobile. Chúng tôi sẽ liên hệ xác nhận
        đơn hàng trong vòng 30 phút.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/products" className="btn-primary">
          Tiếp tục mua sắm
        </Link>
        <Link href="/" className="btn-secondary">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

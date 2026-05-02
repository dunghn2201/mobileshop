"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Đã xảy ra lỗi
          </h1>
          <p className="text-gray-500 mb-8">
            {error.message || "Lỗi không xác định. Vui lòng thử lại."}
          </p>
          <button
            onClick={reset}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </body>
    </html>
  );
}

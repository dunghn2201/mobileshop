interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Đã có lỗi xảy ra
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Thử lại
        </button>
      )}
    </div>
  );
}

import { RepairService } from "@/types";

export const BRAND_FILTERS = ["Tất cả", "iPhone", "Samsung", "Xiaomi"] as const;

export const PRICE_FILTERS = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "Dưới 3 triệu", min: 0, max: 3_000_000 },
  { label: "3 - 7 triệu", min: 3_000_000, max: 7_000_000 },
  { label: "7 - 15 triệu", min: 7_000_000, max: 15_000_000 },
  { label: "Trên 15 triệu", min: 15_000_000, max: Infinity },
];

export const REPAIR_SERVICES: RepairService[] = [
  {
    id: "thay-man-hinh",
    name: "Thay màn hình",
    description: "Thay màn hình zin chính hãng, cảm ứng mượt mà, hiển thị sắc nét. Bảo hành 3-6 tháng",
    icon: "📱",
    priceFrom: 500_000,
    duration: "30-60 phút",
  },
  {
    id: "ep-kinh",
    name: "Ép kính",
    description: "Công nghệ ép kính không hiện đường mờ, không bụi, không bọt. Thẩm mỹ như mới",
    icon: "🔧",
    priceFrom: 150_000,
    duration: "15-30 phút",
  },
  {
    id: "thay-pin",
    name: "Thay pin iPhone",
    description: "Pin dung lượng chuẩn, hiệu năng dùng cao, an toàn tuyệt đối. Bảo hành 6 tháng",
    icon: "🔋",
    priceFrom: 200_000,
    duration: "15-30 phút",
  },
  {
    id: "sua-main",
    name: "Sửa main",
    description: "Xử lý các lỗi phần cứng chuyên sâu: nguồn, sóng, wifi. Kỹ thuật nhiều năm kinh nghiệm",
    icon: "⚙️",
    priceFrom: 300_000,
    duration: "1-2 ngày",
  },
  {
    id: "thay-lung-vo",
    name: "Thay lưng / vỏ",
    description: "Thay lưng, thay vỏ máy – đẹp chuẩn từng góc cạnh, như máy mới",
    icon: "🪪",
    priceFrom: 200_000,
    duration: "30-45 phút",
  },
  {
    id: "sua-loa-micro",
    name: "Sửa loa / micro",
    description: "Khắc phục mất âm thanh, tiếng ồn, không nghe được khi gọi điện",
    icon: "🔊",
    priceFrom: 150_000,
    duration: "20-30 phút",
  },
];

export const STATUS_LABELS = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  "in-progress": "Đang xử lý",
  shipping: "Đang giao",
  delivered: "Đã giao",
  completed: "Hoàn thành",
  cancelled: "Đã huỷ",
} as const;

export const ORDER_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
} as const;

export const BOOKING_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
} as const;

export const SHOP_INFO = {
  name: "Tuấn Anh Mobile",
  phone: "0768678777",
  phoneDisplay: "0768 678 777",
  zalo: "0768678777",
  address: "182 Nguyễn Chí Thanh, Quảng Hòa, Tx Ba Đồn, Quảng Bình",
  addressShort: "182 Nguyễn Chí Thanh, Quảng Hòa, Tx Ba Đồn",
  hours: "7:00 - 21:00 (Mỗi ngày)",
  facebook: "https://facebook.com/tuananhmobile",
  messenger: "https://m.me/tuananhmobile",
} as const;

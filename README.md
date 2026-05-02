# Tuấn Anh Mobile 📱

Website thương mại điện tử + đặt lịch sửa chữa cho cửa hàng điện thoại **Tuấn Anh Mobile** tại Ba Đồn, Quảng Bình.

---

## ✨ Tính năng

- **Trang chủ** — Banner hero, khuyến mãi, dịch vụ nổi bật, SIM 4G/5G & phụ kiện
- **Danh sách sản phẩm** — Lọc theo hãng (iPhone, Samsung, Xiaomi...), tìm kiếm
- **Chi tiết sản phẩm** — Hình ảnh, thông số, thêm vào giỏ hàng
- **Giỏ hàng & Thanh toán** — Persistent cart (Zustand), form đặt hàng
- **Đặt lịch sửa chữa** — Form booking dịch vụ (thay màn hình, thay pin, ép kính...)
- **Trang liên hệ** — Thông tin cửa hàng, bản đồ
- **Admin Panel** — Quản lý sản phẩm, đơn hàng, lịch hẹn

---

## 🛠 Tech Stack

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| [Next.js](https://nextjs.org) | 14.2 | React framework, App Router |
| TypeScript | 5.x | Type safety |
| [TailwindCSS](https://tailwindcss.com) | 3.4 | Styling |
| [Firebase](https://firebase.google.com) | 10.12 | Firestore, Auth, Storage |
| [Zustand](https://zustand-demo.pmnd.rs) | 4.5 | Cart state management |
| react-hook-form | 7.51 | Form handling |
| Swiper | 11.1 | Carousel/slider |
| react-hot-toast | 2.4 | Notifications |

---

## 🚀 Cài đặt & Chạy

### 1. Clone repo

```bash
git clone git@github.com:dunghn2201/mobileshop.git
cd mobileshop
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình Firebase

Sao chép file env mẫu và điền credentials Firebase:

```bash
cp .env.local.example .env.local
```

Chỉnh sửa `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Chạy dev server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

---

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin panel (login, dashboard, products, orders, bookings)
│   ├── products/           # Danh sách & chi tiết sản phẩm
│   ├── repair/             # Đặt lịch sửa chữa
│   ├── cart/               # Giỏ hàng
│   ├── checkout/           # Thanh toán
│   └── contact/            # Liên hệ
├── components/
│   ├── layout/             # Navbar, Footer, FloatingActions
│   └── ui/                 # ProductCard, Skeleton, ErrorMessage
├── constants/              # Thông tin cửa hàng, danh sách dịch vụ
├── hooks/                  # useProducts, useAuth, useFirestore
├── lib/                    # Firebase config, Firestore CRUD, utils
├── store/                  # Zustand cart store
└── types/                  # TypeScript types
```

---

## 🔐 Admin

Truy cập `/admin` → đăng nhập bằng tài khoản Firebase Authentication.

Tính năng admin:
- Thêm/sửa/xóa sản phẩm (kèm upload ảnh)
- Xem & cập nhật trạng thái đơn hàng
- Xem & xử lý lịch hẹn sửa chữa

---

## 📞 Thông tin cửa hàng

- **Địa chỉ:** 182 Nguyễn Chí Thanh, Quảng Hòa, Tx Ba Đồn, Quảng Bình
- **Điện thoại:** 0768 678 777
- **Giờ mở cửa:** 7:00 - 21:00 (Mỗi ngày)

---

## 📄 License

MIT


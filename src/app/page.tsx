"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { REPAIR_SERVICES, SHOP_INFO } from "@/constants";
import { formatPrice } from "@/lib/utils";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  stagger,
  staggerFast,
  viewportConfig,
} from "@/lib/animations";

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary overflow-hidden">
      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              🏆 Uy tín hơn 10 năm kinh nghiệm
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Mua bán &amp;{" "}
              <span className="text-yellow-300">Sửa chữa</span>
              <br />
              điện thoại uy tín
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/80 text-lg mb-8 max-w-lg">
              iPhone, Samsung, Xiaomi chính hãng. Bảo hành chính thức. Trả góp
              0% duyệt nhanh.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/products" className="btn-primary bg-white text-primary hover:bg-gray-100 text-base shadow-lg shadow-black/20">
                  Xem sản phẩm
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/repair" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-base">
                  Đặt lịch sửa chữa
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerFast}
              className="flex gap-8 mt-10 justify-center md:justify-start"
            >
              {[
                { value: "10+", label: "Năm kinh nghiệm" },
                { value: "5000+", label: "Khách hàng" },
                { value: "99%", label: "Hài lòng" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={scaleIn} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Phone graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="flex-1 flex justify-center relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
              <div className="absolute inset-4 flex items-center justify-center text-8xl select-none">
                📱
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Highlight ───────────────────────────────────────────────────────
function ServicesHighlight() {
  const featured = REPAIR_SERVICES.slice(0, 4);
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-10"
        >
          <h2 className="section-title">Dịch vụ sửa chữa</h2>
          <p className="text-gray-500 mt-2">Sửa chữa chuyên nghiệp, bảo hành minh bạch</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {featured.map((svc) => (
            <motion.div key={svc.id} variants={scaleIn}>
              <Link
                href={`/repair#${svc.id}`}
                className="card p-6 text-center group hover:border-primary hover:border-2 transition-all block h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="text-4xl mb-3"
                >
                  {svc.icon}
                </motion.div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{svc.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{svc.description}</p>
                <p className="text-primary font-semibold text-sm mt-2">
                  Từ {formatPrice(svc.priceFrom)}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mt-8"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/repair" className="btn-outline">
              Xem tất cả dịch vụ →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Promo Banner ─────────────────────────────────────────────────────────────
function PromoBanner() {
  const promos = [
    { icon: "💳", title: "Trả góp 0%", desc: "Duyệt nhanh, thủ tục đơn giản", color: "bg-blue-50 border-blue-100" },
    { icon: "🛡️", title: "Bảo hành chính hãng", desc: "Bảo hành 12-24 tháng", color: "bg-green-50 border-green-100" },
    { icon: "🚀", title: "Giao hàng nhanh", desc: "Nội thành TP.HCM trong 2 giờ", color: "bg-orange-50 border-orange-100" },
    { icon: "🔧", title: "Sửa chữa uy tín", desc: "Thợ lành nghề, bảo hành linh kiện", color: "bg-purple-50 border-purple-100" },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {promos.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
              className={`border rounded-2xl p-5 flex items-start gap-3 ${p.color} cursor-default`}
            >
              <motion.span
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="text-2xl flex-shrink-0"
              >
                {p.icon}
              </motion.span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{p.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Brand Showcase ───────────────────────────────────────────────────────────
function BrandShowcase() {
  const brands = [
    { name: "iPhone", emoji: "🍎", desc: "iPhone 15, 14, 13 Series" },
    { name: "Samsung", emoji: "📱", desc: "Galaxy S24, A55, A35" },
    { name: "Xiaomi", emoji: "📲", desc: "Redmi Note 13, 14 Series" },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-10"
        >
          <h2 className="section-title">Thương hiệu</h2>
          <p className="text-gray-500 mt-2">Chọn thương hiệu bạn yêu thích</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={scaleIn}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(10,132,255,0.12)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/products?brand=${brand.name}`}
                className="card p-8 text-center group block border border-transparent hover:border-primary/20 transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-6xl mb-4"
                >
                  {brand.emoji}
                </motion.div>
                <h3 className="font-bold text-xl text-gray-900 mb-1">{brand.name}</h3>
                <p className="text-gray-500 text-sm">{brand.desc}</p>
                <div className="mt-4 text-primary font-semibold text-sm group-hover:underline">
                  Xem tất cả →
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── SIM & Accessories Section ────────────────────────────────────────────────
function SimAccessoriesSection() {
  const sims = [
    { carrier: "Viettel", name: "SIM 4G Viettel V120N", desc: "4GB/Ngày, Free thoại nội mạng", price: 150_000, color: "bg-red-50 border-red-100", badge: "bg-red-600" },
    { carrier: "Mobi", name: "SIM 4G MobiFone 6FD60", desc: "2GB/Ngày, Free thoại nội mạng", price: 120_000, color: "bg-blue-50 border-blue-100", badge: "bg-blue-600" },
    { carrier: "Vina", name: "SIM 4G Vinaphone MDT149", desc: "2GB/Ngày, miễn phí gọi nội mạng", price: 120_000, color: "bg-purple-50 border-purple-100", badge: "bg-purple-600" },
    { carrier: "Itelecom", name: "SIM 5G Reddi R279", desc: "4GB/Ngày, Miễn phí gọi toàn mạng", price: 279_000, color: "bg-green-50 border-green-100", badge: "bg-green-600" },
  ];

  const accessories = [
    { name: "Cáp sạc iPhone 20W", price: 250_000, icon: "🔌" },
    { name: "Ốp lưng MagSafe", price: 180_000, icon: "📱" },
    { name: "Cường lực full keo", price: 80_000, icon: "🔲" },
    { name: "Sạc không dây 15W", price: 350_000, icon: "⚡" },
  ];

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="section-title">SIM 4G, 5G &amp; Phụ kiện</h2>
            <p className="text-gray-500 mt-1 text-sm">SIM chính hãng, phụ kiện chất lượng cao</p>
          </div>
          <Link href="/products" className="text-primary font-semibold text-sm hover:underline hidden sm:block">
            Xem tất cả →
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* SIM Cards */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📶</span>
              <h3 className="font-bold text-gray-900">SIM 4G &amp; 5G</h3>
            </div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-3">
              {sims.map((sim) => (
                <motion.div
                  key={sim.name}
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                  className={`flex items-center justify-between p-3 rounded-xl border ${sim.color} cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${sim.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                      {sim.carrier}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{sim.name}</p>
                      <p className="text-xs text-gray-500">{sim.desc}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-primary font-bold text-sm">{formatPrice(sim.price)}</p>
                    <p className="text-xs text-gray-400">/tháng</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Accessories */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🎧</span>
              <h3 className="font-bold text-gray-900">Phụ kiện chính hãng</h3>
            </div>
            <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-2 gap-3">
              {accessories.map((acc) => (
                <motion.div
                  key={acc.name}
                  variants={scaleIn}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.97 }}
                  className="card p-4 flex flex-col items-center text-center gap-2 cursor-pointer border border-transparent hover:border-primary/20"
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    className="text-3xl"
                  >
                    {acc.icon}
                  </motion.span>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{acc.name}</p>
                  <p className="text-primary font-bold text-sm">{formatPrice(acc.price)}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Repair Banner ────────────────────────────────────────────────────────────
function RepairBanner() {
  const services = [
    { icon: "📱", label: "Thay màn hình zin" },
    { icon: "🔲", label: "Ép kính – Thẩm mỹ như mới" },
    { icon: "🔋", label: "Thay pin – Bảo hành 6 tháng" },
    { icon: "🪪", label: "Thay lưng, thay vỏ" },
    { icon: "⚙️", label: "Xử lý main chuyên sâu" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="bg-gradient-to-r from-primary-900 to-primary rounded-3xl overflow-hidden relative"
        >
          {/* shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none" />
          <div className="px-6 py-10 md:px-12 md:py-12">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="flex-1"
              >
                <p className="text-primary-200 text-sm font-semibold uppercase tracking-widest mb-3">
                  Dịch vụ sửa chữa
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4">
                  Điện thoại vỡ kính? Màn hình hỏng?
                  <br />
                  <span className="text-yellow-300">Tuấn Anh Mobile chuyên xử lý!</span>
                </h2>
                <motion.div
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {services.map((s) => (
                    <motion.span
                      key={s.label}
                      variants={scaleIn}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                      className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 cursor-default"
                    >
                      {s.icon} {s.label}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="flex-shrink-0 flex flex-col sm:flex-row md:flex-col gap-3"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/repair" className="btn-primary bg-white text-primary hover:bg-gray-100 text-center block">
                    Đặt lịch sửa chữa
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <a href="tel:0768678777" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-center block">
                    📞 0768 678 777
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary-600 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="relative max-w-2xl mx-auto px-4"
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-4">
          Điện thoại hỏng? Đừng lo!
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/80 mb-8">
          Đặt lịch sửa chữa online — chúng tôi liên hệ xác nhận trong vòng 15 phút
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link href="/repair" className="btn-primary bg-white text-primary hover:bg-gray-100 shadow-lg shadow-black/20">
              Đặt lịch ngay
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <a href={`tel:${SHOP_INFO.phone}`} className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              Gọi: {SHOP_INFO.phoneDisplay}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromoBanner />
      <ServicesHighlight />
      <RepairBanner />
      <BrandShowcase />
      <SimAccessoriesSection />
      <CTASection />
    </>
  );
}

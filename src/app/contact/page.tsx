import { SHOP_INFO } from "@/constants";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="section-title mb-3">Liên hệ</h1>
        <p className="text-gray-500">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {[
            { icon: "📍", title: "Địa chỉ", value: SHOP_INFO.address },
            { icon: "📞", title: "Hotline", value: SHOP_INFO.phone, href: `tel:${SHOP_INFO.phone}` },
            { icon: "⏰", title: "Giờ làm việc", value: SHOP_INFO.hours },
            { icon: "💬", title: "Zalo", value: `Zalo: ${SHOP_INFO.zalo}`, href: `https://zalo.me/${SHOP_INFO.zalo}` },
          ].map((item) => (
            <div key={item.title} className="card p-5 flex gap-4">
              <div className="text-2xl flex-shrink-0">{item.icon}</div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</p>
                {item.href ? (
                  <a href={item.href} className="text-primary font-medium hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-600 text-sm">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-5">Gửi tin nhắn</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ tên</label>
              <input type="text" className="input-field" placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại</label>
              <input type="tel" className="input-field" placeholder="0901234567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nội dung</label>
              <textarea rows={4} className="input-field resize-none" placeholder="Tôi cần hỏi về..." />
            </div>
            <a href={`tel:${SHOP_INFO.phone}`} className="btn-primary w-full text-center block py-3">
              Gọi ngay: {SHOP_INFO.phone}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

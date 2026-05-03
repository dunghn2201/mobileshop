"use client";

import { motion } from "framer-motion";
import { SHOP_INFO } from "@/constants";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">
      {/* Zalo */}
      <motion.a
        href={`https://zalo.me/${SHOP_INFO.zalo}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 bg-[#0068FF] text-white rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center"
      >
        <span className="font-extrabold text-sm tracking-tight">Za</span>
        {/* pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-30" />
      </motion.a>

      {/* Messenger */}
      <motion.a
        href={SHOP_INFO.messenger}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Messenger"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-gradient-to-br from-[#00C6FF] to-[#0078FF] text-white rounded-full shadow-lg shadow-blue-400/40 flex items-center justify-center"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78a.5.5 0 00.7.44l1.98-.87a.49.49 0 01.33-.04c.91.25 1.87.38 2.86.38C17.64 21 22 16.87 22 11.3 22 5.73 17.64 2 12 2z" />
          <path
            fill="#fff"
            d="M6.5 14.5l3.51-5.57a1.5 1.5 0 012.16-.38l2.79 2.09a.6.6 0 00.72 0l3.77-2.86c.5-.38 1.15.22.81.75L16.75 14a1.5 1.5 0 01-2.16.39l-2.79-2.1a.6.6 0 00-.72 0l-3.77 2.86c-.5.38-1.15-.22-.81-.75z"
          />
        </svg>
      </motion.a>

      {/* Phone call */}
      <motion.a
        href={`tel:${SHOP_INFO.phone}`}
        aria-label="Gọi điện"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
        {/* double pulse ring */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
      </motion.a>
    </div>
  );
}

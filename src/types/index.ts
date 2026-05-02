import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  brand: "iPhone" | "Samsung" | "Xiaomi" | "Khác";
  price: number;
  originalPrice?: number;
  storage: string; // e.g. "6GB + 128GB"
  images: string[];
  description: string;
  specs?: Record<string, string>;
  isInstallmentAvailable?: boolean;
  stock?: number;
  createdAt: Timestamp | Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  items: CartItem[];
  totalPrice: number;
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
  createdAt: Timestamp | Date;
}

export interface Booking {
  id?: string;
  name: string;
  phone: string;
  device: string;
  issue: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  note?: string;
  createdAt: Timestamp | Date;
}

export interface User {
  uid: string;
  email: string;
  role: "admin" | "customer";
}

export interface RepairService {
  id: string;
  name: string;
  description: string;
  icon: string;
  priceFrom: number;
  duration: string;
  warranty?: string;
  order?: number;
}

export interface ShopSettings {
  phone: string;
  phoneDisplay: string;
  address: string;
  addressShort: string;
  hours: string;
  mapUrl?: string;
  facebookUrl?: string;
  zaloUrl?: string;
  aboutText?: string;
}

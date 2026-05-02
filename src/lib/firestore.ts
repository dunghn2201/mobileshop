import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Query,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import { Product, Order, Booking, ShopSettings, RepairService } from "@/types";

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(brand?: string): Promise<Product[]> {
  let q: Query<DocumentData> = collection(db, "products");
  if (brand && brand !== "Tất cả") {
    q = query(q, where("brand", "==", brand), orderBy("createdAt", "desc"));
  } else {
    q = query(q, orderBy("createdAt", "desc"));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, "products", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Product) : null;
}

export async function addProduct(
  data: Omit<Product, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "products"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<void> {
  await updateDoc(doc(db, "products", id), data);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, "products", id));
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function createOrder(
  data: Omit<Order, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "orders"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<void> {
  await updateDoc(doc(db, "orders", id), { status });
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export async function createBooking(
  data: Omit<Booking, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "bookings"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getBookings(): Promise<Booking[]> {
  const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<void> {
  await updateDoc(doc(db, "bookings", id), { status });
}

// ─── Shop Settings ────────────────────────────────────────────────────────────

export async function getShopSettings(): Promise<ShopSettings | null> {
  const snap = await getDoc(doc(db, "settings", "shop"));
  return snap.exists() ? (snap.data() as ShopSettings) : null;
}

export async function updateShopSettings(data: ShopSettings): Promise<void> {
  await setDoc(doc(db, "settings", "shop"), data, { merge: true });
}

// ─── Repair Services (Firestore-managed) ─────────────────────────────────────

export async function getRepairServicesDB(): Promise<RepairService[]> {
  const q = query(
    collection(db, "repairServices"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as RepairService));
}

export async function addRepairService(
  data: Omit<RepairService, "id">
): Promise<string> {
  const docRef = await addDoc(collection(db, "repairServices"), data);
  return docRef.id;
}

export async function updateRepairService(
  id: string,
  data: Partial<Omit<RepairService, "id">>
): Promise<void> {
  await updateDoc(doc(db, "repairServices", id), data);
}

export async function deleteRepairService(id: string): Promise<void> {
  await deleteDoc(doc(db, "repairServices", id));
}

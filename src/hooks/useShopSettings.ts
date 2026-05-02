"use client";

import { useState, useEffect } from "react";
import { getShopSettings } from "@/lib/firestore";
import { SHOP_INFO } from "@/constants";
import { ShopSettings } from "@/types";

const DEFAULT_SETTINGS: ShopSettings = {
  phone: SHOP_INFO.phone,
  phoneDisplay: SHOP_INFO.phoneDisplay,
  address: SHOP_INFO.address,
  addressShort: SHOP_INFO.addressShort,
  hours: SHOP_INFO.hours,
};

export function useShopSettings(): ShopSettings {
  const [settings, setSettings] = useState<ShopSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    getShopSettings()
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(() => {
        // fallback to constants if Firestore unavailable
      });
  }, []);

  return settings;
}

import { useContext } from "react";
import { BrandContext } from "@/context/BrandProvider";
import { getBrand, DEFAULT_BRAND_ID } from "@/brands";

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (ctx) {
    return ctx;
  }
  const brand = getBrand(DEFAULT_BRAND_ID);
  return { brand, brandId: brand.id };
}

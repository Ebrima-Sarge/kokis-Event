import { createContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getBrand } from "@/brands";
import { applyBrand } from "@/brands/applyTheme";

/** @type {import('react').Context<{ brand: import('@/brands/types').BrandConfig, brandId: string } | null>} */
export const BrandContext = createContext(null);

export function BrandProvider({ children }) {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("brand");
  const brand = useMemo(() => getBrand(slug), [slug]);
  const brandId = brand.id;

  useEffect(() => {
    applyBrand(brand);
  }, [brand]);

  const value = useMemo(() => ({ brand, brandId }), [brand, brandId]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

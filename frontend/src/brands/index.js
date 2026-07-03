import kokis from "./kokis";
import apex from "./apex";
import showsecurity from "./showsecurity";

export const DEFAULT_BRAND_ID = "kokis";

/** @type {Record<string, import('./types').BrandConfig>} */
const brands = {
  kokis,
  apex,
  showsecurity,
};

/** @param {string | null | undefined} slug */
export function getBrand(slug) {
  if (slug && brands[slug]) {
    return brands[slug];
  }
  return brands[DEFAULT_BRAND_ID];
}

export { kokis, apex, showsecurity };

import { useSearchParams } from "react-router-dom";

export function useBrandLink(path) {
  const [params] = useSearchParams();
  const brand = params.get("brand");
  return brand ? `${path}?brand=${brand}` : path;
}

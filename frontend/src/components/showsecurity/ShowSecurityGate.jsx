import { Navigate } from "react-router-dom";
import { useBrand } from "@/hooks/useBrand";

export default function ShowSecurityGate({ children }) {
  const { brandId } = useBrand();

  if (brandId !== "showsecurity") {
    return <Navigate to="/" replace />;
  }

  return children;
}

import type { Metadata } from "next";
import { FurnitureSalesPage } from "@/components/product/furniture-sales-page";
import { furnitureDemoProduct } from "@/data/furniture-demo";

export const metadata: Metadata = {
  title: "ERGO N1 — Furniture Demo | Interactive Sales Kit",
  description:
    "Contoh fiktif presentasi interaktif untuk produk furniture dalam Interactive Sales Kit Indonesia Demo.",
};

export default function FurniturePage() {
  return <FurnitureSalesPage product={furnitureDemoProduct} />;
}

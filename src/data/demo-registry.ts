import type { SalesKitDemo } from "@/types/sales-kit";

export const salesKitDemos: SalesKitDemo[] = [
  {
    order: 1,
    slug: "furniture",
    href: "/furniture",
    sampleLabel: "Sample 01",
    title: "Furniture Product",
    category: "Produk Fisik",
    type: "physical-product",
    description:
      "Contoh presentasi produk furniture dengan fitur, spesifikasi, varian, QR, 3D, dan AR.",
    capabilities: ["Product", "Variants", "3D", "AR", "QR"],
    status: "active",
    fictional: true,
  },
  {
    order: 2,
    slug: "hospitality",
    href: "/hospitality",
    sampleLabel: "Sample 02",
    title: "Hospitality Package",
    category: "Produk Jasa",
    type: "service-package",
    description:
      "Contoh presentasi paket venue atau hospitality melalui gallery, paket, perbandingan, proposal, dan QR.",
    capabilities: ["Packages", "Comparison", "Gallery", "PDF", "QR"],
    status: "coming-soon",
    fictional: true,
  },
  {
    order: 3,
    slug: "industrial",
    href: "/industrial",
    sampleLabel: "Sample 03",
    title: "Technical Product",
    category: "Produk Teknik",
    type: "technical-product",
    description:
      "Contoh penjelasan produk mesin atau equipment dengan spesifikasi teknis, hotspot, aplikasi, dan datasheet.",
    capabilities: ["3D", "Hotspots", "Specs", "Applications", "Datasheet"],
    status: "coming-soon",
    fictional: true,
  },
  {
    order: 4,
    slug: "insurance",
    href: "/insurance",
    sampleLabel: "Sample 04",
    title: "Insurance Concept",
    category: "Konsep Produk Finansial",
    type: "financial-concept",
    description:
      "Contoh cara menjelaskan produk jasa melalui kebutuhan, skenario, perbandingan manfaat, ilustrasi, dan ringkasan.",
    capabilities: ["Scenario", "Comparison", "Benefits", "Illustration", "PDF"],
    status: "coming-soon",
    fictional: true,
  },
];

export function getDemo(slug: string) {
  return salesKitDemos.find((demo) => demo.slug === slug);
}

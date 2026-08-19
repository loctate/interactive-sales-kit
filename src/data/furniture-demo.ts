import type { FurnitureDemoProduct } from "@/types/furniture";

export const furnitureDemoProduct: FurnitureDemoProduct = {
  fictional: true,
  brand: "NUSAKARYA",
  model: "ERGO N1",
  category: "Kursi Kerja Ergonomis",
  tagline: "Dirancang untuk kenyamanan kerja sehari-hari.",
  description:
    "Contoh kursi kerja ergonomis untuk menunjukkan bagaimana sebuah produk fisik dapat dipresentasikan melalui informasi produk, fitur, varian, spesifikasi, QR, 3D, dan augmented reality.",
  priceLabel: "Harga simulasi mulai Rp2.490.000",

  features: [
    {
      id: "headrest",
      title: "Sandaran Kepala Adjustable",
      description: "Posisi sandaran kepala dapat disesuaikan untuk membantu menopang kepala dan leher selama bekerja.",
    },
    {
      id: "lumbar",
      title: "Dukungan Lumbar",
      description: "Area sandaran pinggang dirancang untuk membantu mempertahankan posisi duduk yang lebih nyaman.",
    },
    {
      id: "armrest",
      title: "Armrest Adjustable",
      description: "Ketinggian armrest dapat disesuaikan mengikuti kebutuhan posisi kerja pengguna.",
    },
    {
      id: "recline",
      title: "Reclining Mechanism",
      description: "Mekanisme reclining memberikan pilihan posisi duduk yang lebih fleksibel sepanjang aktivitas kerja.",
    },
    {
      id: "height",
      title: "Pengaturan Tinggi Dudukan",
      description: "Tinggi dudukan dapat diatur agar lebih sesuai dengan meja kerja dan postur pengguna.",
    },
    {
      id: "base",
      title: "Basis Lima Titik",
      description: "Basis lima titik dengan roda dirancang untuk memberikan mobilitas dan stabilitas penggunaan sehari-hari.",
    },
  ],

  specifications: [
    { label: "Model", value: "ERGO N1" },
    { label: "Jenis", value: "Kursi kerja ergonomis" },
    { label: "Material Sandaran", value: "Mesh sintetis" },
    { label: "Material Dudukan", value: "Fabric + molded foam" },
    { label: "Armrest", value: "Height adjustable" },
    { label: "Mekanisme", value: "Tilt + reclining lock" },
    { label: "Beban Simulasi", value: "Maks. 120 kg" },
    { label: "Garansi Simulasi", value: "2 tahun" },
  ],

  dimensions: [
    { label: "Lebar Total", value: "68 cm" },
    { label: "Kedalaman Total", value: "66 cm" },
    { label: "Tinggi Total", value: "113–123 cm" },
    { label: "Lebar Dudukan", value: "50 cm" },
    { label: "Kedalaman Dudukan", value: "49 cm" },
    { label: "Tinggi Dudukan", value: "44–54 cm" },
  ],

  variants: [
    { id: "graphite", name: "Graphite", colorLabel: "Hitam Graphite", hex: "#282A2D" },
    { id: "slate", name: "Slate", colorLabel: "Abu Slate", hex: "#777A7E" },
    { id: "sand", name: "Sand", colorLabel: "Beige Sand", hex: "#C6B59D" },
  ],

  useCases: [
    "Ruang kerja kantor",
    "Home office",
    "Ruang meeting",
    "Coworking space",
  ],

  sales: {
    brochureLabel: "Download Brosur",
    presentationLabel: "Mode Presentasi",
    whatsappLabel: "Hubungi Sales via WhatsApp",
    whatsappEnabled: false,
  },
};

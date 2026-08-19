export type FurnitureVariant = {
  id: string;
  name: string;
  colorLabel: string;
  hex: string;
};

export type FurnitureFeature = {
  id: string;
  title: string;
  description: string;
};

export type FurnitureSpecification = {
  label: string;
  value: string;
};

export type FurnitureDimension = {
  label: string;
  value: string;
};

export type FurnitureDemoProduct = {
  fictional: true;
  brand: string;
  model: string;
  category: string;
  tagline: string;
  description: string;
  priceLabel: string;
  features: FurnitureFeature[];
  specifications: FurnitureSpecification[];
  dimensions: FurnitureDimension[];
  variants: FurnitureVariant[];
  useCases: string[];
  sales: {
    brochureLabel: string;
    brochureHref: string;
    presentationLabel: string;
    qrLabel: string;
    qrTarget: string | null;
    whatsappLabel: string;
    whatsappEnabled: boolean;
    whatsappNumber: string | null;
    whatsappMessage: string;
  };
};

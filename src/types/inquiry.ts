export type ProductInquiryDraft = {
  name: string;
  company: string;
  useCase: string;
  quantity: number;
  notes: string;
};

export type ProductInquiryContext = {
  productLabel: string;
  activeVariantLabel: string;
  priceLabel: string;
};

export type ProductInquirySummary = ProductInquiryContext &
  ProductInquiryDraft;

export type ProductInquiryRecord = {
  schemaVersion: "1.0";
  source: "interactive-sales-kit";
  demo: true;
  customer: {
    name: string;
    company: string | null;
  };
  product: {
    label: string;
    variant: string;
    priceLabel: string;
    useCase: string;
    quantity: number;
  };
  notes: string | null;
};

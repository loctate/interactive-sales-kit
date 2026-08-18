export type DemoType =
  | "physical-product"
  | "service-package"
  | "technical-product"
  | "financial-concept";

export type DemoStatus = "active" | "coming-soon";

export type SalesKitDemo = {
  order: number;
  slug: string;
  href: string;
  sampleLabel: string;
  title: string;
  category: string;
  type: DemoType;
  description: string;
  capabilities: string[];
  status: DemoStatus;
  fictional: true;
};

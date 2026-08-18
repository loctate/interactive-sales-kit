import { SamplePlaceholder } from "@/components/sales-kit/sample-placeholder";
import { getDemo } from "@/data/demo-registry";

export default function IndustrialPage() {
  const demo = getDemo("industrial");
  if (!demo) return null;
  return <SamplePlaceholder demo={demo} />;
}

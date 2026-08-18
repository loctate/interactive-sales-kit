import { SamplePlaceholder } from "@/components/sales-kit/sample-placeholder";
import { getDemo } from "@/data/demo-registry";

export default function InsurancePage() {
  const demo = getDemo("insurance");
  if (!demo) return null;
  return <SamplePlaceholder demo={demo} />;
}

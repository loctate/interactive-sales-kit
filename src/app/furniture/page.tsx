import { SamplePlaceholder } from "@/components/sales-kit/sample-placeholder";
import { getDemo } from "@/data/demo-registry";

export default function FurniturePage() {
  const demo = getDemo("furniture");
  if (!demo) return null;
  return <SamplePlaceholder demo={demo} />;
}

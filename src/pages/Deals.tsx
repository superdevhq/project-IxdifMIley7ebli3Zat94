
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DealsPipeline from "@/components/Deals/DealsPipeline";

const Deals = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Deals Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <DealsPipeline />
        </CardContent>
      </Card>
    </div>
  );
};

export default Deals;

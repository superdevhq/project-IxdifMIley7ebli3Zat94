
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyList from "@/components/Companies/CompanyList";

const Companies = () => {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Companies;

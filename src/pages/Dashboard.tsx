
import { useData } from "@/context/DataContext";
import Stats from "@/components/Dashboard/Stats";
import CompanyList from "@/components/Companies/CompanyList";
import ContactList from "@/components/Contacts/ContactList";
import DealsPipeline from "@/components/Deals/DealsPipeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { companies, contacts, deals } = useData();

  // Calculate stats
  const totalRevenue = deals
    .filter(deal => deal.stage === "Closed Won")
    .reduce((sum, deal) => sum + parseInt(deal.value.replace(/[^0-9]/g, "")), 0);

  const activeDeals = deals.filter(deal => 
    !["Closed Won", "Closed Lost"].includes(deal.stage)
  ).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      icon: "dollar",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Companies",
      value: companies.length.toString(),
      change: "+8.2%",
      icon: "building",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Contacts",
      value: contacts.length.toString(),
      change: "+24.3%",
      icon: "users",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Active Deals",
      value: activeDeals.toString(),
      change: "+4.6%",
      icon: "chart",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <Stats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Recent Companies</CardTitle>
            <Link to="/companies">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <CompanyList limit={5} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Recent Contacts</CardTitle>
            <Link to="/contacts">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <ContactList limit={5} />
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Deal Pipeline</CardTitle>
          <Link to="/deals">
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] overflow-x-auto">
            <div className="min-w-[900px]">
              <DealsPipeline compact={true} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

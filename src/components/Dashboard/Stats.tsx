
import { DollarSign, Building2, Users, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Stats = () => {
  // Mock data for stats
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,780",
      change: "+12.5%",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Companies",
      value: "42",
      change: "+8.2%",
      icon: <Building2 className="h-5 w-5" />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Contacts",
      value: "128",
      change: "+24.3%",
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Active Deals",
      value: "16",
      change: "+4.6%",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs font-medium text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Stats;

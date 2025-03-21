
import { DollarSign, Building2, Users, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

interface StatsProps {
  stats: StatItem[];
}

const Stats = ({ stats }: StatsProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "dollar":
        return <DollarSign className="h-5 w-5" />;
      case "building":
        return <Building2 className="h-5 w-5" />;
      case "users":
        return <Users className="h-5 w-5" />;
      case "chart":
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

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
                {getIcon(stat.icon)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Stats;


import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

const DashboardCard = ({ title, children, action, className }: DashboardCardProps) => {
  return (
    <Card className={`border-none shadow-sm ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-semibold text-gray-700">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;

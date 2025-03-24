
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  change?: {
    value: number;
    positive: boolean;
  };
}

export const StatCard = ({ title, value, icon, color, change }: StatCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="py-6 px-5 flex flex-col justify-between flex-1">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
            {change && (
              <div className="flex items-center">
                <span
                  className={cn(
                    "text-xs font-medium",
                    change.positive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {change.positive ? "+" : "-"}{change.value}%
                </span>
                <span className="text-xs text-gray-400 ml-1">from last month</span>
              </div>
            )}
          </div>
          <div className={cn("w-16 flex items-center justify-center", color)}>
            <div className="text-white">{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

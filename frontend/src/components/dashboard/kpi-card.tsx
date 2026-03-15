import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  color?: "green" | "blue" | "amber" | "red";
  isLoading?: boolean;
}

const colorClasses = {
  green: "bg-green-50 text-green-600 border-green-200",
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  amber: "bg-amber-50 text-amber-600 border-amber-200",
  red: "bg-red-50 text-red-600 border-red-200",
};

const iconColorClasses = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  amber: "bg-amber-100 text-amber-600",
  red: "bg-red-100 text-red-600",
};

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "green",
  isLoading = false,
}: KpiCardProps) {
  if (isLoading) {
    return (
      <div className={cn("p-4 rounded-lg border", colorClasses[color])}>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-3 w-20" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 rounded-lg border transition-transform hover:scale-105",
        colorClasses[color]
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium opacity-80">{title}</span>
        {Icon && (
          <div className={cn("p-2 rounded-lg", iconColorClasses[color])}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-xs opacity-70 mt-1">{subtitle}</p>}
    </div>
  );
}

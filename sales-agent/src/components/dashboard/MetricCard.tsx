"use client";

import { ReactNode } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend: number; // Percentage change (positive or negative)
  data: number[]; // Array of data points for sparkline
  trendLabel?: string; // e.g. "vs yesterday"
  isGoodTrendUp?: boolean; // If true, up is green. If false, up is red (e.g. bounce rate)
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  data,
  trendLabel = "vs last week",
  isGoodTrendUp = true,
}: MetricCardProps) {
  const isPositive = trend >= 0;
  const isGood = isPositive === isGoodTrendUp;
  
  const formattedData = data.map((value, index) => ({ value, index }));
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-border/40 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/5 rounded-lg text-muted-foreground">
              {icon}
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className="h-8 w-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isGood ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">{value}</span>
          <div className={`flex items-center text-xs font-medium ${isGood ? "text-accent" : "text-destructive"}`}>
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-0.5" />
            )}
            {Math.abs(trend)}%
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          {trendLabel}
        </p>
      </CardContent>
    </Card>
  );
}

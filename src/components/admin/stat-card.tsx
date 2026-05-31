import { ArrowDownRight, ArrowUpRight, type LucideIcon, Activity, TrendingUp, Users, Wallet } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type KpiVariant = "violet" | "blue" | "emerald" | "amber" | "rose";

const VARIANT_ORDER: KpiVariant[] = ["violet", "blue", "emerald", "amber", "rose"];

const variantStyles: Record<
  KpiVariant,
  { surface: string; icon: string; spark: string; glow: string; Icon: LucideIcon }
> = {
  violet: {
    surface: "kpi-surface-violet",
    icon: "bg-primary/15 text-primary",
    spark: "var(--primary)",
    glow: "from-primary/20",
    Icon: TrendingUp,
  },
  blue: {
    surface: "kpi-surface-blue",
    icon: "bg-violet/15 text-violet",
    spark: "var(--violet)",
    glow: "from-violet/20",
    Icon: Activity,
  },
  emerald: {
    surface: "kpi-surface-emerald",
    icon: "bg-success/15 text-success",
    spark: "var(--success)",
    glow: "from-success/20",
    Icon: Users,
  },
  amber: {
    surface: "kpi-surface-amber",
    icon: "bg-warning/15 text-warning",
    spark: "var(--warning)",
    glow: "from-warning/20",
    Icon: Wallet,
  },
  rose: {
    surface: "kpi-surface-rose",
    icon: "bg-destructive/10 text-destructive",
    spark: "var(--destructive)",
    glow: "from-destructive/15",
    Icon: Activity,
  },
};

export function StatCard({
  label,
  value,
  trend,
  positive,
  spark,
  variant,
  index = 0,
}: {
  label: string;
  value: string;
  trend: number;
  positive: boolean;
  spark: number[];
  variant?: KpiVariant;
  index?: number;
}) {
  const v = variant ?? VARIANT_ORDER[index % VARIANT_ORDER.length];
  const style = variantStyles[v];
  const up = trend >= 0;
  const data = spark.map((val, i) => ({ i, v: val }));
  const stroke = positive ? style.spark : "var(--destructive)";
  const gradId = `kpi-${index}-${v}`;

  return (
    <Card
      className={cn(
        "relative gap-0 overflow-hidden border p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated",
        style.surface,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br to-transparent opacity-60 blur-2xl",
          style.glow,
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset ring-foreground/10", style.icon)}>
          <style.Icon className="size-4" />
        </span>
      </div>

      <div className="relative mt-3 flex items-end justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold",
              up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
        <div className="h-10 w-[4.5rem] shrink-0 opacity-90">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={stroke} strokeWidth={2} fill={`url(#${gradId})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

import { cn } from "@/lib/utils";
import { StatCard } from "@/components/admin/stat-card";

export type KpiItem = {
  label: string;
  value: string;
  trend: number;
  positive: boolean;
  spark: number[];
};

function hashSeed(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function generateSpark(seed: string, len = 10): number[] {
  let n = hashSeed(seed);
  return Array.from({ length: len }, (_, i) => {
    n = (n * 1103515245 + 12345 + i) | 0;
    return 10 + (Math.abs(n) % 35);
  });
}

/** Build full KPI analytics items from simple label/value stats. */
export function fromStats(
  stats: { label: string; value: string }[],
  options?: { trends?: number[]; positive?: boolean[] },
): KpiItem[] {
  return stats.map((s, i) => ({
    label: s.label,
    value: s.value,
    trend: options?.trends?.[i] ?? 4 + (hashSeed(s.label) % 14),
    positive: options?.positive?.[i] ?? i % 4 !== 2,
    spark: generateSpark(s.label),
  }));
}

export function KpiCards({ items, className }: { items: KpiItem[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4", className)}>
      {items.map((k, i) => (
        <StatCard key={k.label} {...k} index={i} />
      ))}
    </div>
  );
}

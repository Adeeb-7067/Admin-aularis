import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  completed: "bg-success/10 text-success border-success/20",
  resolved: "bg-success/10 text-success border-success/20",
  online: "bg-success/10 text-success border-success/20",
  published: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  review: "bg-warning/10 text-warning border-warning/20",
  open: "bg-warning/10 text-warning border-warning/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  suspended: "bg-warning/10 text-warning border-warning/20",
  banned: "bg-destructive/10 text-destructive border-destructive/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  low: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[0.72rem] font-semibold capitalize shadow-sm",
        map[status] ?? "bg-muted/60 text-muted-foreground border-border/70",
      )}
    >
      <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current opacity-80" />
      {status}
    </Badge>
  );
}

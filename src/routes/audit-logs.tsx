import { createFileRoute } from "@tanstack/react-router";
import { Search, Download, LogIn, ShieldCheck, Banknote, UserCheck, Settings } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { KpiCards } from "@/components/admin/kpi-cards";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { auditLogs, auditKpis } from "@/lib/mock-data";

export const Route = createFileRoute("/audit-logs")({
  head: () => ({ meta: [{ title: "Audit Logs · Auralis Admin" }] }),
  component: AuditPage,
});

const pickIcon = (a: string) => {
  if (a.includes("Logged in")) return LogIn;
  if (a.includes("role")) return ShieldCheck;
  if (a.includes("payout")) return Banknote;
  if (a.includes("listener")) return UserCheck;
  return Settings;
};

function AuditPage() {
  return (
    <AdminShell>
      <PageHeader
        title="Audit Logs"
        description="Immutable timeline of administrative activity"
        action={<Button variant="outline" className="gap-2 rounded-xl"><Download className="size-4" /> Export</Button>}
      />

      <KpiCards items={auditKpis} className="mb-6" />

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search by user, action or IP…" className="rounded-xl pl-9" />
      </div>

      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <ol className="relative space-y-6 border-l pl-6">
            {auditLogs.map((log, i) => {
              const Icon = pickIcon(log.action);
              return (
                <li key={i} className="relative">
                  <span className="absolute -left-[37px] grid size-7 place-items-center rounded-full border bg-card text-primary shadow-soft">
                    <Icon className="size-3.5" />
                  </span>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarFallback className="bg-accent text-[10px] text-accent-foreground">
                          {log.user.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{log.user}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.time}</span>
                  </div>
                  <p className="mt-1.5 text-sm">{log.action}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">IP {log.ip}</p>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </AdminShell>
  );
}

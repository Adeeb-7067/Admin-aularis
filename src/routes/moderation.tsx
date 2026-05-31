import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Ban, AlertTriangle, ArrowUpRight, Gavel } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTable } from "@/components/admin/data-table";
import { KpiCards } from "@/components/admin/kpi-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/moderation")({
  head: () => ({ meta: [{ title: "Moderation & Safety · Auralis Admin" }] }),
  component: ModerationPage,
});

import { moderationKpis, reports } from "@/lib/mock-data";

function ModerationPage() {
  return (
    <AdminShell>
      <PageHeader title="Moderation & Safety" description="Monitor reports, abuse signals and account safety" />

      <KpiCards items={moderationKpis} className="mb-6" />

      <DataTable
        title="Report Review Workspace"
        className="mt-6"
        rows={reports}
        getRowKey={(r) => r.id}
        columns={[
          {
            key: "id",
            label: "Report",
            render: (r) => (
              <>
                <span className="font-medium">{r.id}</span>
                <span className="block text-xs text-muted-foreground">{r.date}</span>
              </>
            ),
          },
          { key: "reporter", label: "Reporter", cellClassName: "text-muted-foreground" },
          { key: "target", label: "Target" },
          { key: "reason", label: "Reason" },
          { key: "risk", label: "Risk", render: (r) => <StatusBadge status={r.risk} /> },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          {
            key: "actions",
            label: "Actions",
            align: "right",
            render: () => (
              <div className="flex flex-wrap justify-end gap-1">
                <Button size="sm" variant="ghost" className="h-8 gap-1 text-warning"><AlertTriangle className="size-3.5" /> Warn</Button>
                <Button size="sm" variant="ghost" className="h-8 gap-1 text-destructive"><Ban className="size-3.5" /> Ban</Button>
                <Button size="sm" variant="ghost" className="h-8 gap-1"><ArrowUpRight className="size-3.5" /> Escalate</Button>
              </div>
            ),
          },
        ]}
      />

      <Card className="mt-4 shadow-soft">
        <CardHeader className="flex-row items-center gap-2 space-y-0"><Gavel className="size-4 text-primary" /><CardTitle>Evidence Panel</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
            Select a report to load chat logs, user history and attached evidence here for review before taking action.
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  );
}

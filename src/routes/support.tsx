import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTable } from "@/components/admin/data-table";
import { KpiCards } from "@/components/admin/kpi-cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supportKpis } from "@/lib/mock-data";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support Center · Auralis Admin" }] }),
  component: SupportPage,
});

const tickets = Array.from({ length: 10 }, (_, i) => ({
  id: `TKT-${4810 + i}`,
  user: ["Aanya Sharma", "Rohan Mehta", "Priya Nair", "Dev Kapoor", "Maya Rao"][i % 5],
  category: ["Billing", "Account", "Technical", "Payout", "Abuse"][i % 5],
  priority: (["high", "medium", "low"] as const)[i % 3],
  status: (["open", "pending", "resolved"] as const)[i % 3],
  agent: ["Sana K.", "Imran A.", "Unassigned", "Neha G."][i % 4],
}));

function SupportPage() {
  return (
    <AdminShell>
      <PageHeader
        title="Support Center"
        description="Manage tickets and live support conversations"
        action={<Button className="gap-2 rounded-xl"><Plus className="size-4" /> New Ticket</Button>}
      />

      <KpiCards items={supportKpis} className="mb-6" />

      <DataTable
        title="Ticketing Dashboard"
        className="mb-6"
        rows={tickets}
        getRowKey={(t) => t.id}
        rowClassName={() => "cursor-pointer"}
        columns={[
          { key: "id", label: "Ticket ID", cellClassName: "font-medium" },
          { key: "user", label: "User", cellClassName: "text-muted-foreground" },
          {
            key: "category",
            label: "Category",
            render: (t) => <Badge variant="outline" className="rounded-full">{t.category}</Badge>,
          },
          { key: "priority", label: "Priority", render: (t) => <StatusBadge status={t.priority} /> },
          { key: "status", label: "Status", render: (t) => <StatusBadge status={t.status} /> },
          {
            key: "agent",
            label: "Assigned Agent",
            render: (t) => (
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-accent text-[10px] text-accent-foreground">{t.agent[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{t.agent}</span>
              </div>
            ),
          },
        ]}
      />
    </AdminShell>
  );
}

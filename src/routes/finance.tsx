import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/admin/status-badge";
import { KpiCards } from "@/components/admin/kpi-cards";
import { DataTable } from "@/components/admin/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { transactions, revenueData } from "@/lib/mock-data";

export const Route = createFileRoute("/finance")({
  head: () => ({ meta: [{ title: "Wallet & Finance · Auralis Admin" }] }),
  component: FinancePage,
});

const finKpis = [
  { label: "Gross Revenue", value: "$1.42M", trend: 12.4, positive: true, spark: [12, 18, 15, 22, 28, 26, 34, 42] },
  { label: "Net Revenue", value: "$1.10M", trend: 9.8, positive: true, spark: [10, 14, 13, 18, 21, 24, 27, 31] },
  { label: "Commission Earned", value: "$312K", trend: 6.2, positive: true, spark: [8, 10, 9, 12, 14, 13, 16, 18] },
  { label: "Pending Payouts", value: "$84.3K", trend: 4.9, positive: false, spark: [18, 20, 19, 22, 24, 23, 26, 28] },
];

const tooltipStyle = { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 };

function FinancePage() {
  return (
    <AdminShell>
      <PageHeader
        title="Wallet & Finance"
        description="Revenue, transactions and payout operations"
        action={<Button variant="outline" className="gap-2 rounded-xl"><Download className="size-4" /> Export Ledger</Button>}
      />

      <KpiCards items={finKpis} className="mb-6" />

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader><CardTitle>Revenue Trends</CardTitle><CardDescription>Daily gross revenue</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueData} margin={{ left: -10, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="revenue" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader><CardTitle>Commission Breakdown</CardTitle><CardDescription>By revenue source</CardDescription></CardHeader>
          <CardContent className="space-y-4 pt-2">
            {[
              { label: "Voice & Video Calls", pct: 48 },
              { label: "Chat Sessions", pct: 27 },
              { label: "Gifts", pct: 16 },
              { label: "Subscriptions", pct: 9 },
            ].map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex justify-between text-sm"><span>{c.label}</span><span className="font-medium">{c.pct}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full gradient-brand" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <DataTable
        title="Transactions"
        className="mt-4"
        rows={transactions}
        getRowKey={(t) => t.id}
        columns={[
          { key: "id", label: "Transaction", cellClassName: "font-medium" },
          { key: "user", label: "User", cellClassName: "text-muted-foreground" },
          {
            key: "type",
            label: "Type",
            render: (t) => <Badge variant="outline" className="rounded-full">{t.type}</Badge>,
          },
          {
            key: "amount",
            label: "Amount",
            align: "right",
            render: (t) => <span className="font-medium">${t.amount.toFixed(2)}</span>,
          },
          {
            key: "status",
            label: "Status",
            render: (t) => <StatusBadge status={t.status} />,
          },
          { key: "date", label: "Date", cellClassName: "text-muted-foreground" },
        ]}
      />
    </AdminShell>
  );
}

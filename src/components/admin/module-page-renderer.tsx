import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Download, FileText, MoreHorizontal, Pencil, Plus } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { KpiCards, fromStats } from "@/components/admin/kpi-cards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ModulePageData, ModuleRow } from "@/lib/module-pages-data";

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  fontSize: 12,
};

const statusKeys = new Set([
  "status", "flag", "risk", "priority",
]);

function StatsRow({ stats }: { stats: ModulePageData["stats"] }) {
  return <KpiCards items={fromStats(stats)} className="mb-6" />;
}

function ModuleTable({ data }: { data: ModulePageData }) {
  if (!data.columns || !data.rows) return null;

  const columns: DataTableColumn<ModuleRow>[] = data.columns.map((col) => ({
    key: col.key,
    label: col.label,
    align: col.align,
    render: (row) => {
      const val = row[col.key] ?? "";
      return statusKeys.has(col.key) ? <StatusBadge status={val} /> : val;
    },
  }));

  return (
    <DataTable
      title={data.tableTitle}
      columns={columns}
      rows={data.rows}
      getRowKey={(_, i) => String(i)}
      className="mt-6"
    />
  );
}

function ModuleChart({ data }: { data: ModulePageData }) {
  if (!data.chartData?.length) return null;
  const chart = data.chartType ?? "bar";

  return (
    <Card className="overflow-hidden border-border/70 shadow-soft">
      <CardHeader className="border-b border-border/50 bg-muted/20">
        <CardTitle className="text-base">{data.chartTitle}</CardTitle>
        {data.chartDescription && <CardDescription>{data.chartDescription}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={260}>
          {chart === "bar" ? (
            <BarChart data={data.chartData} margin={{ left: -10, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="value" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              {data.chartData.some((d) => d.value2 != null) && (
                <Bar dataKey="value2" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
              )}
            </BarChart>
          ) : chart === "line" ? (
            <LineChart data={data.chartData} margin={{ left: -18, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="value" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
              {data.chartData.some((d) => d.value2 != null) && (
                <Line type="monotone" dataKey="value2" stroke="var(--chart-3)" strokeWidth={2.5} dot={false} />
              )}
            </LineChart>
          ) : (
            <AreaChart data={data.chartData} margin={{ left: -10, right: 8 }}>
              <defs>
                <linearGradient id="mod-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#mod-area)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function BreakdownCard({ breakdown }: { breakdown: NonNullable<ModulePageData["breakdown"]> }) {
  return (
    <Card className="h-full border-border/70 shadow-soft">
      <CardHeader className="border-b border-border/50 bg-muted/20">
        <CardTitle className="text-base">Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {breakdown.map((item) => (
          <div key={item.label}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="font-semibold text-primary">{item.pct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted/80">
              <div className="h-full rounded-full gradient-brand transition-all duration-500" style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ModuleCards({ cards }: { cards: NonNullable<ModulePageData["cards"]> }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((c) => (
        <Card key={c.title} className="overflow-hidden border-border/70 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated">
          <CardHeader className="flex-row items-start justify-between space-y-0 border-b border-border/50 bg-muted/15">
            <div>
              <CardTitle className="text-base">{c.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{c.subtitle}</p>
            </div>
            {c.status && <StatusBadge status={c.status} />}
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{c.meta}</p>
            {c.tags && (
              <div className="flex flex-wrap gap-1">
                {c.tags.map((t) => <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>)}
              </div>
            )}
            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" className="flex-1 rounded-xl"><Pencil className="size-3.5" /> Edit</Button>
              <Button size="sm" className="flex-1 rounded-xl">Manage</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ModuleSettings({ settings }: { settings: NonNullable<ModulePageData["settings"]> }) {
  return (
    <div className="mt-6 space-y-4">
      {settings.map((group) => (
        <Card key={group.group} className="overflow-hidden border-border/70 shadow-soft">
          <CardHeader className="border-b border-border/50 bg-muted/20">
            <CardTitle className="text-base">{group.group}</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border/50 pt-0">
            {group.items.map((item) => (
              <div key={item.label} className="flex flex-wrap items-center justify-between gap-4 bg-background/40 px-1 py-4 even:bg-muted/15">
                <div className="min-w-[200px] flex-1">
                  <Label className="text-sm font-medium">{item.label}</Label>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                {item.type === "switch" ? (
                  <Switch defaultChecked={item.value === "on"} />
                ) : item.type === "select" ? (
                  <Select defaultValue={item.value}>
                    <SelectTrigger className="w-40 rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {item.options?.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input defaultValue={item.value} className="w-56 rounded-xl" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="rounded-xl">Discard</Button>
        <Button className="rounded-xl">Save Changes</Button>
      </div>
    </div>
  );
}

function ModuleDocuments({ documents }: { documents: NonNullable<ModulePageData["documents"]> }) {
  const columns: DataTableColumn<(typeof documents)[number]>[] = [
    {
      key: "name",
      label: "Document",
      render: (doc) => (
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-muted-foreground" />
          <span className="font-medium">{doc.name}</span>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (doc) => <Badge variant="outline" className="rounded-full">{doc.type}</Badge>,
    },
    {
      key: "updated",
      label: "Last Updated",
      render: (doc) => <span className="text-muted-foreground">{doc.updated}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (doc) => <StatusBadge status={doc.status === "published" ? "active" : "pending"} />,
    },
    {
      key: "actions",
      label: "",
      hideInRows: false,
      headerClassName: "w-10",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      title="Documents"
      columns={columns}
      rows={documents}
      getRowKey={(doc) => doc.name}
      className="mt-6"
      headerExtra={
        <Button size="sm" className="gap-1 rounded-xl"><Plus className="size-4" /> Upload</Button>
      }
    />
  );
}

export function ModulePageRenderer({ data }: { data: ModulePageData }) {
  return (
    <>
      <StatsRow stats={data.stats} />

      {data.layout === "table" && <ModuleTable data={data} />}

      {data.layout === "analytics" && (
        <>
          <div className={`mt-6 grid gap-4 ${data.breakdown ? "lg:grid-cols-3" : ""}`}>
            <div className={data.breakdown ? "lg:col-span-2" : ""}>
              <ModuleChart data={data} />
            </div>
            {data.breakdown && <BreakdownCard breakdown={data.breakdown} />}
          </div>
          {data.rows && data.columns && <ModuleTable data={data} />}
        </>
      )}

      {data.layout === "cards" && data.cards && <ModuleCards cards={data.cards} />}

      {data.layout === "settings" && data.settings && <ModuleSettings settings={data.settings} />}

      {data.layout === "documents" && data.documents && <ModuleDocuments documents={data.documents} />}
    </>
  );
}

export function ModulePageActions() {
  return (
    <Button variant="outline" className="gap-2 rounded-xl">
      <Download className="size-4" /> Export
    </Button>
  );
}

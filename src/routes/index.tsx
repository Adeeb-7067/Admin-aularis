import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { UserPlus, BadgeCheck, Wallet, PhoneCall, PhoneOff, Banknote, ShieldAlert, Download } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { KpiCards } from "@/components/admin/kpi-cards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { kpis, revenueData, usersData, commsData, channelSplit, activityFeed } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Auralis Admin" },
      { name: "description", content: "Executive dashboard for the Auralis communication platform — revenue, users, listeners and live operations." },
    ],
  }),
  component: Dashboard,
});

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  color: "var(--popover-foreground)",
  fontSize: 12,
};

const feedIcon: Record<string, typeof UserPlus> = {
  user: UserPlus, approve: BadgeCheck, recharge: Wallet, call: PhoneCall,
  withdraw: Banknote, report: ShieldAlert,
};

function Dashboard() {
  const [feed, setFeed] = useState(activityFeed);

  useEffect(() => {
    const extra = [
      { type: "call", text: "Voice call started · Riya ↔ Sam", time: "just now" },
      { type: "recharge", text: "Anita recharged $25.00", time: "just now" },
      { type: "user", text: "Karan joined the platform", time: "just now" },
      { type: "report", text: "Abuse report on user #9931", time: "just now" },
    ];
    let n = 0;
    const id = setInterval(() => {
      setFeed((f) => [extra[n++ % extra.length], ...f].slice(0, 8));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <AdminShell>
      <PageHeader
        title="Dashboard"
        description="Welcome back, Sana — here's what's happening across Auralis today."
        action={
          <div className="flex gap-2">
            <Tabs defaultValue="7d">
              <TabsList className="rounded-xl">
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="gap-2 rounded-xl"><Download className="size-4" /> Export</Button>
          </div>
        }
      />

      <KpiCards items={kpis} className="mb-6" />

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle>Revenue & Coin Purchases</CardTitle>
            <CardDescription>Weekly revenue against coin purchase volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData} margin={{ left: -10, right: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="coin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#rev)" />
                <Area type="monotone" dataKey="coins" stroke="var(--chart-2)" strokeWidth={2.5} fill="url(#coin)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Communication Mix</CardTitle>
            <CardDescription>Share of active sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={channelSplit} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3} strokeWidth={0}>
                  {channelSplit.map((c) => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader><CardTitle>New Registrations</CardTitle><CardDescription>Sign-ups vs active users</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={usersData} margin={{ left: -18, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="registrations" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="active" stroke="var(--chart-3)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader><CardTitle>Peak Usage Hours</CardTitle><CardDescription>Sessions by time of day</CardDescription></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={commsData} margin={{ left: -18, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="chats" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="voice" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="video" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Activity</CardTitle>
              <span className="flex items-center gap-1.5 text-xs text-success">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Live
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {feed.map((a, i) => {
              const Icon = feedIcon[a.type] ?? PhoneOff;
              return (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

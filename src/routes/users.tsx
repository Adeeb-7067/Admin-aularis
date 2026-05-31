import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Download, MoreHorizontal, Eye, Pencil, Pause, Ban, PlusCircle, Users as UsersIcon } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { KpiCards } from "@/components/admin/kpi-cards";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { users, userKpis } from "@/lib/mock-data";

export const Route = createFileRoute("/users")({
  head: () => ({ meta: [{ title: "User Management · Auralis Admin" }] }),
  component: UsersPage,
});

type UserRow = (typeof users)[number];

function UserActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem><Eye className="size-4" /> View</DropdownMenuItem>
        <DropdownMenuItem><Pencil className="size-4" /> Edit</DropdownMenuItem>
        <DropdownMenuItem><PlusCircle className="size-4" /> Add Credits</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Pause className="size-4" /> Suspend</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><Ban className="size-4" /> Ban</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UsersPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const rows = users.filter(
    (u) =>
      (status === "all" || u.status === status) &&
      (u.name.toLowerCase().includes(q.toLowerCase()) || u.id.toLowerCase().includes(q.toLowerCase())),
  );
  const allChecked = rows.length > 0 && selected.length === rows.length;

  const columns: DataTableColumn<UserRow>[] = [
    {
      key: "select",
      label: "",
      headerClassName: "w-10",
      hideInRows: true,
      renderHeader: () => (
        <Checkbox checked={allChecked} onCheckedChange={(v) => setSelected(v ? rows.map((r) => r.id) : [])} />
      ),
      render: (u) => (
        <Checkbox
          checked={selected.includes(u.id)}
          onCheckedChange={(v) => setSelected((s) => (v ? [...s, u.id] : s.filter((x) => x !== u.id)))}
        />
      ),
    },
    {
      key: "user",
      label: "User",
      render: (u) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-accent text-xs font-medium text-accent-foreground">
              {u.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="font-medium">{u.name}</p>
            <p className="text-xs text-muted-foreground">{u.id} · {u.email}</p>
          </div>
        </div>
      ),
    },
    { key: "mobile", label: "Mobile", cellClassName: "text-muted-foreground" },
    {
      key: "wallet",
      label: "Wallet",
      align: "right",
      render: (u) => <span className="font-medium">${u.wallet.toFixed(2)}</span>,
    },
    { key: "status", label: "Status", render: (u) => <StatusBadge status={u.status} /> },
    { key: "lastActive", label: "Last Active", cellClassName: "text-muted-foreground" },
    { key: "joined", label: "Joined", cellClassName: "text-muted-foreground" },
    {
      key: "actions",
      label: "Actions",
      headerClassName: "w-10",
      render: () => <UserActions />,
    },
  ];

  return (
    <AdminShell>
      <PageHeader
        title="User Management"
        description={`${users.length} registered users across the platform`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 rounded-xl"><Download className="size-4" /> Export</Button>
            <Button className="gap-2 rounded-xl"><PlusCircle className="size-4" /> Add User</Button>
          </div>
        }
      />

      <KpiCards items={userKpis} className="mb-6" />

      <Card className="gap-0 overflow-hidden rounded-lg border-border/70 p-0 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 border-b border-border/60 bg-muted/20 px-4 py-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or ID…" className="rounded-xl pl-9" />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40 rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
          {selected.length > 0 && (
            <div className="flex items-center gap-2 rounded-xl bg-accent px-3 py-1.5 text-sm text-accent-foreground">
              {selected.length} selected
              <Button size="sm" variant="ghost" className="h-7 gap-1 text-destructive"><Ban className="size-3.5" /> Suspend</Button>
            </div>
          )}
        </div>

        <DataTable
          embedded
          columns={columns}
          rows={rows}
          getRowKey={(u) => u.id}
          rowClassName={() => "group"}
          emptyState={
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <div className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground"><UsersIcon className="size-6" /></div>
              <p className="font-medium">No users found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          }
        />
      </Card>
    </AdminShell>
  );
}

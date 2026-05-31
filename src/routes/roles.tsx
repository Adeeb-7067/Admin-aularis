import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus, ShieldCheck, Users } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { KpiCards } from "@/components/admin/kpi-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { roles, permissionModules, permissionActions, rolesKpis } from "@/lib/mock-data";

export const Route = createFileRoute("/roles")({
  head: () => ({ meta: [{ title: "Roles & Permissions · Auralis Admin" }] }),
  component: RolesPage,
});

// deterministic permission grid for the matrix demo
const grant = (m: number, a: number) => (m * 3 + a * 2) % 5 !== 0;

function RolesPage() {
  return (
    <AdminShell>
      <PageHeader title="Roles & Permissions" description="Manage enterprise role-based access control" />

      <KpiCards items={rolesKpis} className="mb-6" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => (
          <Card key={r.name} className="shadow-soft transition-shadow hover:shadow-elevated">
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><ShieldCheck className="size-5" /></span>
              <div className="flex-1">
                <CardTitle className="text-base">{r.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary" className="gap-1 rounded-full"><Users className="size-3" /> {r.users} members</Badge>
              <Button size="sm" variant="outline" className="rounded-xl">Edit</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 gap-0 overflow-hidden rounded-lg border-border/70 p-0 shadow-sm">
        <CardHeader className="border-b border-border/60 px-4 py-3.5">
          <CardTitle className="text-sm font-semibold">Permission Matrix · Admin</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Module</th>
                {permissionActions.map((a) => (
                  <th key={a} className="h-10 px-4 text-center text-xs font-medium text-muted-foreground">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionModules.map((m, mi) => (
                <tr key={m} className="border-b border-border/60 transition-colors hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{m}</td>
                  {permissionActions.map((a, ai) => (
                    <td key={a} className="px-4 py-3 text-center">
                      {grant(mi, ai) ? (
                        <span className="inline-grid size-7 place-items-center rounded-md border border-success/20 bg-success/10 text-success"><Check className="size-3.5" /></span>
                      ) : (
                        <span className="inline-grid size-7 place-items-center rounded-md border border-border/60 bg-muted/40 text-muted-foreground"><Minus className="size-3.5" /></span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border/60 bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground">
          {permissionModules.length} modules · {permissionActions.length} actions
        </div>
      </Card>
    </AdminShell>
  );
}

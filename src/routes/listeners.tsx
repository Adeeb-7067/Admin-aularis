import { createFileRoute } from "@tanstack/react-router";
import { Check, X, RotateCw, FileText, Languages } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { StatusBadge } from "@/components/admin/status-badge";
import { KpiCards } from "@/components/admin/kpi-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { listenerKpis, listeners } from "@/lib/mock-data";

export const Route = createFileRoute("/listeners")({
  head: () => ({ meta: [{ title: "Listener Applications · Auralis Admin" }] }),
  component: ListenersPage,
});

function ListenersPage() {
  return (
    <AdminShell>
      <PageHeader title="Listener Applications" description="Review and verify listener applications in the queue" />

      <KpiCards items={listenerKpis} className="mb-6" />

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Verification Queue</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {listeners.map((l) => (
          <Card key={l.id} className="overflow-hidden shadow-soft transition-shadow hover:shadow-elevated">
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <Avatar className="size-12">
                <AvatarFallback className="gradient-brand text-sm font-semibold text-primary-foreground">
                  {l.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-base">{l.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{l.id}</p>
              </div>
              <StatusBadge status={l.status} />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Languages className="size-4" />
                <div className="flex flex-wrap gap-1">
                  {l.languages.map((lang) => <Badge key={lang} variant="secondary" className="rounded-full">{lang}</Badge>)}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="size-4" /> {l.docs} documents uploaded
              </div>
              <div className="flex gap-2 pt-1">
                <Button size="sm" className="flex-1 gap-1 rounded-xl bg-success text-success-foreground hover:bg-success/90"><Check className="size-4" /> Approve</Button>
                <Button size="sm" variant="outline" className="flex-1 gap-1 rounded-xl"><X className="size-4" /> Reject</Button>
                <Button size="sm" variant="ghost" className="rounded-xl" aria-label="Request reverification"><RotateCw className="size-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}

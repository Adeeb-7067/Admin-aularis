import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { TopBar } from "./top-bar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-gradient-to-b from-muted/40 via-background to-background">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-soft backdrop-blur-sm">
      <div className="relative pl-4">
        <span className="absolute left-0 top-0 h-full w-1 rounded-full gradient-brand" aria-hidden />
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

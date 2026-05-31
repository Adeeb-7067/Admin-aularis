import { Link, useRouterState } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { navSections } from "@/lib/nav-config";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (item: { to?: string; slug?: string }) => {
    if (item.to) return item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
    if (item.slug) return pathname === `/module/${item.slug}`;
    return false;
  };

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-1.5 py-1.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl gradient-brand text-primary-foreground shadow-soft">
            <Headphones className="size-5" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold text-sidebar-foreground">Auralis</p>
              <p className="text-xs text-muted-foreground">Admin Console</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {navSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={isActive(item)} tooltip={item.label}>
                      <Link
                        to={item.to ?? "/module/$slug"}
                        params={item.to ? undefined : { slug: item.slug! }}
                      >
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

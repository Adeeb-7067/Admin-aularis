import { Search, Bell, Mail, Plus, Moon, Sun, ChevronDown, Check } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function TopBar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/85 px-4 shadow-sm backdrop-blur-xl">
      <SidebarTrigger className="text-muted-foreground" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <span className="grid size-5 place-items-center rounded-md gradient-brand text-[10px] font-bold text-primary-foreground">A</span>
            <span className="hidden font-medium sm:inline">Auralis Inc.</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuItem><Check className="size-4 text-primary" /> Auralis Inc.</DropdownMenuItem>
          <DropdownMenuItem className="pl-8">Auralis EU</DropdownMenuItem>
          <DropdownMenuItem className="pl-8">Sandbox</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative ml-1 hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search users, listeners, transactions…" className="rounded-xl pl-9" />
        <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground lg:block">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="sm" className="hidden gap-2 rounded-xl text-primary sm:flex">
          <Plus className="size-4" /> Quick Action
        </Button>

        <Button variant="ghost" size="icon" className="rounded-xl" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
        </Button>

        <Button variant="ghost" size="icon" className="relative rounded-xl" aria-label="Messages">
          <Mail className="size-[18px]" />
        </Button>

        <Button variant="ghost" size="icon" className="relative rounded-xl" aria-label="Notifications">
          <Bell className="size-[18px]" />
          <Badge className="absolute -right-0.5 -top-0.5 size-4 justify-center rounded-full p-0 text-[10px]">5</Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 rounded-xl p-1 pr-2 transition-colors hover:bg-accent">
              <Avatar className="size-8">
                <AvatarFallback className="gradient-brand text-xs font-semibold text-primary-foreground">SK</AvatarFallback>
              </Avatar>
              <div className="hidden text-left leading-tight lg:block">
                <p className="text-xs font-semibold">Sana Khan</p>
                <p className="text-[11px] text-muted-foreground">Super Admin</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

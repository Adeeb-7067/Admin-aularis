import {
  LayoutDashboard, Users, UserCheck, Activity, Headphones, ClipboardCheck,
  BarChart3, Radio, MessageSquare, Phone, Video, MonitorPlay, Wallet,
  ArrowLeftRight, TrendingUp, Banknote, Percent, CreditCard, Gift, Sparkles,
  ShieldAlert, Flag, Ban, FileWarning, Eye, Bell, Send, Megaphone, LifeBuoy,
  MessagesSquare, PieChart, Building2, Palette, FileText, ShieldCheck, KeyRound,
  ScrollText, Settings, Network, type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; icon: LucideIcon; to?: string; slug?: string };
export type NavSection = { title: string; items: NavItem[] };

export const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", icon: LayoutDashboard, to: "/" }],
  },
  {
    title: "User Management",
    items: [
      { label: "Users", icon: Users, to: "/users" },
      { label: "User Verification", icon: UserCheck, slug: "user-verification" },
      { label: "User Activity", icon: Activity, slug: "user-activity" },
    ],
  },
  {
    title: "Listener Management",
    items: [
      { label: "Listener Applications", icon: ClipboardCheck, to: "/listeners" },
      { label: "Verified Listeners", icon: Headphones, slug: "verified-listeners" },
      { label: "Listener Performance", icon: BarChart3, slug: "listener-performance" },
      { label: "Availability Monitoring", icon: Radio, slug: "availability-monitoring" },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Active Chats", icon: MessageSquare, slug: "active-chats" },
      { label: "Voice Calls", icon: Phone, slug: "voice-calls" },
      { label: "Video Calls", icon: Video, slug: "video-calls" },
      { label: "Session Monitoring", icon: MonitorPlay, slug: "session-monitoring" },
    ],
  },
  {
    title: "Wallet & Finance",
    items: [
      { label: "Wallets", icon: Wallet, slug: "wallets" },
      { label: "Transactions", icon: ArrowLeftRight, to: "/finance" },
      { label: "Revenue", icon: TrendingUp, slug: "revenue" },
      { label: "Payouts", icon: Banknote, slug: "payouts" },
      { label: "Commission Settings", icon: Percent, slug: "commission-settings" },
    ],
  },
  {
    title: "Subscriptions & Gifts",
    items: [
      { label: "Subscription Plans", icon: CreditCard, slug: "subscription-plans" },
      { label: "Gift Catalog", icon: Gift, slug: "gift-catalog" },
      { label: "Gift Analytics", icon: Sparkles, slug: "gift-analytics" },
    ],
  },
  {
    title: "Moderation & Safety",
    items: [
      { label: "Reports", icon: Flag, to: "/moderation" },
      { label: "Blocked Accounts", icon: Ban, slug: "blocked-accounts" },
      { label: "Content Moderation", icon: FileWarning, slug: "content-moderation" },
      { label: "Abuse Monitoring", icon: ShieldAlert, slug: "abuse-monitoring" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { label: "Push Notifications", icon: Bell, slug: "push-notifications" },
      { label: "In-App Notifications", icon: Send, slug: "in-app-notifications" },
      { label: "Campaigns", icon: Megaphone, slug: "campaigns" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Support Tickets", icon: LifeBuoy, to: "/support" },
      { label: "Live Support Chat", icon: MessagesSquare, slug: "live-support" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Revenue Analytics", icon: PieChart, slug: "revenue-analytics" },
      { label: "User Analytics", icon: Users, slug: "user-analytics" },
      { label: "Listener Analytics", icon: Headphones, slug: "listener-analytics" },
      { label: "Session Analytics", icon: Eye, slug: "session-analytics" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Company Profile", icon: Building2, slug: "company-profile" },
      { label: "Branding", icon: Palette, slug: "branding" },
      { label: "Legal Documents", icon: FileText, slug: "legal-documents" },
    ],
  },
  {
    title: "Roles & Permissions",
    items: [
      { label: "Roles", icon: ShieldCheck, to: "/roles" },
      { label: "Access Policies", icon: KeyRound, slug: "access-policies" },
      { label: "Audit Logs", icon: ScrollText, to: "/audit-logs" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Platform Settings", icon: Settings, slug: "platform-settings" },
      { label: "Payment Gateways", icon: CreditCard, slug: "payment-gateways" },
      { label: "Communication Settings", icon: Network, slug: "communication-settings" },
    ],
  },
];

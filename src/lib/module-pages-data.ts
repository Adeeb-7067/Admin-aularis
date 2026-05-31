import { navSections } from "./nav-config";
import { commsData, revenueData, usersData } from "./mock-data";

const names = [
  "Aanya Sharma", "Rohan Mehta", "Priya Nair", "Dev Kapoor", "Maya Rao",
  "Arjun Singh", "Isha Verma", "Kabir Joshi", "Neha Gupta", "Vikram Das",
];

export type ModuleStat = { label: string; value: string; tone?: string };
export type ModuleColumn = { key: string; label: string; align?: "right" };
export type ModuleRow = Record<string, string>;

export type ModulePageData = {
  description: string;
  stats: ModuleStat[];
  layout: "table" | "analytics" | "cards" | "settings" | "documents" | "breakdown";
  tableTitle?: string;
  columns?: ModuleColumn[];
  rows?: ModuleRow[];
  chartTitle?: string;
  chartDescription?: string;
  chartType?: "bar" | "line" | "area";
  chartData?: { name: string; value: number; value2?: number }[];
  cards?: { title: string; subtitle: string; meta: string; status?: string; tags?: string[] }[];
  settings?: { group: string; items: { label: string; description: string; type: "switch" | "input" | "select"; value: string; options?: string[] }[] }[];
  documents?: { name: string; type: string; updated: string; status: string }[];
  breakdown?: { label: string; pct: number }[];
};

export function getModuleTitle(slug: string): string {
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.slug === slug) return item.label;
    }
  }
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

const table = (
  title: string,
  columns: ModuleColumn[],
  rows: ModuleRow[],
): Pick<ModulePageData, "layout" | "tableTitle" | "columns" | "rows"> => ({
  layout: "table",
  tableTitle: title,
  columns,
  rows,
});

const verificationRows = Array.from({ length: 8 }, (_, i) => ({
  id: `VER-${8800 + i}`,
  user: names[i % names.length],
  method: ["ID Document", "Selfie", "Phone OTP", "Email"][i % 4],
  submitted: `${(i % 5) + 1}h ago`,
  status: (["pending", "pending", "review", "pending"] as const)[i % 4],
}));

const activityRows = Array.from({ length: 12 }, (_, i) => ({
  user: names[i % names.length],
  action: ["Logged in", "Sent gift", "Started call", "Recharged wallet", "Updated profile"][i % 5],
  device: ["iPhone 15", "Pixel 8", "Web", "iPad"][i % 4],
  time: `${(i % 59) + 1}m ago`,
  ip: `103.${20 + (i % 10)}.${(i % 200) + 1}.${(i % 50) + 10}`,
}));

const verifiedListenerRows = Array.from({ length: 10 }, (_, i) => ({
  id: `LIS-${5100 + i}`,
  name: names[(i + 3) % names.length],
  rating: `${(4.2 + (i % 8) * 0.1).toFixed(1)}`,
  sessions: `${120 + i * 34}`,
  earnings: `$${(840 + i * 127).toLocaleString()}`,
  status: "active",
}));

const performanceRows = Array.from({ length: 8 }, (_, i) => ({
  listener: names[i % names.length],
  rating: `${(4.5 + (i % 5) * 0.08).toFixed(2)}`,
  sessions: `${90 + i * 18}`,
  avgDuration: `${8 + (i % 6)}m ${10 + (i % 50)}s`,
  earnings: `$${(620 + i * 95).toLocaleString()}`,
}));

const availabilityRows = Array.from({ length: 10 }, (_, i) => ({
  listener: names[i % names.length],
  status: (["online", "online", "online", "pending"] as const)[i % 4],
  queue: `${i % 4}`,
  lastSeen: i % 4 === 0 ? "Online now" : `${(i % 20) + 1}m ago`,
  languages: ["English, Hindi", "Tamil", "Bengali, English", "Hindi"][i % 4],
}));

const chatRows = Array.from({ length: 10 }, (_, i) => ({
  session: `CHT-${4400 + i}`,
  user: names[i % names.length],
  listener: names[(i + 5) % names.length],
  duration: `${(i % 40) + 2}m`,
  status: (["active", "active", "pending"] as const)[i % 3],
}));

const callRows = (prefix: string) =>
  Array.from({ length: 10 }, (_, i) => ({
    call: `${prefix}-${7700 + i}`,
    caller: names[i % names.length],
    listener: names[(i + 4) % names.length],
    duration: i % 3 === 0 ? "Live" : `${(i % 25) + 3}m ${(i % 59) + 1}s`,
    status: (["active", "completed", "completed"] as const)[i % 3],
  }));

const sessionRows = Array.from({ length: 10 }, (_, i) => ({
  session: `SES-${9900 + i}`,
  type: ["Chat", "Voice", "Video"][i % 3],
  participants: `${names[i % names.length]} ↔ ${names[(i + 3) % names.length]}`,
  quality: `${92 + (i % 8)}%`,
  status: (["active", "active", "completed"] as const)[i % 3],
}));

const walletRows = Array.from({ length: 10 }, (_, i) => ({
  user: names[i % names.length],
  balance: `$${(120 + i * 87.5).toFixed(2)}`,
  coins: `${840 + i * 120}`,
  lastTopUp: `${(i % 14) + 1}d ago`,
  status: "active",
}));

const payoutRows = Array.from({ length: 8 }, (_, i) => ({
  id: `PAY-${2300 + i}`,
  listener: names[i % names.length],
  amount: `$${(400 + i * 175).toFixed(2)}`,
  method: ["Bank Transfer", "UPI", "PayPal"][i % 3],
  status: (["pending", "pending", "completed"] as const)[i % 3],
}));

const planCards = [
  { title: "Basic", subtitle: "$4.99 / month", meta: "12,840 subscribers", status: "active", tags: ["Chat access", "5 sessions/mo"] },
  { title: "Premium", subtitle: "$9.99 / month", meta: "8,420 subscribers", status: "active", tags: ["Voice + Video", "Unlimited chat"] },
  { title: "VIP", subtitle: "$19.99 / month", meta: "2,180 subscribers", status: "active", tags: ["Priority queue", "Exclusive listeners"] },
  { title: "Annual Basic", subtitle: "$49.99 / year", meta: "3,920 subscribers", status: "active", tags: ["2 months free"] },
];

const giftCards = Array.from({ length: 8 }, (_, i) => ({
  title: ["Rose", "Heart", "Star", "Crown", "Diamond", "Trophy", "Rocket", "Sparkle"][i],
  subtitle: `$${(0.99 + i * 1.5).toFixed(2)}`,
  meta: `${(1200 - i * 90)} sent this week`,
  status: "active",
  tags: [`${(i + 1) * 10} coins`],
}));

const blockedRows = Array.from({ length: 8 }, (_, i) => ({
  user: names[i % names.length],
  reason: ["Harassment", "Spam", "Fraud", "Abuse"][i % 4],
  blockedBy: "System",
  date: `${(i % 10) + 1}d ago`,
  status: "banned",
}));

const contentRows = Array.from({ length: 8 }, (_, i) => ({
  id: `MOD-${1200 + i}`,
  content: ["Chat message", "Profile photo", "Bio text", "Voice note"][i % 4],
  user: names[i % names.length],
  flag: (["high", "medium", "low"] as const)[i % 3],
  status: (["open", "open", "resolved"] as const)[i % 3],
}));

const abuseRows = Array.from({ length: 8 }, (_, i) => ({
  signal: ["Repeated reports", "Velocity spike", "Keyword match", "IP cluster"][i % 4],
  account: names[i % names.length],
  score: `${72 + (i % 25)}`,
  status: (["high", "medium", "low"] as const)[i % 3],
  detected: `${(i % 45) + 1}m ago`,
}));

const notificationRows = Array.from({ length: 8 }, (_, i) => ({
  title: ["Weekly digest", "New listener alert", "Promo offer", "Session reminder"][i % 4],
  audience: ["All users", "Premium", "Inactive 7d", "Listeners"][i % 4],
  sent: `${(8400 - i * 620).toLocaleString()}`,
  status: (["completed", "pending", "completed"] as const)[i % 3],
  date: `Jun ${(i % 28) + 1}`,
}));

const campaignRows = Array.from({ length: 8 }, (_, i) => ({
  name: ["Summer recharge", "Listener spotlight", "Weekend bonus", "Refer & earn"][i % 4],
  channel: ["Push + Email", "In-app", "Push", "SMS"][i % 4],
  reach: `${(42 - i * 3)}K`,
  status: (["active", "pending", "completed"] as const)[i % 3],
  ctr: `${(3.2 + i * 0.4).toFixed(1)}%`,
}));

const liveSupportRows = Array.from({ length: 8 }, (_, i) => ({
  chat: `LSC-${6000 + i}`,
  user: names[i % names.length],
  agent: ["Sana K.", "Imran A.", "Neha G.", "Unassigned"][i % 4],
  wait: `${(i % 8) + 1}m`,
  status: (["active", "active", "pending"] as const)[i % 3],
}));

const policyRows = Array.from({ length: 6 }, (_, i) => ({
  policy: ["Finance approval", "User suspension", "Listener verify", "Data export", "Campaign publish", "Settings change"][i],
  scope: ["Finance", "Moderation", "Listeners", "Compliance", "Marketing", "Platform"][i],
  roles: `${2 + (i % 4)} roles`,
  status: "active",
}));

const gatewayCards = [
  { title: "Stripe", subtitle: "Primary card payments", meta: "98.2% success rate", status: "active", tags: ["Cards", "Apple Pay"] },
  { title: "Razorpay", subtitle: "UPI & local methods", meta: "96.8% success rate", status: "active", tags: ["UPI", "Netbanking"] },
  { title: "PayPal", subtitle: "International payouts", meta: "94.1% success rate", status: "active", tags: ["Payouts"] },
];

export const modulePagesData: Record<string, ModulePageData> = {
  "user-verification": {
    description: "Review identity verification requests from users",
    stats: [
      { label: "Pending", value: "24", tone: "text-warning bg-warning/10" },
      { label: "Approved Today", value: "18", tone: "text-success bg-success/10" },
      { label: "Rejected", value: "3", tone: "text-destructive bg-destructive/10" },
      { label: "Avg. Review Time", value: "14m", tone: "text-primary bg-accent" },
    ],
    ...table("Verification Queue", [
      { key: "id", label: "Request" },
      { key: "user", label: "User" },
      { key: "method", label: "Method" },
      { key: "submitted", label: "Submitted" },
      { key: "status", label: "Status" },
    ], verificationRows),
  },
  "user-activity": {
    description: "Monitor user actions and session activity across the platform",
    stats: [
      { label: "Active Now", value: "3,842", tone: "text-success bg-success/10" },
      { label: "Logins (24h)", value: "12,480", tone: "text-primary bg-accent" },
      { label: "Suspicious", value: "7", tone: "text-destructive bg-destructive/10" },
      { label: "New Devices", value: "142", tone: "text-foreground bg-muted" },
    ],
    ...table("Recent Activity", [
      { key: "user", label: "User" },
      { key: "action", label: "Action" },
      { key: "device", label: "Device" },
      { key: "time", label: "Time" },
      { key: "ip", label: "IP" },
    ], activityRows),
  },
  "verified-listeners": {
    description: "Manage verified listeners and their platform standing",
    stats: [
      { label: "Verified", value: "1,842", tone: "text-success bg-success/10" },
      { label: "Online", value: "284", tone: "text-primary bg-accent" },
      { label: "Avg. Rating", value: "4.82", tone: "text-foreground bg-muted" },
      { label: "Top Earner", value: "$12.4K", tone: "text-success bg-success/10" },
    ],
    ...table("Verified Listeners", [
      { key: "id", label: "ID" },
      { key: "name", label: "Listener" },
      { key: "rating", label: "Rating", align: "right" },
      { key: "sessions", label: "Sessions", align: "right" },
      { key: "earnings", label: "Earnings", align: "right" },
      { key: "status", label: "Status" },
    ], verifiedListenerRows),
  },
  "listener-performance": {
    description: "Track listener ratings, session volume and earnings",
    stats: [
      { label: "Avg. Rating", value: "4.82", tone: "text-success bg-success/10" },
      { label: "Sessions / Day", value: "4,280", tone: "text-primary bg-accent" },
      { label: "Completion Rate", value: "94%", tone: "text-success bg-success/10" },
      { label: "Avg. Duration", value: "11m 24s", tone: "text-foreground bg-muted" },
    ],
    layout: "analytics",
    chartTitle: "Performance Trends",
    chartDescription: "Sessions and ratings over time",
    chartType: "line",
    chartData: usersData.map((d) => ({ name: d.name, value: d.active, value2: d.registrations })),
    tableTitle: "Top Performers",
    columns: [
      { key: "listener", label: "Listener" },
      { key: "rating", label: "Rating", align: "right" },
      { key: "sessions", label: "Sessions", align: "right" },
      { key: "avgDuration", label: "Avg. Duration" },
      { key: "earnings", label: "Earnings", align: "right" },
    ],
    rows: performanceRows,
  },
  "availability-monitoring": {
    description: "Real-time listener availability and queue status",
    stats: [
      { label: "Online", value: "284", tone: "text-success bg-success/10" },
      { label: "Busy", value: "96", tone: "text-warning bg-warning/10" },
      { label: "Offline", value: "1,462", tone: "text-muted-foreground bg-muted" },
      { label: "Avg. Wait", value: "2m 10s", tone: "text-primary bg-accent" },
    ],
    ...table("Availability Board", [
      { key: "listener", label: "Listener" },
      { key: "status", label: "Status" },
      { key: "queue", label: "Queue", align: "right" },
      { key: "lastSeen", label: "Last Seen" },
      { key: "languages", label: "Languages" },
    ], availabilityRows),
  },
  "active-chats": {
    description: "Monitor live chat sessions across the platform",
    stats: [
      { label: "Active Chats", value: "186", tone: "text-success bg-success/10" },
      { label: "Queued", value: "24", tone: "text-warning bg-warning/10" },
      { label: "Avg. Duration", value: "9m 12s", tone: "text-foreground bg-muted" },
      { label: "Messages / min", value: "1,842", tone: "text-primary bg-accent" },
    ],
    ...table("Live Chat Sessions", [
      { key: "session", label: "Session" },
      { key: "user", label: "User" },
      { key: "listener", label: "Listener" },
      { key: "duration", label: "Duration" },
      { key: "status", label: "Status" },
    ], chatRows),
  },
  "voice-calls": {
    description: "Track active and completed voice call sessions",
    stats: [
      { label: "Active Calls", value: "142", tone: "text-success bg-success/10" },
      { label: "Completed (24h)", value: "2,840", tone: "text-primary bg-accent" },
      { label: "Avg. Duration", value: "12m 40s", tone: "text-foreground bg-muted" },
      { label: "Drop Rate", value: "1.8%", tone: "text-warning bg-warning/10" },
    ],
    ...table("Voice Call Log", [
      { key: "call", label: "Call ID" },
      { key: "caller", label: "Caller" },
      { key: "listener", label: "Listener" },
      { key: "duration", label: "Duration" },
      { key: "status", label: "Status" },
    ], callRows("VOC")),
  },
  "video-calls": {
    description: "Monitor video session quality and usage",
    stats: [
      { label: "Active Video", value: "68", tone: "text-success bg-success/10" },
      { label: "HD Sessions", value: "82%", tone: "text-primary bg-accent" },
      { label: "Avg. Duration", value: "14m 08s", tone: "text-foreground bg-muted" },
      { label: "Quality Issues", value: "12", tone: "text-warning bg-warning/10" },
    ],
    ...table("Video Call Log", [
      { key: "call", label: "Call ID" },
      { key: "caller", label: "Caller" },
      { key: "listener", label: "Listener" },
      { key: "duration", label: "Duration" },
      { key: "status", label: "Status" },
    ], callRows("VID")),
  },
  "session-monitoring": {
    description: "Unified view of all active communication sessions",
    stats: [
      { label: "Total Active", value: "362", tone: "text-success bg-success/10" },
      { label: "Chat", value: "186", tone: "text-primary bg-accent" },
      { label: "Voice", value: "142", tone: "text-primary bg-accent" },
      { label: "Video", value: "68", tone: "text-primary bg-accent" },
    ],
    ...table("Active Sessions", [
      { key: "session", label: "Session" },
      { key: "type", label: "Type" },
      { key: "participants", label: "Participants" },
      { key: "quality", label: "Quality", align: "right" },
      { key: "status", label: "Status" },
    ], sessionRows),
  },
  wallets: {
    description: "Overview of user wallet balances and coin holdings",
    stats: [
      { label: "Total Balance", value: "$842K", tone: "text-success bg-success/10" },
      { label: "Coins in Circulation", value: "4.2M", tone: "text-primary bg-accent" },
      { label: "Top-ups (24h)", value: "$18.4K", tone: "text-foreground bg-muted" },
      { label: "Frozen Wallets", value: "14", tone: "text-destructive bg-destructive/10" },
    ],
    ...table("Wallet Balances", [
      { key: "user", label: "User" },
      { key: "balance", label: "Balance", align: "right" },
      { key: "coins", label: "Coins", align: "right" },
      { key: "lastTopUp", label: "Last Top-up" },
      { key: "status", label: "Status" },
    ], walletRows),
  },
  revenue: {
    description: "Platform revenue breakdown and trends",
    stats: [
      { label: "Gross Revenue", value: "$1.42M", tone: "text-success bg-success/10" },
      { label: "This Month", value: "$284K", tone: "text-primary bg-accent" },
      { label: "MoM Growth", value: "+12.4%", tone: "text-success bg-success/10" },
      { label: "ARPU", value: "$8.42", tone: "text-foreground bg-muted" },
    ],
    layout: "analytics",
    chartTitle: "Revenue Trends",
    chartDescription: "Daily gross revenue",
    chartType: "bar",
    chartData: revenueData.map((d) => ({ name: d.name, value: d.revenue })),
    breakdown: [
      { label: "Voice & Video", pct: 48 },
      { label: "Chat Sessions", pct: 27 },
      { label: "Gifts", pct: 16 },
      { label: "Subscriptions", pct: 9 },
    ],
  },
  payouts: {
    description: "Manage listener payout requests and disbursements",
    stats: [
      { label: "Pending", value: "$84.3K", tone: "text-warning bg-warning/10" },
      { label: "Processed (7d)", value: "$312K", tone: "text-success bg-success/10" },
      { label: "Failed", value: "4", tone: "text-destructive bg-destructive/10" },
      { label: "Avg. Processing", value: "2.4d", tone: "text-foreground bg-muted" },
    ],
    ...table("Payout Queue", [
      { key: "id", label: "Payout ID" },
      { key: "listener", label: "Listener" },
      { key: "amount", label: "Amount", align: "right" },
      { key: "method", label: "Method" },
      { key: "status", label: "Status" },
    ], payoutRows),
  },
  "commission-settings": {
    description: "Configure platform commission rates and fee structures",
    stats: [
      { label: "Default Rate", value: "22%", tone: "text-primary bg-accent" },
      { label: "Gift Commission", value: "15%", tone: "text-foreground bg-muted" },
      { label: "Subscription Cut", value: "30%", tone: "text-foreground bg-muted" },
      { label: "Last Updated", value: "3h ago", tone: "text-muted-foreground bg-muted" },
    ],
    layout: "settings",
    settings: [
      {
        group: "Session Commissions",
        items: [
          { label: "Voice call commission", description: "Platform fee on voice sessions", type: "input", value: "22%" },
          { label: "Video call commission", description: "Platform fee on video sessions", type: "input", value: "25%" },
          { label: "Chat commission", description: "Platform fee on paid chat", type: "input", value: "18%" },
        ],
      },
      {
        group: "Other Fees",
        items: [
          { label: "Gift commission", description: "Fee on virtual gift purchases", type: "input", value: "15%" },
          { label: "Payout processing fee", description: "Flat fee per payout", type: "input", value: "$1.50" },
          { label: "Auto-adjust rates", description: "Apply seasonal rate schedules", type: "switch", value: "off" },
        ],
      },
    ],
  },
  "subscription-plans": {
    description: "Manage subscription tiers and pricing",
    stats: [
      { label: "Active Plans", value: "4", tone: "text-primary bg-accent" },
      { label: "Subscribers", value: "27,360", tone: "text-success bg-success/10" },
      { label: "MRR", value: "$184K", tone: "text-success bg-success/10" },
      { label: "Churn Rate", value: "2.1%", tone: "text-warning bg-warning/10" },
    ],
    layout: "cards",
    cards: planCards,
  },
  "gift-catalog": {
    description: "Manage virtual gifts available in the platform",
    stats: [
      { label: "Active Gifts", value: "24", tone: "text-primary bg-accent" },
      { label: "Sent (7d)", value: "18,420", tone: "text-success bg-success/10" },
      { label: "Top Gift", value: "Rose", tone: "text-foreground bg-muted" },
      { label: "Revenue (7d)", value: "$42.8K", tone: "text-success bg-success/10" },
    ],
    layout: "cards",
    cards: giftCards,
  },
  "gift-analytics": {
    description: "Gift purchase trends and revenue analytics",
    stats: [
      { label: "Gifts Sent (7d)", value: "18,420", tone: "text-success bg-success/10" },
      { label: "Revenue", value: "$42.8K", tone: "text-primary bg-accent" },
      { label: "Avg. Gift Value", value: "$2.32", tone: "text-foreground bg-muted" },
      { label: "Top Sender", value: "Rohan M.", tone: "text-foreground bg-muted" },
    ],
    layout: "analytics",
    chartTitle: "Gift Volume",
    chartDescription: "Gifts sent per day",
    chartType: "area",
    chartData: revenueData.map((d) => ({ name: d.name, value: d.coins / 100 })),
    breakdown: [
      { label: "Rose", pct: 34 },
      { label: "Heart", pct: 22 },
      { label: "Star", pct: 18 },
      { label: "Others", pct: 26 },
    ],
  },
  "blocked-accounts": {
    description: "Review and manage blocked or banned accounts",
    stats: [
      { label: "Banned", value: "47", tone: "text-destructive bg-destructive/10" },
      { label: "Suspended", value: "28", tone: "text-warning bg-warning/10" },
      { label: "Appeals Open", value: "6", tone: "text-primary bg-accent" },
      { label: "Auto-blocked (7d)", value: "12", tone: "text-foreground bg-muted" },
    ],
    ...table("Blocked Accounts", [
      { key: "user", label: "User" },
      { key: "reason", label: "Reason" },
      { key: "blockedBy", label: "Blocked By" },
      { key: "date", label: "Date" },
      { key: "status", label: "Status" },
    ], blockedRows),
  },
  "content-moderation": {
    description: "Review flagged content and moderation queue",
    stats: [
      { label: "In Queue", value: "18", tone: "text-warning bg-warning/10" },
      { label: "Resolved (24h)", value: "42", tone: "text-success bg-success/10" },
      { label: "High Priority", value: "5", tone: "text-destructive bg-destructive/10" },
      { label: "Avg. Review", value: "8m", tone: "text-foreground bg-muted" },
    ],
    ...table("Moderation Queue", [
      { key: "id", label: "Item" },
      { key: "content", label: "Type" },
      { key: "user", label: "User" },
      { key: "flag", label: "Priority" },
      { key: "status", label: "Status" },
    ], contentRows),
  },
  "abuse-monitoring": {
    description: "Automated abuse detection signals and risk scores",
    stats: [
      { label: "Active Signals", value: "12", tone: "text-destructive bg-destructive/10" },
      { label: "High Risk", value: "4", tone: "text-destructive bg-destructive/10" },
      { label: "Auto-blocked", value: "7", tone: "text-warning bg-warning/10" },
      { label: "False Positives", value: "2.1%", tone: "text-success bg-success/10" },
    ],
    ...table("Abuse Signals", [
      { key: "signal", label: "Signal" },
      { key: "account", label: "Account" },
      { key: "score", label: "Score", align: "right" },
      { key: "status", label: "Risk" },
      { key: "detected", label: "Detected" },
    ], abuseRows),
  },
  "push-notifications": {
    description: "Create and manage push notification campaigns",
    stats: [
      { label: "Sent (7d)", value: "842K", tone: "text-success bg-success/10" },
      { label: "Open Rate", value: "18.4%", tone: "text-primary bg-accent" },
      { label: "Scheduled", value: "6", tone: "text-warning bg-warning/10" },
      { label: "Opt-out Rate", value: "1.2%", tone: "text-foreground bg-muted" },
    ],
    ...table("Push Campaigns", [
      { key: "title", label: "Campaign" },
      { key: "audience", label: "Audience" },
      { key: "sent", label: "Sent", align: "right" },
      { key: "status", label: "Status" },
      { key: "date", label: "Date" },
    ], notificationRows),
  },
  "in-app-notifications": {
    description: "Manage in-app notification templates and delivery",
    stats: [
      { label: "Templates", value: "24", tone: "text-primary bg-accent" },
      { label: "Delivered (24h)", value: "42K", tone: "text-success bg-success/10" },
      { label: "Read Rate", value: "64%", tone: "text-success bg-success/10" },
      { label: "Pending", value: "3", tone: "text-warning bg-warning/10" },
    ],
    ...table("Notification Log", [
      { key: "title", label: "Template" },
      { key: "audience", label: "Audience" },
      { key: "sent", label: "Delivered", align: "right" },
      { key: "status", label: "Status" },
      { key: "date", label: "Date" },
    ], notificationRows),
  },
  campaigns: {
    description: "Marketing campaigns across push, email and in-app channels",
    stats: [
      { label: "Active", value: "8", tone: "text-success bg-success/10" },
      { label: "Total Reach", value: "284K", tone: "text-primary bg-accent" },
      { label: "Avg. CTR", value: "4.2%", tone: "text-success bg-success/10" },
      { label: "Budget Used", value: "68%", tone: "text-warning bg-warning/10" },
    ],
    ...table("Campaign Dashboard", [
      { key: "name", label: "Campaign" },
      { key: "channel", label: "Channel" },
      { key: "reach", label: "Reach", align: "right" },
      { key: "ctr", label: "CTR", align: "right" },
      { key: "status", label: "Status" },
    ], campaignRows),
  },
  "live-support": {
    description: "Active live support chat sessions with users",
    stats: [
      { label: "Active Chats", value: "12", tone: "text-success bg-success/10" },
      { label: "Waiting", value: "4", tone: "text-warning bg-warning/10" },
      { label: "Agents Online", value: "6", tone: "text-primary bg-accent" },
      { label: "Avg. Wait", value: "3m 40s", tone: "text-foreground bg-muted" },
    ],
    ...table("Live Support Sessions", [
      { key: "chat", label: "Chat ID" },
      { key: "user", label: "User" },
      { key: "agent", label: "Agent" },
      { key: "wait", label: "Wait" },
      { key: "status", label: "Status" },
    ], liveSupportRows),
  },
  "revenue-analytics": {
    description: "Deep dive into revenue metrics and trends",
    stats: [
      { label: "Total Revenue", value: "$1.42M", tone: "text-success bg-success/10" },
      { label: "YoY Growth", value: "+34%", tone: "text-success bg-success/10" },
      { label: "Net Margin", value: "77%", tone: "text-primary bg-accent" },
      { label: "LTV", value: "$142", tone: "text-foreground bg-muted" },
    ],
    layout: "analytics",
    chartTitle: "Revenue Over Time",
    chartDescription: "Weekly revenue performance",
    chartType: "area",
    chartData: revenueData.map((d) => ({ name: d.name, value: d.revenue, value2: d.coins })),
    breakdown: [
      { label: "Calls", pct: 48 },
      { label: "Gifts", pct: 22 },
      { label: "Subscriptions", pct: 18 },
      { label: "Other", pct: 12 },
    ],
  },
  "user-analytics": {
    description: "User growth, retention and engagement metrics",
    stats: [
      { label: "Total Users", value: "48,213", tone: "text-success bg-success/10" },
      { label: "DAU", value: "12,480", tone: "text-primary bg-accent" },
      { label: "Retention (30d)", value: "42%", tone: "text-success bg-success/10" },
      { label: "Churn", value: "3.8%", tone: "text-warning bg-warning/10" },
    ],
    layout: "analytics",
    chartTitle: "User Growth",
    chartDescription: "Registrations vs active users",
    chartType: "line",
    chartData: usersData.map((d) => ({ name: d.name, value: d.registrations, value2: d.active })),
  },
  "listener-analytics": {
    description: "Listener supply, utilization and performance analytics",
    stats: [
      { label: "Total Listeners", value: "1,842", tone: "text-success bg-success/10" },
      { label: "Utilization", value: "68%", tone: "text-primary bg-accent" },
      { label: "Avg. Sessions/Day", value: "6.2", tone: "text-foreground bg-muted" },
      { label: "New (30d)", value: "84", tone: "text-success bg-success/10" },
    ],
    layout: "analytics",
    chartTitle: "Listener Activity",
    chartDescription: "Sessions by time of day",
    chartType: "bar",
    chartData: commsData.map((d) => ({ name: d.name, value: d.voice + d.video, value2: d.chats })),
  },
  "session-analytics": {
    description: "Session volume, duration and channel analytics",
    stats: [
      { label: "Sessions (7d)", value: "84,200", tone: "text-success bg-success/10" },
      { label: "Avg. Duration", value: "11m 18s", tone: "text-foreground bg-muted" },
      { label: "Completion Rate", value: "93%", tone: "text-success bg-success/10" },
      { label: "Peak Hour", value: "8 PM", tone: "text-primary bg-accent" },
    ],
    layout: "analytics",
    chartTitle: "Session Volume",
    chartDescription: "Sessions by channel",
    chartType: "bar",
    chartData: commsData.map((d) => ({ name: d.name, value: d.chats, value2: d.voice })),
    breakdown: [
      { label: "Chat", pct: 52 },
      { label: "Voice", pct: 31 },
      { label: "Video", pct: 17 },
    ],
  },
  "company-profile": {
    description: "Manage company information and public profile",
    stats: [
      { label: "Founded", value: "2022", tone: "text-foreground bg-muted" },
      { label: "Team Size", value: "48", tone: "text-primary bg-accent" },
      { label: "Countries", value: "12", tone: "text-foreground bg-muted" },
      { label: "Last Updated", value: "2d ago", tone: "text-muted-foreground bg-muted" },
    ],
    layout: "settings",
    settings: [
      {
        group: "Company Details",
        items: [
          { label: "Company name", description: "Legal business name", type: "input", value: "Auralis Technologies Pvt. Ltd." },
          { label: "Support email", description: "Public support contact", type: "input", value: "support@auralis.app" },
          { label: "Website", description: "Company website URL", type: "input", value: "https://auralis.app" },
        ],
      },
      {
        group: "Address",
        items: [
          { label: "Headquarters", description: "Primary office location", type: "input", value: "Bangalore, India" },
          { label: "Registration ID", description: "Business registration number", type: "input", value: "U72900KA2022PTC123456" },
        ],
      },
    ],
  },
  branding: {
    description: "Customize platform branding, colors and assets",
    stats: [
      { label: "Theme", value: "Light", tone: "text-primary bg-accent" },
      { label: "Logo Version", value: "v3.2", tone: "text-foreground bg-muted" },
      { label: "Last Deploy", value: "5d ago", tone: "text-muted-foreground bg-muted" },
      { label: "CDN Status", value: "Healthy", tone: "text-success bg-success/10" },
    ],
    layout: "settings",
    settings: [
      {
        group: "Brand Identity",
        items: [
          { label: "Primary color", description: "Main brand color (hex)", type: "input", value: "#6B4EFF" },
          { label: "Accent color", description: "Secondary accent color", type: "input", value: "#A855F7" },
          { label: "Dark mode default", description: "Default theme for new users", type: "switch", value: "off" },
        ],
      },
      {
        group: "Assets",
        items: [
          { label: "App name", description: "Display name in app", type: "input", value: "Auralis" },
          { label: "Tagline", description: "Marketing tagline", type: "input", value: "Listen. Connect. Heal." },
        ],
      },
    ],
  },
  "legal-documents": {
    description: "Terms of service, privacy policy and legal documents",
    stats: [
      { label: "Published", value: "6", tone: "text-success bg-success/10" },
      { label: "Draft", value: "2", tone: "text-warning bg-warning/10" },
      { label: "Last Review", value: "14d ago", tone: "text-foreground bg-muted" },
      { label: "Compliance", value: "GDPR", tone: "text-primary bg-accent" },
    ],
    layout: "documents",
    documents: [
      { name: "Terms of Service", type: "Legal", updated: "Jun 1, 2024", status: "published" },
      { name: "Privacy Policy", type: "Legal", updated: "May 15, 2024", status: "published" },
      { name: "Listener Agreement", type: "Contract", updated: "Apr 22, 2024", status: "published" },
      { name: "Cookie Policy", type: "Legal", updated: "Mar 10, 2024", status: "published" },
      { name: "Community Guidelines", type: "Policy", updated: "Jun 8, 2024", status: "draft" },
      { name: "Refund Policy", type: "Legal", updated: "Feb 28, 2024", status: "published" },
    ],
  },
  "access-policies": {
    description: "Define access control policies and approval workflows",
    stats: [
      { label: "Active Policies", value: "6", tone: "text-success bg-success/10" },
      { label: "Roles Covered", value: "6", tone: "text-primary bg-accent" },
      { label: "Pending Reviews", value: "2", tone: "text-warning bg-warning/10" },
      { label: "Last Audit", value: "7d ago", tone: "text-foreground bg-muted" },
    ],
    ...table("Access Policies", [
      { key: "policy", label: "Policy" },
      { key: "scope", label: "Scope" },
      { key: "roles", label: "Applies To" },
      { key: "status", label: "Status" },
    ], policyRows),
  },
  "platform-settings": {
    description: "Core platform configuration and feature toggles",
    stats: [
      { label: "Features Enabled", value: "24/28", tone: "text-success bg-success/10" },
      { label: "Maintenance", value: "Off", tone: "text-success bg-success/10" },
      { label: "API Version", value: "v2.4", tone: "text-primary bg-accent" },
      { label: "Uptime", value: "99.98%", tone: "text-success bg-success/10" },
    ],
    layout: "settings",
    settings: [
      {
        group: "Platform",
        items: [
          { label: "Maintenance mode", description: "Disable public access for maintenance", type: "switch", value: "off" },
          { label: "New registrations", description: "Allow new user sign-ups", type: "switch", value: "on" },
          { label: "Default language", description: "Platform default locale", type: "select", value: "English", options: ["English", "Hindi", "Tamil"] },
        ],
      },
      {
        group: "Sessions",
        items: [
          { label: "Max session duration", description: "Maximum call/chat length", type: "input", value: "60 minutes" },
          { label: "Recording enabled", description: "Allow session recording", type: "switch", value: "off" },
        ],
      },
    ],
  },
  "payment-gateways": {
    description: "Configure and monitor payment gateway integrations",
    stats: [
      { label: "Active Gateways", value: "3", tone: "text-success bg-success/10" },
      { label: "Success Rate", value: "96.4%", tone: "text-success bg-success/10" },
      { label: "Failed (24h)", value: "18", tone: "text-warning bg-warning/10" },
      { label: "Primary", value: "Stripe", tone: "text-primary bg-accent" },
    ],
    layout: "cards",
    cards: gatewayCards,
  },
  "communication-settings": {
    description: "Configure chat, voice and video communication settings",
    stats: [
      { label: "Voice Provider", value: "Twilio", tone: "text-primary bg-accent" },
      { label: "Video Provider", value: "Agora", tone: "text-primary bg-accent" },
      { label: "Chat Engine", value: "Firebase", tone: "text-primary bg-accent" },
      { label: "Latency", value: "42ms", tone: "text-success bg-success/10" },
    ],
    layout: "settings",
    settings: [
      {
        group: "Voice & Video",
        items: [
          { label: "HD video default", description: "Enable HD video by default", type: "switch", value: "on" },
          { label: "Noise cancellation", description: "AI noise suppression", type: "switch", value: "on" },
          { label: "Max participants", description: "Video call participant limit", type: "input", value: "2" },
        ],
      },
      {
        group: "Chat",
        items: [
          { label: "Message retention", description: "Days to retain chat history", type: "input", value: "90 days" },
          { label: "Media sharing", description: "Allow image/file sharing in chat", type: "switch", value: "on" },
          { label: "End-to-end encryption", description: "Encrypt chat messages", type: "switch", value: "on" },
        ],
      },
    ],
  },
};

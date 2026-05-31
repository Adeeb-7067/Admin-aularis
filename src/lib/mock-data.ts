// Mock data for the admin panel demo.

export const kpis = [
  { label: "Total Revenue", value: "$1.42M", trend: 12.4, positive: true, prefix: "", spark: [12, 18, 15, 22, 28, 26, 34, 30, 38, 42] },
  { label: "Revenue Today", value: "$28,940", trend: 8.1, positive: true, spark: [8, 12, 9, 14, 11, 16, 18, 15, 20, 22] },
  { label: "Active Users", value: "48,213", trend: 5.7, positive: true, spark: [30, 32, 31, 35, 38, 36, 40, 42, 41, 45] },
  { label: "Online Listeners", value: "1,284", trend: 2.3, positive: true, spark: [20, 22, 21, 24, 23, 26, 25, 28, 27, 30] },
  { label: "Active Calls", value: "362", trend: -3.4, positive: false, spark: [40, 38, 42, 36, 39, 34, 37, 33, 35, 31] },
  { label: "Video Sessions", value: "148", trend: 14.2, positive: true, spark: [10, 14, 12, 18, 16, 22, 20, 26, 24, 30] },
  { label: "Pending Approvals", value: "37", trend: -6.0, positive: true, spark: [22, 20, 24, 19, 21, 17, 18, 15, 16, 12] },
  { label: "Pending Withdrawals", value: "$84,320", trend: 4.9, positive: false, spark: [18, 20, 19, 22, 21, 24, 23, 26, 25, 28] },
];

export const revenueData = [
  { name: "Mon", revenue: 42000, coins: 31000 },
  { name: "Tue", revenue: 38000, coins: 28000 },
  { name: "Wed", revenue: 51000, coins: 39000 },
  { name: "Thu", revenue: 47000, coins: 35000 },
  { name: "Fri", revenue: 63000, coins: 48000 },
  { name: "Sat", revenue: 78000, coins: 61000 },
  { name: "Sun", revenue: 69000, coins: 54000 },
];

export const usersData = [
  { name: "Week 1", registrations: 1200, active: 8400 },
  { name: "Week 2", registrations: 1500, active: 9100 },
  { name: "Week 3", registrations: 1350, active: 9600 },
  { name: "Week 4", registrations: 1820, active: 10400 },
  { name: "Week 5", registrations: 2100, active: 11200 },
  { name: "Week 6", registrations: 1980, active: 11800 },
];

export const commsData = [
  { name: "00h", chats: 120, voice: 80, video: 30 },
  { name: "04h", chats: 60, voice: 40, video: 12 },
  { name: "08h", chats: 220, voice: 160, video: 70 },
  { name: "12h", chats: 380, voice: 260, video: 120 },
  { name: "16h", chats: 420, voice: 300, video: 150 },
  { name: "20h", chats: 510, voice: 360, video: 190 },
];

export const channelSplit = [
  { name: "Chat", value: 52, color: "var(--chart-1)" },
  { name: "Voice", value: 31, color: "var(--chart-2)" },
  { name: "Video", value: 17, color: "var(--chart-3)" },
];

export const activityFeed = [
  { type: "user", text: "Priya M. joined the platform", time: "just now" },
  { type: "approve", text: "Listener Aisha K. was approved", time: "12s ago" },
  { type: "recharge", text: "Rohan S. recharged $50.00", time: "34s ago" },
  { type: "call", text: "Video call started · Maya ↔ Dev", time: "1m ago" },
  { type: "withdraw", text: "Withdrawal requested · $1,200", time: "2m ago" },
  { type: "report", text: "Abuse report submitted on user #8842", time: "3m ago" },
  { type: "call", text: "Voice call ended · 14m 22s", time: "4m ago" },
];

const names = ["Aanya Sharma", "Rohan Mehta", "Priya Nair", "Dev Kapoor", "Maya Rao", "Arjun Singh", "Isha Verma", "Kabir Joshi", "Neha Gupta", "Vikram Das"];
const statuses = ["active", "active", "active", "suspended", "active", "banned", "active"] as const;

export const users = Array.from({ length: 24 }, (_, i) => ({
  id: `USR-${10245 + i}`,
  name: names[i % names.length],
  email: `${names[i % names.length].split(" ")[0].toLowerCase()}${i}@mail.com`,
  mobile: `+91 9${(800000000 + i * 13731).toString().slice(0, 9)}`,
  wallet: Math.round(Math.random() * 5000) / 10,
  status: statuses[i % statuses.length],
  lastActive: ["2m ago", "1h ago", "Yesterday", "3d ago"][i % 4],
  joined: `2024-0${(i % 9) + 1}-1${i % 9}`,
}));

export const listeners = Array.from({ length: 8 }, (_, i) => ({
  id: `LIS-${5021 + i}`,
  name: names[(i + 2) % names.length],
  languages: [["English", "Hindi"], ["Tamil", "English"], ["Bengali"], ["Hindi", "Punjabi", "English"]][i % 4],
  docs: 3,
  status: (["pending", "pending", "review", "pending"] as const)[i % 4],
}));

export const transactions = Array.from({ length: 18 }, (_, i) => ({
  id: `TXN-${90231 + i}`,
  user: names[i % names.length],
  type: (["Recharge", "Gift", "Payout", "Subscription"] as const)[i % 4],
  amount: Math.round((Math.random() * 800 + 20) * 100) / 100,
  status: (["completed", "pending", "completed", "failed"] as const)[i % 4],
  date: `Jun ${(i % 28) + 1}, 2024`,
}));

export const reports = Array.from({ length: 6 }, (_, i) => ({
  id: `RPT-${3301 + i}`,
  reporter: names[i % names.length],
  target: names[(i + 4) % names.length],
  reason: ["Harassment", "Spam", "Inappropriate content", "Fraud", "Abuse", "Other"][i],
  risk: (["high", "medium", "low"] as const)[i % 3],
  status: (["open", "open", "resolved"] as const)[i % 3],
  date: `${(i % 12) + 1}h ago`,
}));

export const roles = [
  { name: "Super Admin", users: 2, desc: "Full unrestricted access" },
  { name: "Admin", users: 6, desc: "Manage most platform areas" },
  { name: "Finance Manager", users: 3, desc: "Wallets, payouts & revenue" },
  { name: "Moderator", users: 9, desc: "Reports & content safety" },
  { name: "Support Agent", users: 14, desc: "Tickets & live support" },
  { name: "Marketing Manager", users: 4, desc: "Campaigns & notifications" },
];

export const permissionModules = ["Users", "Listeners", "Finance", "Moderation", "Notifications", "Settings"];
export const permissionActions = ["View", "Create", "Edit", "Delete", "Approve", "Export"];

export const auditLogs = [
  { user: "Aanya Sharma", action: "Approved payout #PAY-2391 ($1,200)", time: "2m ago", ip: "103.21.44.12" },
  { user: "Dev Kapoor", action: "Changed role of Neha G. to Moderator", time: "18m ago", ip: "88.12.9.5" },
  { user: "Priya Nair", action: "Verified listener LIS-5028", time: "1h ago", ip: "172.16.4.2" },
  { user: "System", action: "Updated commission rate to 22%", time: "3h ago", ip: "10.0.0.1" },
  { user: "Rohan Mehta", action: "Logged in from new device", time: "5h ago", ip: "49.36.220.7" },
  { user: "Maya Rao", action: "Suspended user USR-10288", time: "Yesterday", ip: "115.99.1.44" },
];

export const userKpis = [
  { label: "Total Users", value: "48,213", trend: 5.7, positive: true, spark: [30, 32, 31, 35, 38, 36, 40, 42, 41, 45] },
  { label: "Active Today", value: "12,480", trend: 8.2, positive: true, spark: [22, 24, 23, 26, 28, 27, 30, 32, 31, 34] },
  { label: "New (7d)", value: "1,842", trend: 11.4, positive: true, spark: [12, 14, 13, 16, 18, 17, 20, 22, 21, 24] },
  { label: "Suspended", value: "28", trend: -3.1, positive: true, spark: [18, 17, 19, 16, 15, 14, 13, 12, 11, 10] },
];

export const listenerKpis = [
  { label: "Avg. Rating", value: "4.82", trend: 2.1, positive: true, spark: [38, 39, 40, 41, 42, 41, 43, 44, 43, 45] },
  { label: "Acceptance Rate", value: "91%", trend: 4.5, positive: true, spark: [82, 84, 85, 86, 87, 88, 89, 90, 90, 91] },
  { label: "Total Earnings", value: "$284K", trend: 14.2, positive: true, spark: [18, 20, 22, 24, 26, 28, 30, 32, 34, 36] },
  { label: "Avg. Session", value: "12m 40s", trend: 6.8, positive: true, spark: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29] },
];

export const moderationKpis = [
  { label: "Open Reports", value: "24", trend: -8.4, positive: true, spark: [32, 30, 28, 27, 26, 25, 24, 23, 24, 24] },
  { label: "Resolved Reports", value: "318", trend: 12.1, positive: true, spark: [24, 26, 28, 30, 32, 34, 36, 38, 40, 42] },
  { label: "Banned Users", value: "47", trend: 2.3, positive: false, spark: [40, 41, 42, 43, 44, 45, 46, 46, 47, 47] },
  { label: "High Risk", value: "12", trend: -15.0, positive: true, spark: [22, 20, 18, 16, 15, 14, 13, 12, 12, 12] },
];

export const supportKpis = [
  { label: "Open Tickets", value: "42", trend: -5.2, positive: true, spark: [52, 50, 48, 46, 45, 44, 43, 42, 42, 42] },
  { label: "Pending", value: "18", trend: 3.4, positive: false, spark: [14, 15, 16, 16, 17, 17, 18, 18, 18, 18] },
  { label: "Resolved Today", value: "76", trend: 18.6, positive: true, spark: [40, 44, 48, 52, 56, 60, 64, 68, 72, 76] },
  { label: "Avg. Response", value: "8m", trend: -12.0, positive: true, spark: [14, 13, 12, 11, 10, 10, 9, 9, 8, 8] },
];

export const rolesKpis = [
  { label: "Total Roles", value: "6", trend: 0, positive: true, spark: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6] },
  { label: "Admin Users", value: "38", trend: 6.4, positive: true, spark: [28, 29, 30, 32, 33, 34, 35, 36, 37, 38] },
  { label: "Policy Changes", value: "4", trend: -20.0, positive: true, spark: [8, 7, 6, 6, 5, 5, 4, 4, 4, 4] },
  { label: "Last Audit", value: "7d ago", trend: 0, positive: true, spark: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20] },
];

export const auditKpis = [
  { label: "Events (24h)", value: "142", trend: 9.8, positive: true, spark: [100, 108, 112, 118, 122, 128, 132, 136, 140, 142] },
  { label: "Unique Admins", value: "18", trend: 5.5, positive: true, spark: [14, 14, 15, 15, 16, 16, 17, 17, 18, 18] },
  { label: "Critical Actions", value: "6", trend: -14.3, positive: true, spark: [10, 9, 9, 8, 8, 7, 7, 6, 6, 6] },
  { label: "Failed Logins", value: "3", trend: -25.0, positive: true, spark: [8, 7, 6, 5, 5, 4, 4, 3, 3, 3] },
];

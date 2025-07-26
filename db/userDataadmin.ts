export interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
  iconFamily: "MaterialIcons" | "Feather" | "Ionicons";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  status: "active" | "inactive" | "suspended";
  avatar?: string;
  joinDate: string;
  lastActive: string;
}

interface Content {
  id: string;
  title: string;
  type: "course" | "post" | "announcement";
  author: string;
  status: "published" | "draft" | "review";
  views: number;
  createdAt: string;
}

// Mock data
export const stats: StatCard[] = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: "people",
    iconFamily: "MaterialIcons",
  },
  {
    title: "Active Courses",
    value: "156",
    change: "+8.2%",
    changeType: "positive",
    icon: "book-open",
    iconFamily: "Feather",
  },
  {
    title: "Revenue",
    value: "$42,847",
    change: "+23.1%",
    changeType: "positive",
    icon: "trending-up",
    iconFamily: "Feather",
  },
  {
    title: "Support Tickets",
    value: "23",
    change: "-15.3%",
    changeType: "positive",
    icon: "help-circle",
    iconFamily: "Feather",
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "instructor",
    status: "active",
    joinDate: "2023-12-10",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-02-20",
    lastActive: "1 week ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-11-05",
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    role: "student",
    status: "suspended",
    joinDate: "2024-01-01",
    lastActive: "1 month ago",
  },
  {
    id: "6",
    name: "Olivia Brown",
    email: "olivia@example.com",
    role: "instructor",
    status: "active",
    joinDate: "2023-12-15",
    lastActive: "2 days ago",
  },
  {
    id: "7",
    name: "James Anderson",
    email: "james@example.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-02-25",
    lastActive: "1 week ago",
  },
  {
    id: "8",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-11-10",
    lastActive: "3 days ago",
  },
  {
    id: "9",
    name: "William Thompson",
    email: "william@example.com",
    role: "student",
    status: "suspended",
    joinDate: "2024-01-05",
    lastActive: "1 month ago",
  },
  {
    id: "10",
    name: "Emma Taylor",
    email: "emma@example.com",
    role: "instructor",
    status: "active",
    joinDate: "2023-12-20",
    lastActive: "2 days ago",
  },
  {
    id: "11",
    name: "Benjamin White",
    email: "benjamin@example.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-02-30",
    lastActive: "1 week ago",
  },
  {
    id: "12",
    name: "Mia Harris",
    email: "mia@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-11-15",
    lastActive: "3 days ago",
  },
];

export const content: Content[] = [
  {
    id: "1",
    title: "Introduction to React Native",
    type: "course",
    author: "Sarah Smith",
    status: "published",
    views: 1247,
    createdAt: "2024-01-20",
  },
  {
    id: "2",
    title: "New Features Update",
    type: "announcement",
    author: "Admin",
    status: "published",
    views: 892,
    createdAt: "2024-01-18",
  },
];

import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import { ScanFace, DatabaseZap, BellRing } from "lucide-react";

export const SidebarItems = [
  {
    title: "Authentication",
    path: "/admin/auth",
    icon: <ScanFace className="h-4 w-4" />,
  },
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "User Setup",
    path: "/admin/user-setup",
    icon: <AvatarIcon />,
  },
  {
    title: "Data Synchronisation",
    path: "/admin/data-sync",
    icon: <DatabaseZap className="h-4 w-4"/>,
  },
  {
    title: "Notification",
    path: "/admin/notification",
    icon: <BellRing className="h-4 w-4"/>,
  },
];

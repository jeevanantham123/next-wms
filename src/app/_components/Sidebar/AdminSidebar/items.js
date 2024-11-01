import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";

export const SidebarItems = [
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
];

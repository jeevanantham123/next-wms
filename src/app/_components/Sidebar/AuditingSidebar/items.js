import { AvatarIcon, BellIcon, HomeIcon } from "@radix-ui/react-icons";
import { FileIcon, FunctionSquareIcon, HistoryIcon, InfoIcon, KeyIcon, ListIcon, SquareFunctionIcon, TextIcon, User2 } from "lucide-react";

export const SidebarItems = [
  {
    title: "User",
    path: "/auditing/user",
    icon: <User2 />,
  },
  {
    title: "Functional profile",
    path: "/auditing/functional-profile",
    icon: <InfoIcon />,
  },
  {
    title: "Functional authorization",
    path: "/auditing/functional-authorization",
    icon: <KeyIcon />,
  },
  {
    title: "Master data",
    path: "/auditing/master-data",
    icon: <FileIcon />,
  },
  {
    title: "Transactional data",
    path: "/auditing/transactional-data",
    icon: <TextIcon />,
  },
  {
    title: "Login history",
    path: "/auditing/login-history",
    icon: <HistoryIcon />,
  },
  {
    title: "DB history",
    path: "/auditing/db-history",
    icon: <HistoryIcon />,
  },
  {
    title: "Notifications",
    path: "/auditing/notifications",
    icon: <BellIcon />,
  },


];

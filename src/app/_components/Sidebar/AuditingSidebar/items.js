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
    path: "/auditing/dashboard",
    icon: <InfoIcon />,
  },
  {
    title: "Functional auathorisation",
    path: "/auditing/dashboard",
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
    title: "All",
    path: "/auditing/dashboard",
    icon: <ListIcon />,
  },
  {
    title: "Login history",
    path: "/auditing/dashboard",
    icon: <HistoryIcon />,
  },
  {
    title: "DB history",
    path: "/auditing/dashboard",
    icon: <HistoryIcon />,
  },
  {
    title: "Notifications",
    path: "/auditing/dashboard",
    icon: <BellIcon />,
  },


];

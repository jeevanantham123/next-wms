import {
  AvatarIcon,
  HomeIcon,
  ReaderIcon,
  TokensIcon,
  TrackNextIcon,
} from "@radix-ui/react-icons";
import { UniversityIcon } from "lucide-react";

export const SidebarItems = [
  // {
  //   title: "Home",
  //   path: "/wms/dashboard",
  //   icon: <HomeIcon />,
  // },
  {
    title: "Stock Movement",
    path: "/wms/stock-movement",
    icon: <TokensIcon />,
  },
  {
    title: "Status Change",
    path: "/wms/status-selection",
    icon: <TokensIcon />,
  },
  {
    title: "Unit Change",
    path: "/wms/unit-change",
    icon: <ReaderIcon />,
  },
  {
    title: "Receipts",
    path: "/wms/receipts",
    icon: <ReaderIcon />,
  },
  // {
  //   title: "My Account",
  //   path: "/account",
  //   icon: <AvatarIcon />,
  // },
];

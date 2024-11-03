import {
  AvatarIcon,
  HomeIcon,
  ReaderIcon,
  TokensIcon,
} from "@radix-ui/react-icons";

export const SidebarItems = [
  {
    title: "Home",
    path: "/wms/dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "Status Change",
    path: "/wms/status-selection",
    icon: <TokensIcon />,
  },
  {
    title: "Receipts",
    path: "/wms/receipts",
    icon: <ReaderIcon />,
  },
  {
    title: "My Account",
    path: "/account",
    icon: <AvatarIcon />,
  },
];

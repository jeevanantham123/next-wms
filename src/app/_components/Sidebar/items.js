import {
  AvatarIcon,
  HomeIcon,
  ReaderIcon,
  TokensIcon,
} from "@radix-ui/react-icons";

export const SidebarItems = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Status Change",
    path: "/status-selection",
    icon: <TokensIcon />,
  },
  {
    title: "Receipts",
    path: "/receipts",
    icon: <ReaderIcon />,
  },
  {
    title: "My Account",
    path: "/account",
    icon: <AvatarIcon />,
  },
];

import {
  AvatarIcon,
  ButtonIcon,
  ColumnsIcon,
  Component1Icon,
  Component2Icon,
  HamburgerMenuIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";

export const SidebarItems = [
  // {
  //   title: "Dashboard",
  //   path: "/auditing/dashboard",
  //   icon: <TokensIcon />,
  // },
  {
    title: "User",
    path: "/auditing/user",
    icon: <AvatarIcon />,
  },
  {
    title: "Functional profile",
    path: "/auditing/functional-profile",
    icon: <Component1Icon />,
  },
  {
    title: "Functional authentication",
    path: "/auditing/functional-authentication",
    icon: <Component2Icon />,
  },
  {
    title: "Master data",
    path: "/auditing/master-data",
    icon: <ColumnsIcon />,
  },
  {
    title: "Transactional data",
    path: "/auditing/transactional-data",
    icon: <ButtonIcon />,
  },
  // {
  //   title: "All",
  //   path: "/auditing/all",
  //   icon: <RowsIcon />,
  // },
  {
    title: "Login history",
    path: "/auditing/login-history",
    icon: <LockClosedIcon />,
  },
  {
    title: "DB history",
    path: "/auditing/db-history",
    icon: <HamburgerMenuIcon />,
  },
  // {
  //   title: "Notifications",
  //   path: "/auditing/notifications",
  //   icon: <BellIcon />,
  // },
];

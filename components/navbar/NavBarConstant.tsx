import { NavBarItemType } from "@/types";

export const NavBarItems: NavBarItemType[] = [
    {
        label: "Dashboard",
        path: "/"
    },
    {
        label: "User",
        path: "/user",
        children: [{ label: "User Management", path: "/user/management" }]
    }
];

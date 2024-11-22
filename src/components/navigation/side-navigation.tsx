"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";

const sideMenuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "History",
    icon: FileClock,
    path: "/dashboard/history",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/dashboard/billing",
  },
  {
    name: "settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
] as const;

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <aside className="h-screen border p-5 shadow-sm">
      <ul className="h-full">
        {sideMenuItems.map((sideMenuItem) => (
          <li
            key={sideMenuItem.name}
            className={twMerge(
              "m-2 mr-4 flex cursor-pointer rounded-lg p-2 hover:bg-primary/80 hover:text-white",
              pathname === sideMenuItem.path && "bg-primary text-white",
            )}
          >
            <Link href={sideMenuItem.path} className="flex">
              <sideMenuItem.icon />
              <span className="ml-2">{sideMenuItem.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

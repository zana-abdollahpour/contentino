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
    <aside className="sticky top-0 h-screen border shadow-sm">
      <ul className="h-full">
        {sideMenuItems.map((sideMenuItem) => (
          <li
            key={sideMenuItem.name}
            className={twMerge(
              "my-4 flex w-fit cursor-pointer rounded-lg p-2 first-of-type:mt-0 hover:bg-primary/80 hover:text-white md:w-auto md:pr-6",
              pathname === sideMenuItem.path && "bg-primary text-white",
            )}
          >
            <Link
              href={sideMenuItem.path}
              className="flex w-full items-center justify-center md:justify-start"
            >
              <sideMenuItem.icon />
              <span className="ml-2 hidden md:inline">{sideMenuItem.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

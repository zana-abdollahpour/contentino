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

import Usage from "./usage";

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

interface SideNavigationProps {
  className: string;
}

export default function SideNavigation({ className }: SideNavigationProps) {
  const pathname = usePathname();

  return (
    <aside
      className={twMerge(
        "top-4 max-h-full rounded-lg border shadow-sm",
        className,
      )}
    >
      <ul className="flex h-full flex-col items-stretch justify-start gap-4">
        {sideMenuItems.map((sideMenuItem) => (
          <li
            key={sideMenuItem.name}
            className={twMerge(
              "flex w-full cursor-pointer rounded-lg p-2",
              "first-of-type:mt-0 hover:bg-primary/80 hover:text-white md:w-auto md:pr-6",
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
        <li className="mt-auto w-full">
          <Usage />
        </li>
      </ul>
    </aside>
  );
}

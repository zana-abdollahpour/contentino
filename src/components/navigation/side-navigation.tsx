"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
  Menu,
} from "lucide-react";

import Usage from "./usage";
import SignupModal from "@/components/modal/signup-modal";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  className?: string;
}

export default function SideNavigation({ className }: SideNavigationProps) {
  const pathname = usePathname();

  const menu = (
    <aside className="mt-8 h-full rounded-lg p-5 shadow-sm sm:mt-0 sm:border">
      <ul className="flex h-full flex-col items-stretch justify-start gap-4">
        {sideMenuItems.map((sideMenuItem) => (
          <li
            key={sideMenuItem.name}
            className={twMerge(
              "flex w-full cursor-pointer rounded-lg p-2",
              "first-of-type:mt-0 hover:bg-primary/80 hover:text-white sm:pr-28 md:w-auto",
              pathname === sideMenuItem.path && "bg-primary text-white",
            )}
          >
            <SheetClose asChild>
              <Link
                href={sideMenuItem.path}
                className="flex w-full items-center justify-start md:justify-start"
              >
                <sideMenuItem.icon />
                <span className="ml-2">{sideMenuItem.name}</span>
              </Link>
            </SheetClose>
          </li>
        ))}
        <li className="mb-8 mt-auto w-full rounded-lg bg-primary/10 px-4 sm:mb-0">
          <Usage />
          <SignupModal />
        </li>
      </ul>
    </aside>
  );

  return (
    <div className={twMerge("rounded-md bg-primary/5", className)}>
      <Sheet>
        <SheetTrigger className="sm:hidden">
          <Menu className="ml-2 mt-1 h-12 w-12 rounded-full bg-primary/10 p-2" />
        </SheetTrigger>

        <SheetContent side="left" className="w-72 p-0 pt-2">
          {menu}
        </SheetContent>
        <div className="hidden h-full sm:block">{menu}</div>
      </Sheet>
    </div>
  );
}

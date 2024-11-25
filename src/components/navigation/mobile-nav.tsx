import { twMerge } from "tailwind-merge";
import { Menu } from "lucide-react";

import SideNavigation from "./side-navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileNavProps {
  className?: string;
}

export default function MobileNav({ className }: MobileNavProps) {
  return (
    <div className={twMerge("mb-2 w-full bg-primary/5 py-2", className)}>
      <div className="h-full rounded-sm px-1">
        <Sheet>
          <SheetTrigger>
            <Menu className="ml-2 h-12 w-12 rounded-full bg-primary/10 p-2" />
          </SheetTrigger>

          <SheetContent side="left" className="w-72">
            <SideNavigation />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

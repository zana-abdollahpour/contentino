import { twMerge } from "tailwind-merge";

import MobileNav from "@/components/navigation/mobile-nav";
import SideNavigation from "@/components/navigation/side-navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={twMerge(
        "relative flex flex-col overflow-y-hidden sm:flex-row",
        "h-[calc(100dvh_-_4.5rem)] md:h-[calc(100dvh_-_6.5rem)]",
      )}
    >
      <SideNavigation className="hidden p-5 pb-0 sm:block" />
      <MobileNav className="sm:hidden" />
      <main className="max-h-full w-full overflow-y-scroll p-5 pb-0">
        {children}
      </main>
    </div>
  );
}

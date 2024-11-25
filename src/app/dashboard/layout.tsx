import { twMerge } from "tailwind-merge";

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
      <SideNavigation className="mb-4 pb-0" />
      <main className="mb-4 max-h-full w-full overflow-y-scroll p-5 pb-0">
        {children}
      </main>
    </div>
  );
}

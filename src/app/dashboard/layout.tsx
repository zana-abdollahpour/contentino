import SideNavigation from "@/components/navigation/side-navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-[calc(100dvh_-_4.5rem)] overflow-y-hidden md:h-[calc(100dvh_-_6.5rem)]">
      <SideNavigation className="p-5 pb-0" />
      <main className="max-h-full w-full overflow-y-scroll p-5 pb-0">
        {children}
      </main>
    </div>
  );
}

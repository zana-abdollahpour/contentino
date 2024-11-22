import SideNavigation from "@/components/navigation/side-navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex [&>*]:p-5">
      <SideNavigation />
      <main className="md:!pr-0">{children}</main>
    </div>
  );
}

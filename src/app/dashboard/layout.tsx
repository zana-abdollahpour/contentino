import SideNavigation from "@/components/navigation/side-navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <SideNavigation />
      </div>
      <main className="col-span-3">
        <p>main content</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni impedit
          eaque vitae quos, porro animi a ea. Distinctio voluptatem assumenda
          praesentium natus dolorem reprehenderit, impedit in, tempore adipisci
          repellat cum.
        </p>
        {children}
      </main>
    </div>
  );
}

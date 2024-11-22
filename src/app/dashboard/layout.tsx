import SideNavigation from "@/components/navigation/side-navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex [&>*]:p-5">
      <SideNavigation />
      <main>
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

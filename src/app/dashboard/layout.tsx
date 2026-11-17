import DashboardSidebar from "@/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="dashboard-shell min-h-[calc(100svh-var(--navbar-height))] flex-1">
      <DashboardSidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <SidebarTrigger />
        </div>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}

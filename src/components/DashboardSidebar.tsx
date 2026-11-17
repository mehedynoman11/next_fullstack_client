"use client";

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

type Role = "seeker" | "recruiter" | "admin";

type MenuItem = {
  id: string;
  name: string;
  url: string;
  item: LucideIcon;
};

const menuItemByRole: Record<Role, MenuItem[]> = {
  seeker: [
    { id: "overview", name: "Overview", url: "/dashboard/seeker", item: LayoutDashboard },
    { id: "browse-jobs", name: "Browse Jobs", url: "/jobs", item: Briefcase },
    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved", item: Bookmark },
    { id: "applications", name: "My Applications", url: "/dashboard/seeker/applications", item: FileText },
    { id: "messages", name: "Messages", url: "/dashboard/seeker/messages", item: MessageSquare },
    { id: "profile", name: "Profile", url: "/dashboard/seeker/profile", item: UserRound },
    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", item: Settings },
  ],
  recruiter: [
    { id: "overview", name: "Overview", url: "/dashboard/recruiter", item: LayoutDashboard },
    { id: "post-job", name: "Post a Job", url: "/dashboard/recruiter/post-job", item: PlusCircle },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", item: Briefcase },
    { id: "applicants", name: "Applicants", url: "/dashboard/recruiter/applicants", item: Users },
    { id: "messages", name: "Messages", url: "/dashboard/recruiter/messages", item: MessageSquare },
    { id: "company", name: "Company Profile", url: "/dashboard/recruiter/company", item: Building2 },
    { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", item: Settings },
  ],
  admin: [
    { id: "overview", name: "Overview", url: "/dashboard/admin", item: LayoutDashboard },
    { id: "users", name: "Users", url: "/dashboard/admin/users", item: Users },
    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", item: Building2 },
    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", item: Briefcase },
    { id: "applications", name: "Applications", url: "/dashboard/admin/applications", item: FileText },
    { id: "analytics", name: "Analytics", url: "/dashboard/admin/analytics", item: BarChart3 },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", item: Settings },
  ],
};

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const role: Role = session?.user?.role ?? "seeker";

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemByRole[role].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<a href={item.url} />}>
                  <item.item />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
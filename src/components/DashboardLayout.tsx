
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, Logo, LogoIcon } from "@/components/ui/sidebar";
import { LayoutDashboard, FileText, Calendar, MessageSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const links = [
    {
      label: "Dashboard",
      href: "/patient-dashboard",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Medical Records",
      href: "/patient/records",
      icon: (
        <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Appointments",
      href: "/patient/appointments",
      icon: (
        <Calendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Messages",
      href: "/patient/messages",
      icon: (
        <MessageSquare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/patient/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <SidebarLink
                link={{
                  label: "Logout",
                  href: "#",
                  icon: (
                    <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
                onClick={logout}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}

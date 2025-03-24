
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Doctors",
      href: "/doctors",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      label: "Patients",
      href: "/patients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Appointments",
      href: "/appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      label: "Messages",
      href: "/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-primary text-primary-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "min-h-screen bg-white dark:bg-gray-800 border-r transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64",
          "fixed md:relative left-0 top-0 z-40",
          "md:flex",
          !collapsed && "hidden md:flex"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/dashboard" className="flex items-center space-x-2">
            {!collapsed && <span className="text-lg font-bold">HealthChain</span>}
            {collapsed && <span className="text-lg font-bold">HC</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex"
          >
            <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        <div className="flex flex-col flex-1 py-6 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                location.pathname === link.href && "bg-gray-100 dark:bg-gray-700 text-primary",
                collapsed ? "justify-center" : "space-x-3"
              )}
            >
              {link.icon}
              {!collapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20",
              collapsed ? "justify-center" : "justify-start space-x-3"
            )}
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

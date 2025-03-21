
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  BarChart3, 
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const AppSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/",
    },
    {
      title: "Companies",
      icon: <Building2 className="h-5 w-5" />,
      href: "/companies",
    },
    {
      title: "Contacts",
      icon: <Users className="h-5 w-5" />,
      href: "/contacts",
    },
    {
      title: "Deals",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/deals",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
  ];

  return (
    <Sidebar className="h-screen w-64 fixed">
      <SidebarHeader className="flex items-center p-4 h-16 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">CRM</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors",
                  isActive(item.href) && "bg-blue-50 text-blue-600 font-medium"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-4 justify-start text-gray-700">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

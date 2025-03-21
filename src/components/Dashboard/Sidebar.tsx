
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
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
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => setCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-30 flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300 lg:static",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "w-64 translate-x-0",
          className
        )}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {!collapsed && (
              <span className="text-xl font-bold text-blue-600">CRM</span>
            )}
            {collapsed && (
              <span className="text-xl font-bold text-blue-600 lg:hidden">CRM</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="lg:hidden"
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex"
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
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
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <Button variant="ghost" size="sm" className="w-full mt-4 justify-start text-gray-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </aside>
      
      {/* Toggle button for desktop */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="fixed bottom-4 left-4 z-40 rounded-full shadow-md hidden lg:flex"
      >
        {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </Button>
    </>
  );
};

export default Sidebar;

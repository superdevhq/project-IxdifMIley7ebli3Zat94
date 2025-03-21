
import * as React from "react";
import { cva } from "class-variance-authority";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Create context for sidebar state
interface SidebarContextProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// Sidebar components
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { collapsed } = useSidebar();

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => useSidebar().setCollapsed(true)}
        />
      )}
      
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-30 flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300 lg:static",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "w-64 translate-x-0",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, children, ...props }: SidebarHeaderProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, children, ...props }: SidebarContentProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, children, ...props }: SidebarFooterProps) {
  return (
    <div className={cn("mt-auto", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarTrigger() {
  const { collapsed, setCollapsed } = useSidebar();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
    </Button>
  );
}

// Desktop toggle button that appears at the bottom
export function SidebarToggle() {
  const { collapsed, setCollapsed } = useSidebar();
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setCollapsed(!collapsed)}
      className="fixed bottom-4 left-4 z-40 rounded-full shadow-md hidden lg:flex"
    >
      {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
    </Button>
  );
}

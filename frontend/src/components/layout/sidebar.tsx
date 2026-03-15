"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  Trophy,
  Bell,
  Building2,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Mapa", href: "/mapa", icon: Map },
  { label: "Ranking", href: "/ranking", icon: Trophy },
  { label: "Alertas", href: "/alertas", icon: Bell },
  { label: "Gestão CONSEA", href: "/gestao", icon: Building2 },
  { label: "Relatórios", href: "/relatorios", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Restaurar estado do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  // Persistir estado no localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-green-800 text-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-green-700">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-green-800">AF</span>
            </div>
            <span className="font-bold text-lg">Antifome RS</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 mx-auto bg-white rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-green-800">AF</span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-green-700 text-white"
                  : "text-green-100 hover:bg-green-700/50",
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-2 border-t border-green-700">
        <button
          onClick={toggleCollapse}
          className="flex items-center justify-center w-full px-3 py-2 rounded-lg text-green-100 hover:bg-green-700/50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-2">Recolher</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Map,
  Palette,
  Trophy,
  Building2,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mapa", href: "/mapa", icon: Map },
  { label: "Ranking", href: "/ranking", icon: Trophy },
  { label: "Alertas", href: "/alertas", icon: Bell, badge: "5" },
  { label: "Gestão CONSEA", href: "/gestao", icon: Building2 },
  { label: "Design System", href: "/design-system", icon: Palette },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");

    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem("sidebar-collapsed", String(nextState));
  };

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-white/10 institutional-hero design-grid text-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[88px]" : "w-[296px]",
      )}
    >
      <div className="border-b border-white/10 px-5 py-5">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/15 bg-white/10 text-lg font-bold">
            AF
          </div>
          {!isCollapsed && (
            <div>
              <p className="font-display text-xl font-semibold leading-none">Antifome RS</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/70">
                Segurança alimentar
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-4">
        {!isCollapsed && (
          <div className="rounded-md border border-white/10 bg-white/5 px-3 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
              Painel institucional
            </p>
            <p className="mt-2 text-sm text-white/80">
              Monitoramento executivo da governança SAN dos municípios do RS.
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md border px-3 py-3 transition-all duration-200",
                isActive
                  ? "border-white/15 bg-white/14 text-white shadow-panel-sm"
                  : "border-transparent text-white/75 hover:border-white/10 hover:bg-white/8 hover:text-white",
                isCollapsed && "justify-center px-2",
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.badge ? (
                    <Badge
                      variant="urgency"
                      className="border border-danger/20 bg-danger/20 text-danger-foreground"
                    >
                      {item.badge}
                    </Badge>
                  ) : null}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expandir navegação lateral" : "Recolher navegação lateral"}
          className="flex w-full items-center justify-center rounded-md border border-white/10 bg-white/5 px-3 py-3 text-white/80 hover:bg-white/10 hover:text-white"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2 text-sm font-medium">Recolher navegação</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

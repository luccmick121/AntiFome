"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const { usuario, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Botão hamburger para mobile */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb ou título da página */}
        <h1 className="text-lg font-semibold text-gray-800">
          Sistema de Gestão da Segurança Alimentar
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Info do usuário */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div className="hidden sm:block">
            <p className="font-medium text-gray-800">{usuario?.email}</p>
            <p className="text-xs text-gray-500">{usuario?.role}</p>
          </div>
        </div>

        {/* Botão de logout */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </header>
  );
}

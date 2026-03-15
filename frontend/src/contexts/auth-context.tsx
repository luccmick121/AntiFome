"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Usuario {
  id: string;
  email: string;
  role: "ADMIN" | "GESTOR_ESTADUAL" | "CONSELHEIRO_MUNICIPAL";
  municipio_id?: string;
  municipio_nome?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!usuario;

  // Verificar se já está autenticado ao carregar
  useEffect(() => {
    const verificarAuth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.usuario) {
            setUsuario(data.usuario);
          }
        }
      } catch {
        // Não autenticado, continuar
      } finally {
        setIsLoading(false);
      }
    };

    verificarAuth();
  }, []);

  const login = async (email: string, senha: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao realizar login");
    }

    setUsuario(data.usuario);
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUsuario(null);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, isLoading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

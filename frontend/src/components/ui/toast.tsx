'use client';

import { useState, useCallback, createContext, useContext } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastMessage {
  id: string;
  tipo: 'sucesso' | 'erro' | 'aviso';
  mensagem: string;
}

interface ToastContextType {
  toast: (tipo: ToastMessage['tipo'], mensagem: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback simples se não estiver dentro do provider
    return {
      toast: (tipo: string, mensagem: string) => {
        console.log(`[${tipo}] ${mensagem}`);
      },
    };
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((tipo: ToastMessage['tipo'], mensagem: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, tipo, mensagem }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remover = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icones = {
    sucesso: <CheckCircle className="w-5 h-5 text-green-500" />,
    erro: <XCircle className="w-5 h-5 text-red-500" />,
    aviso: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  };

  const cores = {
    sucesso: 'bg-green-50 border-green-200',
    erro: 'bg-red-50 border-red-200',
    aviso: 'bg-yellow-50 border-yellow-200',
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg animate-slideUp min-w-[280px] ${cores[t.tipo]}`}
          >
            {icones[t.tipo]}
            <p className="flex-1 text-sm text-gray-700">{t.mensagem}</p>
            <button
              onClick={() => remover(t.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

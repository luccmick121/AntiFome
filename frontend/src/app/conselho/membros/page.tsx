'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, User, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface Membro {
  id: string;
  nome: string;
  cargo: 'PRESIDENTE' | 'VICE' | 'MEMBRO';
  email: string | null;
  telefone: string | null;
}

const cargoLabels: Record<string, string> = {
  PRESIDENTE: 'Presidente',
  VICE: 'Vice-Presidente',
  MEMBRO: 'Membro',
};

const cargoColors: Record<string, string> = {
  PRESIDENTE: 'bg-[#1A2F23] text-white',
  VICE: 'bg-[#2E7D32] text-white',
  MEMBRO: 'bg-gray-100 text-gray-800',
};

export default function MembrosPage() {
  const { toast } = useToast();
  const [membros, setMembros] = useState<Membro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [editando, setEditando] = useState<Membro | null>(null);

  // Form state
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState<'PRESIDENTE' | 'VICE' | 'MEMBRO'>('MEMBRO');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    carregarMembros();
  }, []);

  async function carregarMembros() {
    try {
      const res = await fetch('/api/conselhos/mine/membros');
      if (res.ok) {
        const data = await res.json();
        setMembros(data);
      }
    } catch (erro) {
      console.error('Erro ao carregar membros:', erro);
    } finally {
      setCarregando(false);
    }
  }

  async function salvarMembro() {
    try {
      const conselhoId = await obterConselhoId();
      if (!conselhoId) return;

      const url = editando
        ? `/api/conselhos/${conselhoId}/membros/${editando.id}`
        : `/api/conselhos/${conselhoId}/membros`;

      const res = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cargo, email, telefone }),
      });

      if (res.ok) {
        setDialogAberto(false);
        limparForm();
        carregarMembros();
        toast('sucesso', editando ? 'Membro atualizado com sucesso!' : 'Membro adicionado com sucesso!');
      } else {
        toast('erro', 'Erro ao salvar membro. Tente novamente.');
      }
    } catch (erro) {
      console.error('Erro ao salvar membro:', erro);
    }
  }

  async function removerMembro(id: string) {
    if (!confirm('Tem certeza que deseja remover este membro?')) return;

    try {
      const conselhoId = await obterConselhoId();
      if (!conselhoId) return;

      const res = await fetch(`/api/conselhos/${conselhoId}/membros/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        carregarMembros();
        toast('sucesso', 'Membro removido com sucesso!');
      } else {
        toast('erro', 'Erro ao remover membro.');
      }
    } catch (erro) {
      console.error('Erro ao remover membro:', erro);
    }
  }

  async function obterConselhoId(): Promise<string | null> {
    const res = await fetch('/api/conselhos/mine');
    if (res.ok) {
      const data = await res.json();
      return data.id;
    }
    return null;
  }

  function limparForm() {
    setNome('');
    setCargo('MEMBRO');
    setEmail('');
    setTelefone('');
    setEditando(null);
  }

  function abrirEdicao(membro: Membro) {
    setEditando(membro);
    setNome(membro.nome);
    setCargo(membro.cargo);
    setEmail(membro.email || '');
    setTelefone(membro.telefone || '');
    setDialogAberto(true);
  }

  if (carregando) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A2F23]">Membros do Conselho</h2>
          <p className="text-gray-500">
            {membros.length} membro{membros.length !== 1 ? 's' : ''} cadastrado
            {membros.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button onClick={limparForm} className="bg-[#1A2F23]">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Membro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editando ? 'Editar Membro' : 'Novo Membro'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo *</Label>
                <select
                  id="cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value as typeof cargo)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="PRESIDENTE">Presidente</option>
                  <option value="VICE">Vice-Presidente</option>
                  <option value="MEMBRO">Membro</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(51) 99999-9999"
                />
              </div>
              <Button onClick={salvarMembro} className="w-full bg-[#1A2F23]">
                {editando ? 'Salvar Alterações' : 'Adicionar Membro'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {membros.map((membro) => (
          <Card key={membro.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A2F23]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#1A2F23]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A2F23]">{membro.nome}</p>
                    <Badge className={cargoColors[membro.cargo]}>
                      {cargoLabels[membro.cargo]}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => abrirEdicao(membro)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removerMembro(membro.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {membro.email && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-3 h-3" />
                  {membro.email}
                </div>
              )}
              {membro.telefone && (
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="w-3 h-3" />
                  {membro.telefone}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {membros.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhum membro cadastrado</p>
            <p className="text-sm text-gray-400">
              Clique em &quot;Adicionar Membro&quot; para começar
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

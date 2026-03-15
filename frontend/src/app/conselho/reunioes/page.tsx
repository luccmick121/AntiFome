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
import {
  Plus,
  Calendar,
  FileText,
  ExternalLink,
  Edit,
  Trash2,
} from 'lucide-react';
import { MeetingCard } from '@/components/conselho/meeting-card';
import { useToast } from '@/components/ui/toast';

interface Reuniao {
  id: string;
  data: string;
  tipo: 'ORDINARIA' | 'EXTRAORDINARIA';
  pauta: string | null;
  ata_url: string | null;
}

const tipoLabels: Record<string, string> = {
  ORDINARIA: 'Ordinária',
  EXTRAORDINARIA: 'Extraordinária',
};

const tipoColors: Record<string, string> = {
  ORDINARIA: 'bg-[#1A2F23] text-white',
  EXTRAORDINARIA: 'bg-[#B71C1C] text-white',
};

export default function ReunioesPage() {
  const { toast } = useToast();
  const [reunioes, setReunioes] = useState<Reuniao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [editando, setEditando] = useState<Reuniao | null>(null);

  // Form state
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState<'ORDINARIA' | 'EXTRAORDINARIA'>('ORDINARIA');
  const [pauta, setPauta] = useState('');
  const [ataUrl, setAtaUrl] = useState('');

  useEffect(() => {
    carregarReunioes();
  }, []);

  async function carregarReunioes() {
    try {
      const res = await fetch('/api/conselhos/mine/reunioes');
      if (res.ok) {
        const data = await res.json();
        setReunioes(data);
      }
    } catch (erro) {
      console.error('Erro ao carregar reuniões:', erro);
    } finally {
      setCarregando(false);
    }
  }

  async function salvarReuniao() {
    try {
      const conselhoId = await obterConselhoId();
      if (!conselhoId) return;

      const url = editando
        ? `/api/conselhos/${conselhoId}/reunioes/${editando.id}`
        : `/api/conselhos/${conselhoId}/reunioes`;

      const res = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, tipo, pauta, ata_url: ataUrl || null }),
      });

      if (res.ok) {
        setDialogAberto(false);
        limparForm();
        carregarReunioes();
        toast('sucesso', editando ? 'Reunião atualizada!' : 'Reunião registrada com sucesso!');
      } else {
        toast('erro', 'Erro ao salvar reunião. Tente novamente.');
      }
    } catch (erro) {
      console.error('Erro ao salvar reunião:', erro);
    }
  }

  async function removerReuniao(id: string) {
    if (!confirm('Tem certeza que deseja remover esta reunião?')) return;

    try {
      const conselhoId = await obterConselhoId();
      if (!conselhoId) return;

      const res = await fetch(`/api/conselhos/${conselhoId}/reunioes/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        carregarReunioes();
        toast('sucesso', 'Reunião removida com sucesso!');
      } else {
        toast('erro', 'Erro ao remover reunião.');
      }
    } catch (erro) {
      console.error('Erro ao remover reunião:', erro);
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
    setData('');
    setTipo('ORDINARIA');
    setPauta('');
    setAtaUrl('');
    setEditando(null);
  }

  function abrirEdicao(reuniao: Reuniao) {
    setEditando(reuniao);
    setData(reuniao.data.split('T')[0]);
    setTipo(reuniao.tipo);
    setPauta(reuniao.pauta || '');
    setAtaUrl(reuniao.ata_url || '');
    setDialogAberto(true);
  }

  function formatarData(dataStr: string) {
    return new Date(dataStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
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
          <h2 className="text-2xl font-bold text-[#1A2F23]">Reuniões</h2>
          <p className="text-gray-500">
            {reunioes.length} reunião{reunioes.length !== 1 ? 'ões' : ''} registrada
            {reunioes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button onClick={limparForm} className="bg-[#1A2F23]">
              <Plus className="w-4 h-4 mr-2" />
              Registrar Reunião
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editando ? 'Editar Reunião' : 'Nova Reunião'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo *</Label>
                <select
                  id="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as typeof tipo)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="ORDINARIA">Ordinária</option>
                  <option value="EXTRAORDINARIA">Extraordinária</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pauta">Pauta</Label>
                <textarea
                  id="pauta"
                  value={pauta}
                  onChange={(e) => setPauta(e.target.value)}
                  placeholder="Descreva os tópicos da pauta"
                  className="w-full border rounded-md p-2 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ata">URL da Ata</Label>
                <Input
                  id="ata"
                  type="url"
                  value={ataUrl}
                  onChange={(e) => setAtaUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <Button onClick={salvarReuniao} className="w-full bg-[#1A2F23]">
                {editando ? 'Salvar Alterações' : 'Registrar Reunião'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {reunioes.map((reuniao) => (
          <Card key={reuniao.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1A2F23]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#1A2F23]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A2F23]">
                      {formatarData(reuniao.data)}
                    </p>
                    <Badge className={tipoColors[reuniao.tipo]}>
                      {tipoLabels[reuniao.tipo]}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => abrirEdicao(reuniao)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removerReuniao(reuniao.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {reuniao.pauta && (
                <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{reuniao.pauta}</p>
                </div>
              )}
              {reuniao.ata_url && (
                <div className="mt-2">
                  <a
                    href={reuniao.ata_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1A2F23] hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ver Ata
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {reunioes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhuma reunião registrada</p>
            <p className="text-sm text-gray-400">
              Clique em &quot;Registrar Reunião&quot; para começar
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Folder,
  Search,
  Filter,
} from 'lucide-react';

interface Documento {
  id: string;
  nome: string;
  categoria: string;
  descricao: string | null;
  arquivo_url: string;
  arquivo_tipo: string;
  arquivo_tamanho: number;
  created_at: string;
}

const CATEGORIAS = [
  { value: 'TODOS', label: 'Todos' },
  { value: 'LEIS', label: 'Leis' },
  { value: 'DECRETOS', label: 'Decretos' },
  { value: 'TERMOS', label: 'Termos de Compromisso' },
  { value: 'MODELOS', label: 'Modelos' },
  { value: 'ATAS', label: 'Atas de Reunião' },
  { value: 'OUTROS', label: 'Outros' },
];

const categoriaCores: Record<string, string> = {
  LEIS: 'bg-blue-100 text-blue-800',
  DECRETOS: 'bg-purple-100 text-purple-800',
  TERMOS: 'bg-orange-100 text-orange-800',
  MODELOS: 'bg-green-100 text-green-800',
  ATAS: 'bg-yellow-100 text-yellow-800',
  OUTROS: 'bg-gray-100 text-gray-800',
};

function formatarTamanho(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('TODOS');
  const [busca, setBusca] = useState('');
  const [uploading, setUploading] = useState(false);

  // Form state
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('OUTROS');
  const [descricao, setDescricao] = useState('');
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);

  const carregarDocumentos = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (categoriaFiltro !== 'TODOS') params.append('categoria', categoriaFiltro);

      const res = await fetch(`/api/conselhos/mine/documentos?${params}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setDocumentos(data);
      }
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    } finally {
      setCarregando(false);
    }
  }, [categoriaFiltro]);

  useEffect(() => {
    carregarDocumentos();
  }, [carregarDocumentos]);

  const documentosFiltrados = documentos.filter((doc) =>
    doc.nome.toLowerCase().includes(busca.toLowerCase()) ||
    doc.descricao?.toLowerCase().includes(busca.toLowerCase())
  );

  const handleUpload = async () => {
    if (!nome || !arquivoSelecionado) return;

    setUploading(true);
    try {
      // Simular upload (em produção, usar FormData para upload real)
      const arquivo_url = `/uploads/${Date.now()}-${arquivoSelecionado.name}`;

      const res = await fetch('/api/conselhos/mine/documentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nome,
          categoria,
          descricao: descricao || undefined,
          arquivo_url,
          arquivo_tipo: arquivoSelecionado.type || 'application/octet-stream',
          arquivo_tamanho: arquivoSelecionado.size,
        }),
      });

      if (res.ok) {
        setDialogAberto(false);
        setNome('');
        setCategoria('OUTROS');
        setDescricao('');
        setArquivoSelecionado(null);
        await carregarDocumentos();
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemover = async (documentoId: string) => {
    if (!confirm('Deseja realmente remover este documento?')) return;

    try {
      const res = await fetch(`/api/conselhos/mine/documentos/${documentoId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        await carregarDocumentos();
      }
    } catch (error) {
      console.error('Erro ao remover documento:', error);
    }
  };

  function formatarData(dataStr: string) {
    return new Date(dataStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1A2F23]">Documentos</h2>
          <p className="text-gray-500">
            {documentosFiltrados.length} documento{documentosFiltrados.length !== 1 ? 's' : ''}
            {categoriaFiltro !== 'TODOS' ? ` em ${CATEGORIAS.find(c => c.value === categoriaFiltro)?.label}` : ''}
          </p>
        </div>
        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button className="bg-[#1A2F23]">
              <Upload className="w-4 h-4 mr-2" />
              Upload Documento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload de Documento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Documento</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Ata da Reunião de Janeiro"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <select
                  id="categoria"
                  className="w-full border rounded-md p-2"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  {CATEGORIAS.filter(c => c.value !== 'TODOS').map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição (opcional)</Label>
                <Input
                  id="descricao"
                  placeholder="Breve descrição do documento"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arquivo">Arquivo</Label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1A2F23] transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  {arquivoSelecionado ? (
                    <div>
                      <p className="text-sm font-medium text-[#1A2F23]">{arquivoSelecionado.name}</p>
                      <p className="text-xs text-gray-500">{formatarTamanho(arquivoSelecionado.size)}</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">Arraste um arquivo ou clique para selecionar</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOCX, XLSX até 20MB</p>
                    </>
                  )}
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xlsx,.xls"
                    onChange={(e) => setArquivoSelecionado(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <Button
                className="w-full bg-[#1A2F23]"
                onClick={handleUpload}
                disabled={!nome || !arquivoSelecionado || uploading}
              >
                {uploading ? 'Enviando...' : 'Fazer Upload'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter className="w-4 h-4" />
          Filtrar:
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((cat) => (
            <Button
              key={cat.value}
              variant={categoriaFiltro === cat.value ? 'default' : 'outline'}
              size="sm"
              className={categoriaFiltro === cat.value ? 'bg-[#1A2F23]' : ''}
              onClick={() => setCategoriaFiltro(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Buscar documentos..."
          className="pl-10"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Lista de Documentos */}
      {carregando ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : documentosFiltrados.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documentosFiltrados.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-[#1A2F23]/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#1A2F23]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[#1A2F23] truncate">{doc.nome}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={categoriaCores[doc.categoria] || categoriaCores.OUTROS}>
                          {CATEGORIAS.find(c => c.value === doc.categoria)?.label || doc.categoria}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {formatarTamanho(doc.arquivo_tamanho)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {doc.descricao && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{doc.descricao}</p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{formatarData(doc.created_at)}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={doc.arquivo_url} download>
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemover(doc.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Folder className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              {busca ? 'Nenhum documento encontrado para esta busca' : 'Nenhum documento armazenado'}
            </p>
            {!busca && (
              <p className="text-sm text-gray-400">
                Clique em &quot;Upload Documento&quot; para adicionar arquivos
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

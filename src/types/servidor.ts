export interface Servidor {
  id: number;
  cpf: string;
  matricula: number;
  nome: string;
  vinculo: string;
  cargo: string;
  funcao?: string;
  lotacao: string;
  formaContratacao: string;
  cargaHoraria: number;
  dataAdmissao: string;
  dataExoneracao: string | null;
  valorBruto: number;
  proventosAdicionais: number;
  descontos: number;
  valorLiquido: number;
  competenciaMensal: string;
  mesReferencia: number;
  anoReferencia: number;
} 
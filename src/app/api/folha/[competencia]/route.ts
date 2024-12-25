import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { competencia: string } }
) {
  try {
    const { competencia } = params;
    const filePath = path.join(
      process.cwd(),
      "folhas_pagamento",
      `${competencia}.json`
    );

    const fileContents = await fs.readFile(filePath, "utf8");
    const { servidores } = JSON.parse(fileContents);

    // Mapear os dados para o formato esperado pela tabela
    const dadosFormatados = servidores.map((servidor: any) => ({
      nome: servidor.nome,
      cargo: servidor.cargo,
      vinculo: servidor.vinculo,
      valorBruto: servidor.valor_bruto || 0,
      valorLiquido: servidor.valor_liquido || 0,
      cargaHoraria: servidor.carga_horaria_semanal || 0,
      // Dados adicionais para o modal
      id: servidor.id,
      cpf: servidor.cpf,
      matricula: servidor.matricula,
      funcao: servidor.funcao,
      lotacao: servidor.lotacao,
      formaContratacao: servidor.forma_contratacao,
      dataAdmissao: servidor.data_admissao,
      dataExoneracao: servidor.data_exoneracao,
      proventosAdicionais: servidor.proventos_adicionais,
      descontos: servidor.descontos,
      competenciaMensal: servidor.competencia_mensal,
      mesReferencia: servidor.mes_referencia,
      anoReferencia: servidor.ano_referencia,
    }));

    return NextResponse.json(dadosFormatados);
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return NextResponse.json(
      { error: "Erro ao carregar dados da folha de pagamento" },
      { status: 500 }
    );
  }
} 
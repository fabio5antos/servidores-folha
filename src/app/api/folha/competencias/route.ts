import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export async function GET() {
  try {
    const folderPath = path.join(process.cwd(), "folhas_pagamento");
    const files = await fs.readdir(folderPath);

    const competencias = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const [, ano, mes] = file.match(/folha_pagamento_(\d{4})_(\d{2})\.json/) || [];
        return {
          original: file,
          ano: parseInt(ano),
          mes: parseInt(mes),
          display: `${meses[parseInt(mes) - 1]}/${ano}`,
        };
      })
      .sort((a, b) => {
        // Ordenar por ano e mês em ordem decrescente
        if (a.ano !== b.ano) {
          return b.ano - a.ano;
        }
        return b.mes - a.mes;
      })
      .map((comp) => ({
        valor: comp.original.replace(".json", ""),
        display: comp.display,
      }));

    return NextResponse.json({ competencias });
  } catch (error) {
    console.error("Erro ao listar competências:", error);
    return NextResponse.json(
      { error: "Erro ao listar competências disponíveis" },
      { status: 500 }
    );
  }
} 
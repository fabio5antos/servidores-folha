import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Servidor } from "@/types/servidor";

export const formatarData = (data: string) => {
  if (!data) return "-";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

const formatarDinheiro = (valor: number) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

type CampoServidor = {
  chave: keyof Servidor;
  label: string;
  formato?: (valor: any) => string;
};

const camposOrdenados: CampoServidor[] = [
  { chave: "nome", label: "Nome" },
  { chave: "cpf", label: "CPF" },
  { chave: "matricula", label: "Matrícula" },
  { chave: "cargo", label: "Cargo" },
  { chave: "funcao", label: "Função" },
  { chave: "vinculo", label: "Vínculo" },
  { chave: "lotacao", label: "Lotação" },
  { chave: "formaContratacao", label: "Forma de Contratação" },
  { chave: "cargaHoraria", label: "Carga Horária Semanal", formato: (v: number) => `${v}h` },
  { chave: "dataAdmissao", label: "Data de Admissão", formato: formatarData },
  { chave: "dataExoneracao", label: "Data de Exoneração", formato: formatarData },
  { chave: "valorBruto", label: "Valor Bruto", formato: formatarDinheiro },
  { chave: "proventosAdicionais", label: "Proventos Adicionais", formato: formatarDinheiro },
  { chave: "descontos", label: "Descontos", formato: formatarDinheiro },
  { chave: "valorLiquido", label: "Valor Líquido", formato: formatarDinheiro },
  { chave: "competenciaMensal", label: "Competência" },
];

export const exportarCSV = (servidor: Servidor) => {
  const dadosExportacao = camposOrdenados.reduce((acc, { chave, label, formato }) => {
    const valor = servidor[chave as keyof Servidor];
    acc[label] = formato ? formato(valor) : valor;
    return acc;
  }, {} as Record<string, any>);

  const headers = Object.keys(dadosExportacao);
  const linhas = [
    headers.map(h => `"${h}"`).join(","),
    headers.map(h => `"${dadosExportacao[h]}"`).join(",")
  ].join("\n");

  const bom = "\uFEFF";
  const blob = new Blob([bom + linhas], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${servidor.nome}_dados.csv`);
};

export const exportarXLSX = (servidor: Servidor) => {
  const dadosExportacao = camposOrdenados.reduce((acc, { chave, label, formato }) => {
    const valor = servidor[chave as keyof Servidor];
    acc[label] = formato ? formato(valor) : valor;
    return acc;
  }, {} as Record<string, any>);
  
  const ws = XLSX.utils.json_to_sheet([dadosExportacao]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Dados");
  XLSX.writeFile(wb, `${servidor.nome}_dados.xlsx`);
};

export const exportarTXT = (servidor: Servidor) => {
  const txt = camposOrdenados
    .map(({ chave, label, formato }) => {
      const valor = servidor[chave as keyof Servidor];
      return `${label}: ${formato ? formato(valor) : valor}`;
    })
    .join("\n");
  const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${servidor.nome}_dados.txt`);
};

export const exportarPDF = (servidor: Servidor) => {
  const doc = new jsPDF();
  const data = camposOrdenados.map(({ chave, label, formato }) => {
    const valor = servidor[chave as keyof Servidor];
    return [label, formato ? formato(valor) : valor];
  });
  doc.autoTable({
    head: [["Campo", "Valor"]],
    body: data,
  });
  doc.save(`${servidor.nome}_dados.pdf`);
};

export const exportarODT = (servidor: Servidor) => {
  const conteudo = camposOrdenados
    .map(({ chave, label, formato }) => {
      const valor = servidor[chave as keyof Servidor];
      return `${label}: ${formato ? formato(valor) : valor}\\par`;
    })
    .join("\n");

  const rtfTemplate = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;}
\\viewkind4\\uc1\\pard\\cf1\\f0\\fs24
{\\b\\fs28 Dados do Servidor}\\par
\\par
${conteudo}
}`;

  const blob = new Blob([rtfTemplate], { type: "application/rtf" });
  saveAs(blob, `${servidor.nome}_dados.rtf`);
};

export const exportarJSON = (servidor: Servidor) => {
  const dadosExportacao = camposOrdenados.reduce((acc, { chave, label, formato }) => {
    const valor = servidor[chave as keyof Servidor];
    acc[label] = formato ? formato(valor) : valor;
    return acc;
  }, {} as Record<string, any>);

  const blob = new Blob([JSON.stringify(dadosExportacao, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, `${servidor.nome}_dados.json`);
};

export const imprimir = (servidor: Servidor) => {
  const conteudo = camposOrdenados
    .map(({ chave, label, formato }) => {
      const valor = servidor[chave as keyof Servidor];
      return `
        <div style="margin-bottom: 8px;">
          <strong>${label}:</strong> ${formato ? formato(valor) : valor}
        </div>`;
    })
    .join("");

  const janela = window.open("", "", "width=800,height=600");
  if (janela) {
    janela.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dados do Servidor - ${servidor.nome}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              padding: 20px;
            }
            h1 {
              color: #333;
              margin-bottom: 20px;
            }
            @media print {
              body {
                padding: 0;
              }
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <h1>Dados do Servidor</h1>
          ${conteudo}
          <button onclick="window.print()" style="margin-top: 20px; padding: 8px 16px; background-color: #4F46E5; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Imprimir
          </button>
        </body>
      </html>
    `);
    janela.document.close();
  }
}; 
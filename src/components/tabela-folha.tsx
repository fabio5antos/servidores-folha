"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  DocumentArrowDownIcon,
  TableCellsIcon,
  DocumentTextIcon,
  DocumentIcon,
  CodeBracketIcon,
  PrinterIcon,
} from "@heroicons/react/20/solid";
import { DetalhesModal } from "./detalhes-modal";
import { SeletorCompetencia } from "./seletor-competencia";
import { Servidor } from "@/types/servidor";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface TabelaFolhaProps {
  dados: Servidor[];
  competencia: string;
  onCompetenciaChange: (competencia: string) => void;
}

const formatarData = (data: string) => {
  if (!data) return "-";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

const columnHelper = createColumnHelper<Servidor>();

const columns = [
  columnHelper.accessor("nome", {
    header: "Nome",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("cargo", {
    header: "Cargo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("vinculo", {
    header: "Vínculo",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("competenciaMensal", {
    header: "Competência",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("cargaHoraria", {
    header: "Carga Horária",
    cell: (info) => `${info.getValue()}h`,
  }),
  columnHelper.accessor("valorBruto", {
    header: "Valor Bruto",
    cell: (info) =>
      info.getValue().toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  }),
  columnHelper.accessor("valorLiquido", {
    header: "Valor Líquido",
    cell: (info) =>
      info.getValue().toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  }),
];

export function TabelaFolha({ dados, competencia, onCompetenciaChange }: TabelaFolhaProps) {
  const [sorting, setSorting] = useState([]);
  const [servidorSelecionado, setServidorSelecionado] = useState<Servidor | null>(
    null
  );

  const table = useReactTable({
    data: dados,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const exportarCSV = () => {
    const dadosExportacao = dados.map(servidor => ({
      Nome: servidor.nome,
      CPF: servidor.cpf,
      Matrícula: servidor.matricula,
      Cargo: servidor.cargo,
      Função: servidor.funcao || "-",
      Vínculo: servidor.vinculo,
      Lotação: servidor.lotacao,
      "Forma de Contratação": servidor.formaContratacao,
      "Carga Horária": `${servidor.cargaHoraria}h`,
      "Data de Admissão": formatarData(servidor.dataAdmissao),
      "Data de Exoneração": formatarData(servidor.dataExoneracao),
      "Valor Bruto": servidor.valorBruto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      "Proventos Adicionais": servidor.proventosAdicionais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      Descontos: servidor.descontos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      "Valor Líquido": servidor.valorLiquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      Competência: servidor.competenciaMensal
    }));

    const headers = Object.keys(dadosExportacao[0]);
    const linhas = dadosExportacao.map(row => {
      return headers.map(header => {
        const valor = row[header];
        return `"${String(valor).replace(/"/g, '""')}"`;
      }).join(",");
    });

    const csv = [
      headers.map(h => `"${h}"`).join(","),
      ...linhas
    ].join("\n");

    const bom = "\uFEFF";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `folha_pagamento_${competencia}.csv`);
  };

  const exportarXLSX = () => {
    const headers = columns.map((col) => col.header);
    const rows = dados.map((servidor) =>
      columns.map((col) => servidor[col.accessorKey as keyof Servidor])
    );
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Folha de Pagamento");
    XLSX.writeFile(wb, `folha_pagamento_${competencia}.xlsx`);
  };

  const exportarTXT = () => {
    const txt = dados
      .map((servidor) =>
        columns
          .map(
            (col) =>
              `${col.header}: ${servidor[col.accessorKey as keyof Servidor]}`
          )
          .join("\n")
      )
      .join("\n\n");
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `folha_pagamento_${competencia}.txt`);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const headers = columns.map((col) => col.header);
    const rows = dados.map((servidor) =>
      columns.map((col) => servidor[col.accessorKey as keyof Servidor])
    );
    doc.autoTable({
      head: [headers],
      body: rows,
    });
    doc.save(`folha_pagamento_${competencia}.pdf`);
  };

  const exportarJSON = () => {
    const dadosExportacao = dados.map((servidor) =>
      columns.reduce((acc, col) => {
        acc[col.header] = servidor[col.accessorKey as keyof Servidor];
        return acc;
      }, {} as Record<string, any>)
    );

    const blob = new Blob([JSON.stringify(dadosExportacao, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, `folha_pagamento_${competencia}.json`);
  };

  const imprimir = () => {
    const conteudo = dados
      .map((servidor) => {
        const campos = columns
          .map(
            (col) =>
              `<div style="margin-bottom: 8px;">
                <strong>${col.header}:</strong> ${
                servidor[col.accessorKey as keyof Servidor]
              }
              </div>`
          )
          .join("");
        return `
          <div style="margin-bottom: 24px;">
            <h2 style="color: #4F46E5; margin-bottom: 12px;">${servidor.nome}</h2>
            ${campos}
          </div>`;
      })
      .join("");

    const janela = window.open("", "", "width=800,height=600");
    if (janela) {
      janela.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Folha de Pagamento - ${competencia}</title>
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
            <h1>Folha de Pagamento - ${competencia}</h1>
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Competência
          </label>
          <SeletorCompetencia
            competencia={competencia}
            onCompetenciaChange={onCompetenciaChange}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportarCSV}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-1" />
            CSV
          </button>
          <button
            onClick={exportarXLSX}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400 transition-colors"
          >
            <TableCellsIcon className="h-5 w-5 mr-1" />
            XLSX
          </button>
          <button
            onClick={exportarTXT}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
          >
            <DocumentTextIcon className="h-5 w-5 mr-1" />
            TXT
          </button>
          <button
            onClick={exportarPDF}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-400 transition-colors"
          >
            <DocumentIcon className="h-5 w-5 mr-1" />
            PDF
          </button>
          <button
            onClick={exportarJSON}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-400 transition-colors"
          >
            <CodeBracketIcon className="h-5 w-5 mr-1" />
            JSON
          </button>
          <button
            onClick={imprimir}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400 transition-colors"
          >
            <PrinterIcon className="h-5 w-5 mr-1" />
            Imprimir
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => setServidorSelecionado(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded border dark:border-gray-700 disabled:opacity-50"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded border dark:border-gray-700 disabled:opacity-50"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
      </div>

      {servidorSelecionado && (
        <DetalhesModal
          servidor={servidorSelecionado}
          onClose={() => setServidorSelecionado(null)}
        />
      )}
    </div>
  );
} 
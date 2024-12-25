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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { exportarCSV, exportarXLSX, exportarTXT, exportarPDF, exportarODT, exportarJSON, imprimir } from "@/utils/export-utils";

interface Servidor {
  nome: string;
  cargo: string;
  vinculo: string;
  valorBruto: number;
  valorLiquido: number;
  cargaHoraria: number;
  [key: string]: any;
}

interface TabelaFolhaProps {
  dados: Servidor[];
  competencia: string;
  onCompetenciaChange: (competencia: string) => void;
}

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
    const headers = columns.map((col) => col.header);
    const rows = dados.map((servidor) =>
      columns.map((col) => servidor[col.accessorKey as keyof Servidor])
    );
    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
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

  const exportarODT = () => {
    const conteudo = dados
      .map((servidor) => {
        const campos = columns
          .map(
            (col) =>
              `<text:p text:style-name="Standard">${col.header}: ${
                servidor[col.accessorKey as keyof Servidor]
              }</text:p>`
          )
          .join("\n");
        return `<text:h text:style-name="Heading_1">${servidor.nome}</text:h>\n${campos}`;
      })
      .join("\n\n");

    const template = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0">
  <office:body>
    <office:text>
      <text:p text:style-name="Title">Folha de Pagamento - ${competencia}</text:p>
      ${conteudo}
    </office:text>
  </office:body>
</office:document-content>`;

    const blob = new Blob([template], {
      type: "application/vnd.oasis.opendocument.text",
    });
    saveAs(blob, `folha_pagamento_${competencia}.odt`);
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
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-1" />
            CSV
          </button>
          <button
            onClick={exportarXLSX}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            <TableCellsIcon className="h-5 w-5 mr-1" />
            XLSX
          </button>
          <button
            onClick={exportarTXT}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <DocumentTextIcon className="h-5 w-5 mr-1" />
            TXT
          </button>
          <button
            onClick={exportarPDF}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
          >
            <DocumentIcon className="h-5 w-5 mr-1" />
            PDF
          </button>
          <button
            onClick={exportarODT}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
          >
            <DocumentTextIcon className="h-5 w-5 mr-1" />
            ODT
          </button>
          <button
            onClick={exportarJSON}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <CodeBracketIcon className="h-5 w-5 mr-1" />
            JSON
          </button>
          <button
            onClick={imprimir}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
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
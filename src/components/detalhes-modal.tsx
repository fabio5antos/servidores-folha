"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DocumentArrowDownIcon,
  TableCellsIcon,
  DocumentTextIcon,
  DocumentIcon,
  CodeBracketIcon,
  PrinterIcon,
} from "@heroicons/react/20/solid";
import { exportarCSV, exportarXLSX, exportarTXT, exportarPDF, exportarJSON, imprimir, formatarData } from "@/utils/export-utils";
import { Servidor } from "@/types/servidor";

interface DetalhesModalProps {
  servidor: Servidor;
  onClose: () => void;
}

const formatarCPF = (cpf: string) => {
  return `***.***.***-${cpf.slice(-2)}`;
};

export function DetalhesModal({ servidor, onClose }: DetalhesModalProps) {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-[960px] w-full mx-4">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Fechar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full px-4">
                  <div className="w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-white mb-6">
                      Detalhes do Servidor
                    </Dialog.Title>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nome
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.nome}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CPF
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={formatarCPF(servidor.cpf)}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Matrícula
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.matricula}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cargo
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.cargo}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Função
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.funcao || "-"}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Vínculo
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.vinculo}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Lotação
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.lotacao}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Forma de Contratação
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.formaContratacao}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Carga Horária
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={`${servidor.cargaHoraria}h`}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Data de Admissão
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={formatarData(servidor.dataAdmissao)}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Data de Exoneração
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={formatarData(servidor.dataExoneracao)}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Competência
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.competenciaMensal}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Valor Bruto
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.valorBruto.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Proventos Adicionais
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.proventosAdicionais.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Descontos
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.descontos.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Valor Líquido
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={servidor.valorLiquido.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-end gap-2">
                      <button
                        onClick={() => exportarCSV(servidor)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors"
                      >
                        <DocumentArrowDownIcon className="h-5 w-5 sm:mr-1" />
                        <span className="hidden sm:inline">CSV</span>
                      </button>
                      <button
                        onClick={() => exportarXLSX(servidor)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400 transition-colors"
                      >
                        <TableCellsIcon className="h-5 w-5 sm:mr-1" />
                        <span className="hidden sm:inline">XLSX</span>
                      </button>
                      <button
                        onClick={() => exportarTXT(servidor)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
                      >
                        <DocumentTextIcon className="h-5 w-5 sm:mr-1" />
                        <span className="hidden sm:inline">TXT</span>
                      </button>
                      <button
                        onClick={() => exportarPDF(servidor)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-400 transition-colors"
                      >
                        <DocumentIcon className="h-5 w-5 sm:mr-1" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>
                      <button
                        onClick={() => exportarJSON(servidor)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-400 transition-colors"
                      >
                        <CodeBracketIcon className="h-5 w-5 sm:mr-1" />
                        <span className="hidden sm:inline">JSON</span>
                      </button>
                      <button
                        onClick={() => imprimir(servidor)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-gray-100 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400 transition-colors"
                      >
                        <PrinterIcon className="h-5 w-5 sm:mr-1" />
                        <span className="hidden sm:inline">Imprimir</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 
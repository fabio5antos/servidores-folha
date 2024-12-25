"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { name: "Início", href: "/" },
  {
    name: "Institucional",
    items: [
      { name: "O Município", href: "/institucional/municipio" },
      { name: "História", href: "/institucional/historia" },
      { name: "Símbolos", href: "/institucional/simbolos" },
      { name: "Prefeito", href: "/institucional/prefeito" },
      { name: "Vice-Prefeito", href: "/institucional/vice-prefeito" },
      { name: "Secretarias", href: "/institucional/secretarias" },
    ],
  },
  {
    name: "Servidores",
    items: [
      { name: "Folha de Pagamentos", href: "/" },
      { name: "Estrutura Organizacional", href: "/servidores/estrutura" },
      { name: "Cargos e Salários", href: "/servidores/cargos" },
      { name: "Concursos e Seleções", href: "/servidores/concursos" },
      { name: "Estagiários", href: "/servidores/estagiarios" },
      { name: "Aposentados", href: "/servidores/aposentados" },
    ],
  },
  {
    name: "Despesas",
    items: [
      { name: "Execução Orçamentária", href: "/despesas/execucao" },
      { name: "Empenhos", href: "/despesas/empenhos" },
      { name: "Pagamentos", href: "/despesas/pagamentos" },
      { name: "Diárias", href: "/despesas/diarias" },
      { name: "Passagens", href: "/despesas/passagens" },
      { name: "Adiantamentos", href: "/despesas/adiantamentos" },
      { name: "Obras", href: "/despesas/obras" },
    ],
  },
  {
    name: "Receitas",
    items: [
      { name: "Arrecadação", href: "/receitas/arrecadacao" },
      { name: "Transferências", href: "/receitas/transferencias" },
      { name: "Tributos", href: "/receitas/tributos" },
      { name: "Multas", href: "/receitas/multas" },
      { name: "Dívida Ativa", href: "/receitas/divida-ativa" },
    ],
  },
  {
    name: "Licitações",
    items: [
      { name: "Em Andamento", href: "/licitacoes/andamento" },
      { name: "Concluídas", href: "/licitacoes/concluidas" },
      { name: "Contratos", href: "/licitacoes/contratos" },
      { name: "Atas de Registro", href: "/licitacoes/atas" },
      { name: "Fornecedores", href: "/licitacoes/fornecedores" },
      { name: "Compras Diretas", href: "/licitacoes/compras-diretas" },
    ],
  },
  {
    name: "Convênios",
    items: [
      { name: "Federais", href: "/convenios/federais" },
      { name: "Estaduais", href: "/convenios/estaduais" },
      { name: "Municipais", href: "/convenios/municipais" },
      { name: "Termos de Parceria", href: "/convenios/parcerias" },
      { name: "Prestação de Contas", href: "/convenios/prestacao-contas" },
    ],
  },
  {
    name: "Documentos",
    items: [
      { name: "Leis", href: "/documentos/leis" },
      { name: "Decretos", href: "/documentos/decretos" },
      { name: "Portarias", href: "/documentos/portarias" },
      { name: "Editais", href: "/documentos/editais" },
      { name: "Relatórios", href: "/documentos/relatorios" },
      { name: "Publicações", href: "/documentos/publicacoes" },
    ],
  },
];

export function NavMenu() {
  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-28 justify-between">
              <div className="flex-1 flex justify-center items-center">
                <Link href="/" className="flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
                    Prefeitura Municipal de Serra Clara
                  </span>
                </Link>
              </div>
              <div className="absolute right-2 top-4 max-[920px]:right-4 max-[920px]:top-8">
                <ThemeToggle />
              </div>
              <div className="absolute right-2 top-4 min-[920px]:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <div className="hidden min-[920px]:flex min-[920px]:justify-center border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 py-1 overflow-x-auto">
                {navigation.map((item) => (
                  <Fragment key={item.name}>
                    {item.items ? (
                      <Menu as="div" className="relative">
                        {({ open }) => (
                          <>
                            <Menu.Button className="inline-flex items-center px-0.5 sm:px-1 py-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap">
                              {item.name}
                              <ChevronDownIcon
                                className={`ml-0.5 sm:ml-1 h-4 w-4 transition-transform ${
                                  open ? "rotate-180" : ""
                                }`}
                              />
                            </Menu.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="fixed z-50 mt-2 w-56 origin-top-left rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {item.items.map((subItem) => (
                                  <Menu.Item key={subItem.name}>
                                    {({ active }) => (
                                      <Link
                                        href={subItem.href}
                                        className={`${
                                          active
                                            ? "bg-gray-100 dark:bg-gray-600"
                                            : ""
                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400`}
                                      >
                                        {subItem.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex items-center px-1 py-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap"
                      >
                        {item.name}
                      </Link>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="min-[920px]:hidden">
            <div className="space-y-1 pb-3 pt-2 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.items ? (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between px-4 py-2 text-left text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <span>{item.name}</span>
                            <ChevronDownIcon
                              className={`h-4 w-4 transition-transform ${
                                open ? "rotate-180" : ""
                              }`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-2 pb-2 space-y-1 bg-gray-50 dark:bg-gray-900">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block pl-3 pr-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 
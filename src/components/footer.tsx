"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-center space-x-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FaFacebook className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FaInstagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FaYoutube className="h-6 w-6" />
            </Link>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              🏛️ Portal da Transparência - Prefeitura Municipal de Serra Clara - MA
            </h2>
          </div>

          <div className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-300">
            <p className="flex items-center">
              <span className="mr-2">📍</span>
              Endereço: R. Isac Martins, 297 - Centro | Serra Clara-MA | Cep: 65950-000
            </p>
            <p className="flex items-center">
              <span className="mr-2">🕒</span>
              Horário de Atendimento: Segunda a Sexta-feira: 08:00 às 14:00
            </p>
            <p className="flex items-center">
              <span className="mr-2">📞</span>
              Telefone para contato: (99) 3643-2333
            </p>
            <p className="flex items-center">
              <span className="mr-2">📧</span>
              E-Mail: prefeitura@serraclara.ma.gov.br
            </p>
          </div>

          <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 Portal da Transparência - Prefeitura Municipal de Serra Clara - MA
            </div>
            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/teclas-de-atalho" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Teclas de Atalho
              </Link>
              <Link href="/sobre" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Sobre
              </Link>
              <Link href="/retificacao" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Retificação
              </Link>
              <Link href="/download" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Download
              </Link>
              <Link href="/perguntas-e-respostas" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Perguntas e Respostas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
"use client";

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Competencia {
  valor: string;
  display: string;
}

interface SeletorCompetenciaProps {
  competencia: string;
  onCompetenciaChange: (competencia: string) => void;
}

export function SeletorCompetencia({
  competencia,
  onCompetenciaChange,
}: SeletorCompetenciaProps) {
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarCompetencias = async () => {
      try {
        const response = await fetch("/api/folha/competencias");
        const data = await response.json();
        if (data.competencias) {
          setCompetencias(data.competencias);
        }
      } catch (error) {
        console.error("Erro ao carregar competências:", error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarCompetencias();
  }, []);

  if (isLoading) {
    return (
      <div className="w-72 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
    );
  }

  const competenciaAtual = competencias.find((c) => c.valor === competencia);

  return (
    <div className="w-72">
      <select
        value={competencia}
        onChange={(e) => onCompetenciaChange(e.target.value)}
        className="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 shadow-sm hover:bg-white dark:hover:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all sm:text-sm sm:leading-6 px-3 py-2"
      >
        <option value="">Selecione uma competência</option>
        {competencias.map((comp) => (
          <option key={comp.valor} value={comp.valor}>
            {comp.display}
          </option>
        ))}
      </select>
    </div>
  );
} 
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
      <Listbox value={competencia} onChange={onCompetenciaChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-3 pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300">
            <span className="block truncate font-medium">
              {competenciaAtual?.display || "Selecione uma competência"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {competencias.map((comp) => (
                <Listbox.Option
                  key={comp.valor}
                  className={({ active }) =>
                    `relative cursor-default select-none py-3 pl-10 pr-4 ${
                      active
                        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                  value={comp.valor}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {comp.display}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-400">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
} 
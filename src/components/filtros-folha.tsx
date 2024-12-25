"use client";

import { useState, useEffect, useCallback } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Servidor } from "@/types/servidor";

interface FiltrosFolhaProps {
  dados: Servidor[];
  onFiltrosChange: (filtros: {
    nome: string;
    cargo: string;
    vinculo: string;
    lotacao: string;
  }) => void;
}

export function FiltrosFolha({ dados, onFiltrosChange }: FiltrosFolhaProps) {
  const [filtros, setFiltros] = useState({
    nome: "",
    cargo: "",
    vinculo: "",
    lotacao: "",
  });

  const [cargoQuery, setCargoQuery] = useState("");
  const [cargoOptions, setCargoOptions] = useState<string[]>([]);
  const [vinculoOptions, setVinculoOptions] = useState<string[]>([]);
  const [lotacaoOptions, setLotacaoOptions] = useState<string[]>([]);
  const [isCargoOpen, setIsCargoOpen] = useState(false);

  useEffect(() => {
    // Extrair opções únicas dos dados
    const cargos = [...new Set(dados.map((item) => item.cargo))].sort();
    const vinculos = [...new Set(dados.map((item) => item.vinculo))].sort();
    const lotacoes = [...new Set(dados.map((item) => item.lotacao))].sort();

    setCargoOptions(cargos);
    setVinculoOptions(vinculos);
    setLotacaoOptions(lotacoes);
  }, [dados]);

  const handleFiltrosChange = useCallback((campo: string, valor: string) => {
    const novosFiltros = { ...filtros, [campo]: valor };
    setFiltros(novosFiltros);
    onFiltrosChange(novosFiltros);
  }, [filtros, onFiltrosChange]);

  const cargosFiltrados = cargoQuery === ""
    ? cargoOptions
    : cargoOptions.filter((cargo) =>
        cargo.toLowerCase().includes(cargoQuery.toLowerCase())
      );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nome
        </label>
        <input
          type="text"
          value={filtros.nome}
          onChange={(e) => handleFiltrosChange("nome", e.target.value)}
          className="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 shadow-sm hover:bg-white dark:hover:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all sm:text-sm sm:leading-6 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 py-2"
          placeholder="Filtrar por nome"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cargo
        </label>
        <Combobox
          as="div"
          value={filtros.cargo}
          onChange={(value) => handleFiltrosChange("cargo", value)}
          className="relative"
        >
          <div
            className="relative w-full"
            onClick={() => setIsCargoOpen(true)}
            onBlur={() => setTimeout(() => setIsCargoOpen(false), 200)}
          >
            <Combobox.Input
              className="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 shadow-sm hover:bg-white dark:hover:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all sm:text-sm sm:leading-6 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 py-2"
              onChange={(event) => setCargoQuery(event.target.value)}
              placeholder="Selecione um cargo"
              displayValue={(cargo: string) => cargo || ""}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 dark:text-gray-500">
              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
            </Combobox.Button>
          </div>

          {isCargoOpen && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <Combobox.Option
                key="todos"
                value=""
                className={({ active }) =>
                  `relative cursor-default select-none px-4 py-2 ${
                    active
                      ? "bg-indigo-500 text-white"
                      : "text-gray-900 dark:text-white"
                  }`
                }
              >
                Todos
              </Combobox.Option>
              {cargosFiltrados.map((cargo) => (
                <Combobox.Option
                  key={cargo}
                  value={cargo}
                  className={({ active }) =>
                    `relative cursor-default select-none px-4 py-2 ${
                      active
                        ? "bg-indigo-500 text-white"
                        : "text-gray-900 dark:text-white"
                    }`
                  }
                >
                  {cargo}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </Combobox>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Vínculo
        </label>
        <select
          value={filtros.vinculo}
          onChange={(e) => handleFiltrosChange("vinculo", e.target.value)}
          className="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 shadow-sm hover:bg-white dark:hover:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all sm:text-sm sm:leading-6 px-3 py-2"
        >
          <option value="">Todos</option>
          {vinculoOptions.map((vinculo) => (
            <option key={vinculo} value={vinculo}>
              {vinculo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Lotação
        </label>
        <select
          value={filtros.lotacao}
          onChange={(e) => handleFiltrosChange("lotacao", e.target.value)}
          className="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 shadow-sm hover:bg-white dark:hover:bg-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all sm:text-sm sm:leading-6 px-3 py-2"
        >
          <option value="">Todas</option>
          {lotacaoOptions.map((lotacao) => (
            <option key={lotacao} value={lotacao}>
              {lotacao}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 
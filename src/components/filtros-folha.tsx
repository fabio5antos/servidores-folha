"use client";

import { useCallback, useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface FiltrosFolhaProps {
  dados: any[];
  onFiltrosChange: (filtros: Record<string, string>) => void;
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

  const cargosFiltrados = cargoQuery === ""
    ? cargoOptions
    : cargoOptions.filter((cargo) =>
        cargo.toLowerCase().includes(cargoQuery.toLowerCase())
      );

  const handleFiltrosChange = useCallback((campo: string, valor: string) => {
    setFiltros((prev) => {
      const novosFiltros = { ...prev, [campo]: valor };
      onFiltrosChange(novosFiltros);
      return novosFiltros;
    });
  }, [onFiltrosChange]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome
        </label>
        <input
          type="text"
          value={filtros.nome}
          onChange={(e) => handleFiltrosChange("nome", e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
          placeholder="Filtrar por nome"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            onBlur={() => setIsCargoOpen(false)}
          >
            <Combobox.Input
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
              onChange={(event) => setCargoQuery(event.target.value)}
              placeholder="Selecione um cargo"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>

          {isCargoOpen && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {cargosFiltrados.map((cargo) => (
                <Combobox.Option
                  key={cargo}
                  value={cargo}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active
                        ? "bg-indigo-600 text-white"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Vínculo
        </label>
        <select
          value={filtros.vinculo}
          onChange={(e) => handleFiltrosChange("vinculo", e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Lotação
        </label>
        <select
          value={filtros.lotacao}
          onChange={(e) => handleFiltrosChange("lotacao", e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
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
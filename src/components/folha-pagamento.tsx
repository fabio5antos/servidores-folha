"use client";

import { useState, useEffect } from "react";
import { TabelaFolha } from "./tabela-folha";
import { SeletorCompetencia } from "./seletor-competencia";
import { ThemeToggle } from "./theme-toggle";
import { Content } from "./content";
import { FiltrosFolha } from "./filtros-folha";

export function FolhaPagamento() {
  const [competencia, setCompetencia] = useState<string>("");
  const [dados, setDados] = useState<any[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarDados = async (comp: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/folha/${comp}`);
      if (!response.ok) {
        throw new Error("Erro ao carregar dados da folha");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setDados(data);
        setDadosFiltrados(data);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Formato de dados inválido");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setError(error instanceof Error ? error.message : "Erro ao carregar dados");
      setDados([]);
      setDadosFiltrados([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltrosChange = (filtros: {
    nome: string;
    cargo: string;
    vinculo: string;
    lotacao: string;
  }) => {
    const dadosFiltrados = dados.filter((servidor) => {
      const matchNome = servidor.nome
        .toLowerCase()
        .includes(filtros.nome.toLowerCase());
      const matchCargo =
        !filtros.cargo || servidor.cargo === filtros.cargo;
      const matchVinculo =
        !filtros.vinculo || servidor.vinculo === filtros.vinculo;
      const matchLotacao =
        !filtros.lotacao || servidor.lotacao === filtros.lotacao;

      return matchNome && matchCargo && matchVinculo && matchLotacao;
    });

    setDadosFiltrados(dadosFiltrados);
  };

  useEffect(() => {
    const carregarUltimaCompetencia = async () => {
      try {
        setError(null);
        const response = await fetch("/api/folha/competencias");
        if (!response.ok) {
          throw new Error("Erro ao carregar competências");
        }
        const { competencias } = await response.json();
        if (competencias && competencias.length > 0) {
          const ultimaCompetencia = competencias[0]; // Já está ordenado DESC
          setCompetencia(ultimaCompetencia.valor);
          carregarDados(ultimaCompetencia.valor);
        } else {
          throw new Error("Nenhuma competência disponível");
        }
      } catch (error) {
        console.error("Erro ao carregar competências:", error);
        setError(error instanceof Error ? error.message : "Erro ao carregar competências");
        setIsLoading(false);
      }
    };

    carregarUltimaCompetencia();
  }, []);

  return (
    <Content>
      <div className="space-y-6">
        <header className="flex justify-between items-center pb-6 border-b dark:border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Servidores / Folha de Pagamentos
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Visualize e exporte dados de folhas de pagamento
            </p>
          </div>
          <ThemeToggle />
        </header>

        <FiltrosFolha dados={dados} onFiltrosChange={handleFiltrosChange} />

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : dadosFiltrados.length > 0 ? (
          <TabelaFolha 
            dados={dadosFiltrados}
            competencia={competencia}
            onCompetenciaChange={(novaCompetencia) => {
              setCompetencia(novaCompetencia);
              carregarDados(novaCompetencia);
            }}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum dado encontrado para a competência selecionada
            </p>
          </div>
        )}
      </div>
    </Content>
  );
} 
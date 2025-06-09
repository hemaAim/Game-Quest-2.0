"use client";

import { useState, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";
import { ListaDeAlunosPorTurmaDoAluno, ReceberRecompensaPosAtividade } from "@/services/service-Aluno";
import { Aluno } from "../types/Aluno";
import Gema from "./Gema";
import SkeletonTable from "./Dashboard/SkeletonTable";

interface ListaAlunoADMProps {
  email?: string;
  turma?: string;
  title?: string;
}

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  preload: true,
  weight: ["400"]
});

export default function ListaTurmaDoAlunoADM({ title, turma }: ListaAlunoADMProps) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string>("");
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [bitcoin, setBitcoin] = useState("");
  const [pontosAtuais, setPontosAtuais] = useState("");
  const [termoPesquisa,] = useState("");

  // Função para enviar pontos e bitcoin para API
  const dataEnvioPontos = async () => {
    if (!alunoSelecionado) {
      alert("Selecione um aluno antes de salvar.");
      return;
    }
    try {
      // Aqui converte bitcoin para número, ajuste conforme necessário
      await ReceberRecompensaPosAtividade(alunoSelecionado.id, Number(bitcoin));
      alert("Dados enviados com sucesso!");
      setAlunoSelecionado(null); // fecha o modal após enviar
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados. Tente novamente.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { alunos } = await ListaDeAlunosPorTurmaDoAluno(turma!);
        setAlunos(alunos);
      } catch (error) {
        console.error(error);
        setErro("Erro ao carregar alunos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    if (turma) {
      fetchData();
    }
  }, [turma]);

  const getField = (aluno: Aluno, fieldName: string) =>
    aluno.fields?.find((field) => field.name === fieldName)?.value || "-";

  // Filtra e ordena os alunos
  const alunosFiltrados = alunos
    .filter((aluno) => {
      const nome = getField(aluno, "Nome do Aluno");
      return nome.toLowerCase().includes(termoPesquisa.toLowerCase());
    })
    .sort((a, b) => {
      const xpA = parseFloat(getField(a, "Bitcoin").replace(",", ".")) || 0;
      const xpB = parseFloat(getField(b, "Bitcoin").replace(",", ".")) || 0;
      return xpB - xpA; // ordem decrescente
    });

  return (
    <div className={`${bebasNeue.className} 2xl:w-4/6 sm:min-w-[300px] lg:w-full relative shadow-md sm:rounded-lg`}>
      {erro && <p className="text-red-500 text-sm">{erro}</p>}

      {loading ? (
        <p>Carregando alunos...</p>
      ) : turma === "Vazio" ? (
        <SkeletonTable />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#07070F] p-4">
          <h2 className={`${bebasNeue.className} m-3 p-2 text-3xl font-bold text-center text-white mb-6 flex gap-1`}>
            <p className="text-gray-700">Sua turma:</p> {title}
          </h2>



          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-100 uppercase">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">GEMA</th>
                <th className="px-6 py-3">Turma</th>
                <th className="px-6 py-3">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((aluno, index) => (
                <tr
                  key={aluno.id}
                  className="bg-[#07070F] hover:bg-gray-800 cursor-pointer"
                  onClick={() => setAlunoSelecionado(aluno)}
                >
                  <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-400">{getField(aluno, "Nome do Aluno")}</td>
                  <td className="px-6 py-4 text-gray-400">
                    <span
                      style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                    >
                      <Gema Img="/Gema.svg" Size={12} />
                      {getField(aluno, "Bitcoin")}
                    </span>
                  </td>
                  <td className="px-6 py-2 mb-10 text-gray-400">{getField(aluno, "Turma do WIT")}</td>
                  <td className="px-6 py-2 mb-10 text-gray-400">{getField(aluno, "Pontos Atuais")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {alunoSelecionado && (
        <div
          id="crud-modal"
          aria-hidden="false"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/40"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Aluno: {getField(alunoSelecionado, "Nome do Aluno")}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 rounded-lg p-1 dark:hover:bg-gray-600"
                  onClick={() => setAlunoSelecionado(null)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 flex flex-col gap-4">
                <label className="flex flex-col">
                  <span className="font-semibold">Gemas</span>
                  <input
                    type="number"
                    value={bitcoin}
                    onChange={(e) => setBitcoin(e.target.value)}
                    className="border p-2 rounded"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="font-semibold">Pontos atuais</span>
                  <input
                    type="number"
                    value={pontosAtuais}
                    onChange={(e) => setPontosAtuais(e.target.value)}
                    className="border p-2 rounded"
                  />
                </label>

                <button
                  onClick={dataEnvioPontos}
                  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

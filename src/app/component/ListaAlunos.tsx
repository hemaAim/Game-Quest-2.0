"use client";

import { useState, useEffect } from "react";
import { Bebas_Neue, Orbitron } from "next/font/google";
import { PegarAlunosParaTabela } from "@/services/service-Aluno";
import { Aluno } from "../types/Aluno";
import Gema from "./Gema";

// Fonte
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

// Props do componente
interface ListaAlunoProps {
   email?: string;
   turma?: string;
   title?: string;
}
const bebasNeue = Bebas_Neue({
   weight: ["400"]
})

export default function ListaAlunos({ title }: ListaAlunoProps) {
   const [alunos, setAlunos] = useState<Aluno[]>([]);
   const [loading, setLoading] = useState(true);
   const [erro, setErro] = useState<string>("");
   const [, setAlunoSelecionado] = useState<Aluno | null>(null);
   const [termoPesquisa, setTermoPesquisa] = useState("");

   // Buscar alunos na montagem do componente
   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true);

            const { alunos } = await PegarAlunosParaTabela();

            // Aqui você fez um filtro, mas o `.filter()` estava sem condição lógica.
            // Se quiser filtrar por email, ajuste isso.
            const alunosFiltrados = alunos.filter((aluno) => {
               const email = aluno.fields?.find((field) => field.name === "Email")?.value ?? "";
               return email.toLowerCase(); // Esta linha não tem efeito prático real (sem includes, match, etc.)
            });

            setAlunos(alunosFiltrados);
         } catch (error) {
            console.error(error);
            setErro("Erro ao carregar alunos. Tente novamente.");
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   // Filtragem dinâmica por nome com base na pesquisa
   const alunosFiltrados = alunos.filter((aluno) => {
      const nome = aluno.fields?.find((field) => field.name === "Nome do Aluno")?.value ?? "";
      return nome.toLowerCase().includes(termoPesquisa.toLowerCase());
   });

   // Função auxiliar para pegar valores dos campos
   const getField = (aluno: Aluno, fieldName: string) =>
      aluno.fields?.find((field) => field.name === fieldName)?.value || "-";

   return (
      <div className={`${bebasNeue.className} 2xl:w-4/6 sm:min-w-[400px]  lg:w-full relative shadow-md sm:rounded-lg`}>
         <h1 className="text-3xl font-bold text-center text-white mb-6">{title}</h1>

         {erro && <p className="text-red-500 text-sm">{erro}</p>}

         <input
            type="text"
            placeholder="Pesquisar aluno..."
            className="w-full px-4 py-2 mb-4 text-gray-200 border rounded-md focus:outline-none bg-transparent focus:ring-2 focus:ring-blue-400"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
         />

         {loading ? (
            <p>Carregando alunos...</p>
         ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#07070F]">
               <h2 className={`${bebasNeue.className} m-3 text-2xl p-2`}>{title}</h2>
               <table className="w-full text-sm text-left rtl:text-right ">

                  <thead className=" text-gray-100  uppercase  ">

                     <tr>
                        <th className="px-6 py-3">nome</th>
                        <th className="px-6 py-3">gemas</th>
                        <th className="px-6 py-3">PONTOS</th>

                        <th className="px-6 py-3">turma</th>
                     </tr>
                  </thead>
                  <tbody>
                     {alunosFiltrados.map((aluno) => (
                        <tr
                           key={aluno.id}
                           className="bg-[#07070F]" onClick={() => setAlunoSelecionado(aluno)}
                        >

                           <td className={`px-6 py-4   w-3xs text-gray-400`}>{getField(aluno, "Nome do Aluno")}</td>
                           <td className={`px-6 py-4   text-gray-400`}> <span style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}><Gema Img="Gema.svg" Size={12} />{getField(aluno, "Bitcoin")}</span></td>


                           <td className={`  px-6 py-4   text-gray-400`}> <span style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                              {getField(aluno, "Pontos Atuais")}
                              <Gema Img="/ESTRELAPONTOS.svg" Size={19} />
                           </span></td>
                           <td className={`px-6 py-4   text-gray-400`}>{getField(aluno, "Turma do WIT")}</td>

                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
}

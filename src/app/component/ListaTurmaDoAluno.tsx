"use client";

import { useState, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";
import { ListaDeAlunosPorTurmaDoAluno, transferirBitcoin } from "@/services/service-Aluno";
import { Aluno } from "../types/Aluno";
import Gema from "./Gema";
import SkeletonTable from "./Dashboard/SkeletonTable";
import { useAuth } from "../context/AuthContext";
import EnviarGemaModal from "./EnviarGema";
import { toast } from "sonner";


interface ListaAlunoProps {
   email?: string;
   turma?: string;
   title?: string;

}

const bebasNeue = Bebas_Neue({ 
   subsets: ['latin'],
    preload: true,
    weight: ["400"] });

export default function ListaTurmaDoAlunoLogado({ title, turma, email }: ListaAlunoProps) {
   const [alunos, setAlunos] = useState<Aluno[]>([]);
   const [loading, setLoading] = useState(true);
   const [erro, setErro] = useState<string>("");
   const [termoPesquisa,] = useState("");
   const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
   const [valorTransferencia, setValorTransferencia] = useState<number | "">("");
   const [, setErroTransferencia] = useState<string>("");




   const { aluno, } = useAuth()
   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true);
            const { alunos } = await ListaDeAlunosPorTurmaDoAluno(turma!);
            setAlunos(alunos);
          

         } catch (error) {
            console.error(error);
            console.log("Turma recebida erro:", turma);

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

   const alunosFiltrados = alunos
      .filter((aluno) => {
         const nome = aluno.fields?.find((field) => field.name === "Nome do Aluno")?.value ?? "";
         if (nome === aluno.nome_do_aluno) {

         }
         return nome.toLowerCase().includes(termoPesquisa.toLowerCase());
      })
      .sort((a, b) => {
         const xpA = parseFloat(getField(a, "Pontos Atuais").replace(",", ".")) || 0;

         const xpB = parseFloat(getField(b, "Pontos Atuais").replace(",", ".")) || 0;

         return xpB - xpA; // ordem decrescente
      });

   const handleTransferencia = async () => {
      console.log("Iniciando transferência...");
      if (!alunoSelecionado) return;
      const bitcoinDisponivel = Number(aluno?.bitcoin);
      console.log("aluno", aluno)

      console.log("biticon do aluno dentro do handletrafnferencia:", bitcoinDisponivel, "aluno", aluno?.bitcoin)
      if (valorTransferencia === "" || valorTransferencia <= 0) {
        
         
           toast.warning("o valor tem que ser maior que zero")
           
         return;
      }

    

      const valorAtualizadoParaNumero = Number(String(aluno?.bitcoin).replace(/\./g, "").replace(",", "."));

      console.log("bitcoin remetente atualizado", valorAtualizadoParaNumero);

      const sucesso = await transferirBitcoin(
         valorAtualizadoParaNumero,
         aluno?.id || "",
         alunoSelecionado.id,
         Number(valorTransferencia) || 0
      );

       
      if (sucesso) {

         alert("Transferência realizada com sucesso ✅✨");
         setValorTransferencia("");
      } else {
         setErroTransferencia("Erro ao realizar transferência. Tente novamente.");
      }
   };

   return (
      <div className={`${bebasNeue.className} 2xl:w-4/6 sm:min-w-[300px] lg:w-full relative shadow-md sm:rounded-lg`}>
       
         {erro && <p className="text-red-500 text-sm">{erro}</p>}

         {loading ? (
            <p>Carregando alunos...</p>
         ) : turma === "Vazio" ? (
            <SkeletonTable />
         ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#07070F]">
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
                        <th className="px-6 py-3">Pontos </th>
                        <th className="px-6 py-3"></th>
                     </tr>
                  </thead>
                  <tbody>
                     {alunosFiltrados.map((aluno, index) => (
                        <tr key={aluno.id} className="bg-[#07070F] " >
                           <td className="px-6 py-4 text-gray-400">{index + 1}</td> {/* posição */}
                           <td className="px-6 py-4 text-gray-400">{getField(aluno, "Nome do Aluno")}</td>
                           <td className="px-6 py-4 text-gray-400">
                              <span style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                                 <Gema Img="/Gema.svg" Size={12} />
                                 {getField(aluno, "Bitcoin")}
                              </span>
                           </td>
                           <td className="px-6 py-2 mb-10 text-gray-400">{getField(aluno, "Turma do WIT")}</td>
                           <td className="px-6 py-2 mb-10 text-gray-400 ">  <span style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>   <Gema Img="/ESTRELAPONTOS.svg" Size={18} />{getField(aluno, "Pontos Atuais")}                               </span></td>
                           <td className="px-6 py-2 mb-10 text-gray-400">
                              {getField(aluno, "Email") !== email && (
                                 <button
                                    onClick={() => setAlunoSelecionado(aluno)}
                                    className="text-sm/6 font-semibold py-1 px-5 bg-[#FF6F00] hover:bg-orange-600 transition rounded-sm text-white"
                                 >
                                    enviar
                                 </button>
                              )}
                           </td>

                        </tr>
                     ))}

                  </tbody>
               </table>
            </div>
         )}

         {alunoSelecionado && (
            <>

               <EnviarGemaModal
                  alunoSelecionado={alunoSelecionado}
                  setAlunoSelecionado={setAlunoSelecionado}
                  valorTransferencia={valorTransferencia}
                  setValorTransferencia={setValorTransferencia}

                  handleTransferencia={handleTransferencia}

               />  </>
         )}

      </div>
   );
}

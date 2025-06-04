"use client";
import { Bebas_Neue, Orbitron } from "next/font/google";
import Header from "@/app/component/Header";
import Image from "next/image";

import { useTemporadaELiga } from "@/app/hooks/useTemporadaELiga";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Countdown from "../component/Countdown";
import { PegarDesafiosDaTemporada } from "@/services/service-Temporada";
import { Desafio } from "../types/Desafios";
import MissaoCard from "../component/Dashboard/MissaoCard";



const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "900"] });

const Bebasneue = Bebas_Neue({ weight: ["400"] });

export default function TemporadaELiga() {
   const { loading, erro, temporadaELiga, } = useTemporadaELiga();
   const { user, aluno, logout, } = useAuth();
  const [desafioSelecionado, setDesafioSelecionado] = useState<Desafio | null>(null);
   const [desafios, setDesafios] = useState<Desafio[]>([]);


   useEffect(() => {
      if (temporadaELiga?.id) {
         PegarDesafiosDaTemporada(temporadaELiga.id)
            .then(setDesafios)
            .catch((error) => console.error("Erro ao buscar desafios:", error));
      }
   }, [temporadaELiga]);


   return (
      <div className="">  
      
      <div className="max-w-7xl flex flex-col w-full items-center gap-5    min-h-screen text-white font-sans">


         <Header StudentEmail={user?.email || null} StudentPhoto={user?.photoURL} IdStudent={aluno?.id} StudentName={user?.displayName || aluno?.nome_do_aluno} turma={aluno?.turma_do_wit || "Sem Turma"} handleLogout={logout} TextButton="Sair da Plataforma" link={[
            { name: "Inicio", link: "/" },
            { name: "Sobre", link: "/sobre" },
         ]} />
         {/* Gradiente sobre a imagem */}
         <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#00000A] to-black/50 -z-10"></div>

         {/* Imagem de fundo */}
         <Image
            src="./Dashboard/FundoTemporada.svg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 w-full h-full -z-20"
         />
         {temporadaELiga && (
            <div key={temporadaELiga.id}>
               <h3 className={`${Bebasneue.className} text-7xl py-2`}>{temporadaELiga.nome_da_temporada}</h3>
               <p className="max-w-6xl w-screen">{temporadaELiga.descricao}</p>
               <Countdown Finaliza_em="Finaliza em" targetDate={temporadaELiga.termino} inicio={temporadaELiga.data_de_inicio} />




            </div>

         )}

         <div className="mt-10 w-full max-w-4xl ">
            <h2 className={`${Bebasneue.className} text-4xl mb-4`}>Desafios da Temporada</h2>
            {desafios.length > 0 ? (
               <ul className="space-y-4">
                  {desafios.map((desafio) => (
                    <MissaoCard description={desafio.descricao} mitlicador={desafio.multiplicador} idToURL={desafio.id} spanTimeBool="" time={desafio.tempo_da_atividade} BorderPosition="" gems={desafio.pontos} imageSrc="/Dashboard/ImgSorteio.svg" onClick={() => setDesafioSelecionado(desafio)} progress="" title={desafio.Titulo} vencimento="10/20" />
                 
                  ))}
               </ul>
            ) : (
               <p className="text-gray-300">Nenhum desafio encontrado.</p>
            )}
         </div>

      </div>




      </div>
   );
}

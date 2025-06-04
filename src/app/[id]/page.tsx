"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DesafioService } from "@/services/DesafioService";
import type { Desafio } from "@/app/types/Desafios"; // ajuste o caminho

import CardDetalheMissao from "../component/CardInfo";
import Header from "../component/Header";

import { useAuth } from "../context/AuthContext";
import Image from "next/image";

import Link from "next/link";


const LessonPage = () => {
   const params = useParams();
   const idParam = params?.id;


   // Estado para armazenar o desafio
   const [desafio, setDesafio] = useState<Desafio | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const { user, aluno, logout } = useAuth();
   useEffect(() => {
      if (!idParam) {
         setError("ID não fornecido");
         setLoading(false);
         return;
      }

      const idNumber = Number(idParam);

      if (isNaN(idNumber)) {
         setError("ID inválido");
         setLoading(false);
         return;
      }

      DesafioService.buscarDesafioById(idNumber)
         .then((res) => {
            setDesafio(res);
            setLoading(false);
         })
         .catch(() => {
            setError("Erro ao buscar desafio");
            setLoading(false);
         });
   }, [idParam]);

   if (loading) return <p>Carregando...</p>;
   if (error) return <p>Erro: {error}</p>;




   const total = (desafio?.multiplicador ?? 0) * (desafio?.pontos ?? 0);



   return (
      <>
         <div className="relative w-full font-sans bg-[#00000A] flex  flex-col justify-center items-center">
            <div className="z-20 relative">
               <Header
                  StudentEmail={user?.email || aluno?.email || null}
                  StudentPhoto={user?.photoURL || "/default-user.png"}
                  IdStudent={aluno?.id} // ou buscar esse ID de outro lugar, como do contexto de aluno
                  StudentName={user?.displayName || aluno?.nome_do_aluno}
                  turma={aluno?.turma_do_wit}
                  TextButton="Sair da Plataforma"
                  handleLogout={logout}
                  link={[
                     { name: "Inicio", link: "/" },
                     { name: "Sobre", link: "/sobre" },
                  ]}
               />
            </div>


            <div className="flex flex-col justify-center items-center  ">
               <div className="w-full">
                  <div className=" min-h-screen flex flex-col items-center p-2">
                     <div className="max-w-4xl w-full rounded-2xl  z-10">
                        <h1 className="text-5xl font-bold text-gray-100 flex items-center gap-2 ">
                           {desafio?.Titulo}
                        </h1>
                        <p className="text-gray-700 mt-2 w-2xl font-bold">
                           <span className="text-gray-300 font-light italic text-base ">{desafio!.descricao}</span>
                        </p>
                     </div>
                     <div className="peer absolute top-0 left-0 w-full max-w-screen h-[26rem] ">
                        <Image src="/fundoMissão.jpg" alt="Gema" fill
                           className="object-cover opacity-40" />
                     </div>
                     <CardDetalheMissao multiplicador={desafio!.multiplicador} pontuacao={desafio!.pontos} tempodaAtividade={desafio!.tempo_da_atividade} curso={desafio!.tipo} />
                  </div>
               </div>
               <div className="bg-[#07070F] p-8 rounded-lg shadow-md w-full font-sans ">
                  <div className="flex justify-between items-center">
                     <h1 className="text-2xl font-bold  mb-2 text-gray-300">
                        {desafio?.Titulo}
                     </h1>
                     <span className="text-blue-600  mx-10  text-xl font-bold">{total} </span>
                  </div>
                  <div className="border-t border-amber-50/40 pt-4 mb-10">
                     <h2 className="font-semibold text-lg mb-2  text-gray-300 ">Tópicos da Missão:</h2>
                     <ul className="list-disc list-inside space-y-1 ">
                        {(() => {
                           const exigencias = [
                              desafio?.Exigência_1,
                              desafio?.Exigência_2,
                              desafio?.Exigência_3,
                              desafio?.Exigência_4,
                           ].filter(Boolean); // Filtra tópicos não nulos

                           const pontosPorTopico = exigencias.length > 0 ? total / exigencias.length : 0;

                           return exigencias.map((exigencia, index) => (
                              <li key={index} className="relative mb-10 ms-8 max-w-2xl flex justify-start items-center">
                                 <span className="absolute flex items-center justify-center w-3 h-3 bg-orange-500  rounded-full -start-3.5 ring-2 ring-white dark:ring-gray-700 dark:bg-gray-600">
                                    {/* Ícone */}
                                    <svg className="w-2.5 h-2.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="..." /></svg>
                                 </span>

                                 <h3 className="grid grid-cols-1  items-start mb-1 ml-2 mt-3 font-medium text-gray-300 dark:text-white">
                                    {exigencia}
                                    <span className=" text-blue-800 text-sm font-medium mr-2  py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ">
                                       {pontosPorTopico.toFixed(2)} pts
                                    </span>
                                 </h3>
                              </li>
                           ));
                        })()}

                     </ul>
                  </div>

                  <div className="w-full flex justify-end items-end">
                     <button
                        className="text-sm font-semibold py-4 px-3 cursor-pointer bg-[#FF6F00] hover:bg-orange-600 transition rounded-lg text-white"
                     >
                        <Link href="/">
                           Realizado
                        </Link>
                     </button>
                  </div>
               </div>
            </div>
         
         </div>
      </>
   );
};

export default LessonPage;

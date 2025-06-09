"use client";

import React, { useEffect, useState } from "react";

import {
   QuizData,
   Question,
   Media,
} from "@/app/types"; // importe as interfaces do arquivo types.ts
import { useRouter } from "next/navigation"; // App Router
import { Cherry_Bomb_One } from "next/font/google"
import { useAuth } from "../context/AuthContext";

import Gema from "./Gema";
import { ReceberRecompensaPosAtividade } from "@/services/service-Aluno";
import { Aluno } from "../types/Aluno";
import Image from "next/image";


const Cherry = Cherry_Bomb_One({ weight: ["400"] })
interface QuizClientProps {
   quiz: QuizData;

}

const QuizClient: React.FC<QuizClientProps> = ({ quiz }) => {
   const [current, setCurrent] = useState<number>(0);
   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
   const [showFeedback, setShowFeedback] = useState<boolean>(false);
   const [score, setScore] = useState<number>(0);
   const [showResult, setShowResult] = useState<boolean>(false);
   const [timeLeft, setTimeLeft] = useState<number>(0);
   const questions: Question[] = quiz.info.questions;
   const q: Question = questions[current];
const router = useRouter();
   const [erro, setErro] = useState<string>("");
   const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
   const [bitcoin, setBitcoin] = useState("");
   const [pontosAtuais, setPontosAtuais] = useState("");
   const [termoPesquisa,] = useState("");

   // Função para enviar pontos e bitcoin para API
   const { aluno } = useAuth()




   // Atualiza o tempo restante sempre que a pergunta mudar
   useEffect(() => {
      const total = q.time / 1000; // total em segundos
      setTimeLeft(total);
   }, [current]);

   useEffect(() => {
      if (timeLeft <= 0) return;

      const interval = setInterval(() => {
         setTimeLeft(prev => {
            if (prev <= 0.1) {
               clearInterval(interval);
               handleNext(); // ou o que quiser ao terminar
               return 0;
            }
            return +(prev - 0.1).toFixed(1); // diminui em 0.1s
         });
      }, 100); // atualiza a cada 100ms

      return () => clearInterval(interval);
   }, [timeLeft]);

   // Verifica se existe mídia do tipo "image" na pergunta atual
   const perguntaTemImagem = (q: Question): boolean => {
      const media = q.structure.query.media;
      return Array.isArray(media) && media.some((m) => m.type === "image");
   };

   // Ao selecionar uma alternativa:
   const handleAnswer = (selectedOption: number) => {
      const currentQuestion = questions[current];

      setSelectedAnswer(selectedOption);
      setShowFeedback(true); // Mostra o feedback de certo/errado

      const isCorrect = selectedOption === currentQuestion.structure.answer;

      if (isCorrect) {
         setScore((prev) => prev + currentQuestion.structure.marks.correct);
      }

      // Se quiser avançar automaticamente após alguns segundos, você pode:
      setTimeout(() => handleNext(), 1500);
   };
   const totalTime = q.time / 1000;
   const progressPercent = (timeLeft / totalTime) * 100;



   const totalAvailablePoints = questions.reduce(
      (total, question) => total + question.structure.marks.correct,
      0
   );


   // Avança para a próxima pergunta ou exibe resultado final
   function handleNext() {
      setSelectedAnswer(null);
      setShowFeedback(false);

      if (current + 1 < questions.length) {
         setCurrent(current + 1);
      } else {
         setShowResult(true);
      }
   }

   const dataEnvioPontos = async () => {
      if (!aluno) {
         alert("o aluno esta auxente");
         return;
      }

      try {
         // Aqui converte bitcoin para número, ajuste conforme necessário
         await ReceberRecompensaPosAtividade(aluno?.id, Number(score), true);
         alert("Dados enviados com sucesso!"); 
         router.push("/");

      } catch (error) {
         console.error("Erro ao enviar dados:", error);
         alert("Erro ao enviar dados. Tente novamente.");
      }
   };
   if (showResult) {
      return (
         <main className="p-6 max-w-3xl mx-auto z-20">

            <h2 className="text-3xl font-bold mb-4">Resultado Final</h2>
            {/* Aqui você mostra quantos pontos o usuário marcou (score) 
            e quantos pontos o quiz totalmente valia (totalAvailablePoints). */}
            <p>
               Você fez <strong>{score}</strong> pontos de um total de{" "}
               <strong>{totalAvailablePoints}</strong>.
            </p>
            <button
               className="mt-4 px-4 py-2  text-white rounded"
               onClick={dataEnvioPontos}
            >
               Finalizar e Receber Pontos
            </button>
         </main>
      );
   }
   const optionColors = [
      "bg-red-600",
      "bg-green-600",
      "bg-blue-600",
      "bg-yellow-600",
      "bg-pink-600",
      "bg-purple-600",
   ];


   return (


      <div className="bg-[#00000A] min-h-screen text-white font-sans items-center flex flex-col">

         <header className=" w-full bg-gray-100 h-10 flex items-center justify-center text-gray-800">


            <div className="max-w-6xl flex justify-between w-full items-center">
               <h3 className={`${Cherry.className}  font-semibold mb-1`}>
                  {current + 1}/{questions.length}
               </h3>



               <p className={`${Cherry.className}  font-semibold mb-1`}>   {quiz.info.name}</p>


               <p className={`${Cherry.className}  font-semibold mb-1 text-lg flex items-center`}>   <Gema Img="ESTRELAPONTOS.svg" Size={25} />   {score} p.</p>

            </div>

         </header>






         {/* Caixa da pergunta */}
         <div className="p-4 w-full h-screen  max-w-6xl rounded-lg flex flex-col justify-center items-center">

            <p
               className={`${Cherry.className} mb-1 text-4xl font-bold text-white`}
               dangerouslySetInnerHTML={{
                  __html: q.structure.query.text.toUpperCase(),
               }}
            ></p>



            {/* Se houver imagem associada, exibe abaixo do texto */}
            {perguntaTemImagem(q) && (
               <div className="mt-4">
                  {q.structure.query.media
                     .filter((m: Media) => m.type === "image")
                     .map((m: Media, idx: number) => (

                        <Image
                           key={idx}
                           src={m.src || m.url || ""}
                           alt={`Imagem da pergunta ${current + 1}`}
                           width={200}
                           height={20}
                           className="max-w-xl rounded-lg mb-4"
                           style={{ height: "auto", }}
                           unoptimized={!(m.src || m.url)?.startsWith("/")} />
                     ))}
               </div>
            )}

            {/* Lista de opções */}
            <ul className="grid grid-cols-2 gap-3 w-full  mt-6  ">
               {q.structure.options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = q.structure.answer === i;
                  const colorClass = optionColors[i % optionColors.length]; // se passar do número de cores, repete

                  let bgClass = " cursor-pointer group-hover:bg-ds-lilac-400 group-active:bg-ds-lilac-600 py-0 px-8 border border-transparent  h-full relative before:absolute before:inset-0 before:shadow-[0_-4px_0_0_#09090926_inset] before:transition-all before:duration-400 before:ease-[cubic-bezier(0.34,1.56,0.64,1)] active:before:translate-y-1 active:before:shadow-none origin-bottom active:scale-y-[0.90] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] before:rounded-lg";
                  if (showFeedback) {
                     if (isCorrect) bgClass = "bg-green-500 group-hover:bg-ds-lilac-400 group-active:bg-ds-lilac-600 py-0 px-8 border border-transparent rounded-admin-lg h-full relative before:absolute before:inset-0 before:shadow-[0_-4px_0_0_#09090926_inset] before:transition-all before:duration-300 before:ease-[cubic-bezier(0.34,1.56,0.64,1)] active:before:translate-y-1 active:before:shadow-none origin-bottom active:scale-y-[0.90] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] before:rounded-lg";
                     else if (isSelected && !isCorrect)
                        bgClass = "bg-red-500 ";
                  }

                  return (
                     <li key={opt.id}>
                        <button
                           disabled={showFeedback}
                           className={`w-full p-3  py-10 rounded-xl bg-[#FF6F00] text-white font-bold   ${colorClass}  ${bgClass}`}
                           onClick={() => handleAnswer(i)}
                           dangerouslySetInnerHTML={{ __html: opt.text }}
                        />
                     </li>
                  );
               })}
            </ul>

            {/* Mensagem de feedback + botão (caso queira override manual) */}
            {showFeedback && (
               <div className="mt-4">
                  {selectedAnswer === q.structure.answer ? (
                     <section className=" min-h-screen absolute top-0 left-0 bg-[#00000a] w-full flex items-center justify-center flex-col gap-3  overflow-hidden">
                        <p className={`${Cherry.className} text-gray-100  text-5xl font-semibold `}>
                           Correto
                        </p>

                        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">

                           <circle cx="60" cy="60" r="50" fill="#2ECC71" stroke="white" stroke-width="10" />


                           <path d="M40 65 L55 80 L80 45" fill="none" stroke="white" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>


                        <div className="w-full ">
                           <p className={`${Cherry.className} text-white mt-2 text-2xl flex items-center justify-center `}>

                              <Gema Img="ESTRELAPONTOS.svg" Size={30} />{score} pontos
                           </p>
                        </div>
                     </section>
                  ) : (
                     <section className=" min-h-screen absolute top-0 left-0 bg-[#00000a] w-full flex items-center justify-center flex-col gap-3">
                        <p className={`${Cherry.className} text-gray-100  text-5xl font-semibold `}>
                           Incorreto
                        </p>

                        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">

                           <circle cx="60" cy="60" r="50" fill="#FF3B5C" stroke="white" stroke-width="10" />


                           <line x1="40" y1="40" x2="80" y2="80" stroke="white" stroke-width="12" stroke-linecap="rounded" />
                           <line x1="80" y1="40" x2="40" y2="80" stroke="white" stroke-width="12" stroke-linecap="" />
                        </svg>

                        <div className="w-full ">
                           <p className={`${Cherry.className} text-white mt-2 text-2xl flex items-center justify-center `}>
                              <Gema Img="ESTRELAPONTOS.svg" Size={30} />{score} pontos
                           </p>
                        </div>
                     </section>
                  )}


               </div>
            )}
            <div className="w-full   rounded-full h-2.5 mb-4 overflow-hidden mt-10">
               <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-[100ms] ease-linear"
                  style={{ width: `${progressPercent}%` }}
               />
            </div>
         </div>

         {/* Estatísticas gerais */}

      </div>
   );
};

export default QuizClient;

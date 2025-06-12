"use client";

import React, { useEffect, useState, useCallback } from "react";


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
import { toast } from "sonner";
import Confetti from 'react-confetti';
import Image from "next/image";



const Cherry = Cherry_Bomb_One({
   weight: ["400"],
   subsets: ["latin"]
})
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
   const [, setShowConfetti] = useState(false);


   console.log("QUESTIONS", quiz.info.questions);
   // Função para enviar pontos e bitcoin para API
   const { aluno } = useAuth()

   const handleNext = useCallback(() => {
      setSelectedAnswer(null);
      setShowFeedback(false);

      if (current + 1 < questions.length) {
         setCurrent(current + 1);
      } else {
         setShowResult(true);
      }
   }, [current, questions.length]);



   // Atualiza o tempo restante sempre que a pergunta mudar
   useEffect(() => {
      const total = q.time / 1000;
      setTimeLeft(total);
   }, [q.time]);


   useEffect(() => {
      if (timeLeft <= 0) return;

      const interval = setInterval(() => {
         setTimeLeft(prev => {
            if (prev <= 0.1) {
               clearInterval(interval);
               handleNext();
               return 0;
            }
            return +(prev - 0.1).toFixed(1);
         });
      }, 100);

      return () => clearInterval(interval);
   }, [handleNext, timeLeft]);


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
      (total, question) => total + question?.structure?.marks?.correct,
      0
   );


      if (!quiz || !quiz.info.questions || quiz.info.questions.length === 0) {
      return <div>Este quiz não possui questões disponíveis.</div>;
   }

   // Avança para a próxima pergunta ou exibe resultado final

   const dataEnvioPontos = async () => {
      if (!aluno) {
         alert("o aluno esta auxente");
         return;
      }

      try {
         // Aqui converte bitcoin para número, ajuste conforme necessário
         await ReceberRecompensaPosAtividade(aluno?.id, Number(score));

         toast.info(`vc recebeu ${score} pontos`)
         setShowConfetti(true);
         setTimeout(() => setShowConfetti(false), 7000);
         router.push("/");

      } catch (error) {
         console.error("Erro ao enviar dados:", error);
         alert("Erro ao enviar dados. Tente novamente.");
      }
   };
   if (showResult) {


      return (
         <main className="p-6 max-w-3xl mx-auto z-20 flex flex-col items-center justify-center  overflow-hidden font-sans ">
            <div className="bg-[#07070F] rounded-2xl shadow-xl p-8 w-full text-center space-y-6">
               <h2 className="text-4xl font-extrabold text-gray-300">  {score > 0 ? (
                   <p>🎉</p>
               ) : ( <p>😞</p> )} Resultado Final</h2>

               <p className="text-lg text-gray-200">
                  Você fez{" "}
                  <span className="text-green-600 font-bold text-xl">{score} </span>
                  pontos de um total de{" "}
                  <span className="text-blue-600 font-bold text-xl">{totalAvailablePoints}</span>
               </p>
               {score > 0 ? (
                  <Confetti />
               ) : (
                  <div className="flex flex-col items-center justify-center min-h-[300px] p-8  rounded-lg shadow-md max-w-md mx-auto">
                     <svg
                        className="w-16 h-16 mb-4 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
                     </svg>
                     <h2 className="text-2xl font-semibold mb-2 text-red-500">Ops, não foi dessa vez!</h2>
                     <p className="text-center text-red-500">Mas não desista, tente novamente e você vai conseguir! 🚀</p>
                  </div>
               )}

               <button
                  className="mt-4 bg-orange-500 hover:to-indigo-700 transition-all duration-300 ease-in-out px-6 py-3 text-white font-semibold text-lg rounded-xl shadow-md hover:scale-105"
                  onClick={dataEnvioPontos}
               >
                  ✅ Finalizar 
               </button>
            </div>
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

                           <circle cx="60" cy="60" r="50" fill="#2ECC71" stroke="white" strokeWidth="10" />


                           <path d="M40 65 L55 80 L80 45" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
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

                           <circle cx="60" cy="60" r="50" fill="#FF3B5C" stroke="white" strokeWidth="10" />


                           <line x1="40" y1="40" x2="80" y2="80" stroke="white" strokeWidth="12" strokeLinecap="round" />
                           <line x1="80" y1="40" x2="40" y2="80" stroke="white" strokeWidth="12" strokeLinecap="round" />
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

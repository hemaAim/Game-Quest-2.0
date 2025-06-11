"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import JoinCodeInput from "./JoinCodeInput";



interface QuizCardProps {
   title: string;
   totalQuestions: number;
   remainingQuestions: number;
   codeId: string,
   url: any

}

export default function QuizCard({
   title,
   totalQuestions,

   codeId,
   url

}: QuizCardProps) {



   return (
      <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-md bg-purple-100 ">
         {/* Header com cor e ícone */}
         <div className="bg-orange-500 relative h-20 flex items-center justify-center">

            <div className="text-white text-3xl font-bold">{title}</div>
            {/* Badge de perguntas */}
            <div className="absolute top-2 left-2 bg-white text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-md shadow">
               {totalQuestions} Qs
            </div>
         </div>

         {/* Conteúdo do card */}
         <div className="p-4 text-center">
            <p className="text-sm font-medium text-gray-800"></p>
         </div>

         {/* Barra de progresso */}
         <div className="  py-2">
            <div className="text-xs text-purple-800 font-semibold mb-1">
               <JoinCodeInput codeID={codeId} url={url} />


            </div>

         </div>
      </div>
   );
}

// components/VRCard.tsx
import Image from 'next/image';
import React from 'react';

interface VRcardProps {
   title: string;
   price: number;
   vencimento: string;
   img: string;
   time: string;
    onClick: any
}

export default function VRCard({ title, price, vencimento, onClick, time }: VRcardProps) {
   const formatarVencimento = (dateString: string) => {
      if (!dateString) return null;

      // Converte de "14/03/2025 15:08" para "2025-03-14T15:08:00"
      const partes = dateString.split(/[/ :]/); // ['14', '03', '2025', '15', '08']
      if (partes.length < 5) return null;

      const [dia, mes, ano, hora, minuto] = partes;
      const dataFormatada = new Date(`${ano}-${mes}-${dia}T${hora}:${minuto}:00`);

      if (isNaN(dataFormatada.getTime())) return null;

      const diaNum = dataFormatada.getDate();
      const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
      const mesAbreviado = meses[dataFormatada.getMonth()];

      return `Venc ${mesAbreviado}, ${diaNum}`;
   };



   return (
      <div className="rounded-xl p-2 w-72 text-white font-sans shadow-lg">
         <div className="bg-[#07070F] rounded-xl p-4">
            <div className="relative mb-4">
               <img
                  src={`/cardCompra.svg`}
                  alt="Óculos VR"
                  className="rounded-lg w-full object-cover opacity-20"
               />
               <span className="absolute top-2 left-2 text-white font-bold text-xl">
                  {title.toUpperCase()}
               </span>
            </div>

            <div className="flex justify-between items-center px-1 mb-9">
               <div className="flex items-center gap-1 text-sm font-medium">
                  <Image src="/Dashboard/Gema.svg" alt="Gema" width={11} height={16} />
                  <span>{price} GEM</span>
               </div>

               <div className="flex flex-col items-start">

                  {formatarVencimento(vencimento) ? (
                     <div className="text-xs bg-blue-600 text-white rounded-full px-1 py-1">
                        {formatarVencimento(vencimento)}
                     </div>
                  ) : (
                     <div className="text-xs bg-yellow-600 text-black rounded-full px-2 py-1">
                        sem vencimento
                     </div>
                  )}
               </div>


            </div>

            <div className="grid grid-cols-6 items-end">
               <div className="text-xs col-span-3 text-gray-300 flex items-center gap-1">
                  <p>{time}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     width="18" height="18" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <circle cx="12" cy="12" r="10" />
                     <polyline points="12 6 12 12 16 14" />
                  </svg>
               </div>

               <button onClick={onClick} className="w-full col-span-3 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-bold transition">
                  COMPRAR
               </button>
            </div>
         </div>
      </div>
   );
}

import { Bebas_Neue } from "next/font/google";
import React from "react";

type CupomCardProps = {
  titulo: string;
  preco: number;
  vencimento: string;
  onValidar: () => void;
  corTopo?: string;
  sigla?: string;
  isVencido?: boolean;
};

const Bebasneue = Bebas_Neue({
  weight: ["400"]
})
export default function CupomCard({
  titulo,
  preco,
  vencimento,
  onValidar,
  corTopo = "bg-orange-500",
  sigla = "GQ",
  isVencido
}: CupomCardProps) {
  return (
     <div className="rounded-[20px] p-2 w-[200px] ">
      <div className={`rounded-t-[20px] ${isVencido ? "bg-gray-400" : corTopo} relative p-4 text-white`}>
        <div className="absolute top-2 left-2 bg-white text-orange-500 font-bold text-xs rounded-full w-8 h-8 flex items-center justify-center">
          {sigla}
        </div>

        <h2 className={`${Bebasneue.className} font-bold text-xl mt-7`}>{titulo}</h2>


        <div className="flex w-full  justify-between ">
          <div className="flex items-center justify-between text-xs mt-1">
            <span className={`${Bebasneue.className}  flex items-center gap-1`}>
              🌿 {preco.toFixed(2)} GEM
            </span>

          </div>

        </div>
        <span className="text-white/80 text-[10px] ">VÁLIDO ATÉ: {vencimento}</span>
      </div>

      {/* “corte” lateral */}
      <div className="flex relative justify-between z-10 -mt-2">
        <div className="bg-[#00000A] w-5 h-5 rounded-full -ml-2"></div>
        <div className="bg-[#00000A] w-5 h-5 rounded-full -mr-2"></div>
      </div>

      <div className="bg-white rounded-b-[20px] py-4 text-center cursor-pointer -z-10">
        <button
          onClick={onValidar}
          className={`font-bold tracking-wide text-sm ${isVencido ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
            }`}
          disabled={isVencido}
        >
          VALIDAR CUPOM
        </button>
      </div>
    </div>
  );
}

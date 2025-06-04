"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import Link from "next/link"

import { Bebas_Neue } from "next/font/google"

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
    preload: true,
  weight: ["400"]
})
interface TemporadaCardProps {
  Title: string;
  Description: string;
  Recompense: any;
  Links: string
}

const TemporadaCard = ({ Description, Recompense, Title, Links }: TemporadaCardProps) => {
  return (
  <div className="relative lg:min-w-2xl  rounded-2xl overflow-hidden bg-black">
  {/* Imagem de fundo */}
  <Image
    src="/Dashboard/FundoTemporada.svg"
    alt="Origem do Avatar"
    fill
    className="object-cover opacity-40"
  />

  {/* Selo “TEMPORADA 🔥” */}
  <div className="absolute top-4 left-11/12 -translate-x-1/2 bg-[#002FFF] text-white px-2 py-1 rounded-md text-sm font-bold z-20">
    TEMPORADA
  </div>

  {/* Conteúdo sobreposto */}
  <div className="relative p-4 flex flex-col justify-between bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10">
    <div>
      <h1 className="text-white text-xl font-bold">{Title}</h1>
      <p className="text-sm italic text-white/70 mt-1 mb-4 max-w-4/5">
        {Description.length > 260 ? `${Description.slice(0, 260)}...` : Description}
      </p>

      <div className="flex items-center gap-2">
        <Image
          src="/Dashboard/Gema.svg"
          alt="GEM"
          width={16}
          height={16}
        />
        <span className="text-white/70 text-sm font-bold">{Recompense} GEM</span>
      </div>
    </div>

    <div className="flex items-start flex-col mt-4">
      <button
        className={`${bebasNeue.className} text-sm font-semibold py-3 px-7 bg-[#FF6F00] cursor-pointer hover:bg-orange-600 transition rounded-lg text-white`}
      >
        <Link href={Links}>Ver Temporada</Link>
      </button>
    </div>
  </div>
</div>

  )
}

export default TemporadaCard

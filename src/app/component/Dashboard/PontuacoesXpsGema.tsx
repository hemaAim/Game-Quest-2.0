"use client"

import Image from "next/image"
import { IBM_Plex_Mono, Bebas_Neue, Poppins } from "next/font/google"
const bebasNeue = Bebas_Neue({ 
  weight: ["400"]
})
const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const poppins = Poppins({
  weight: ["200"],
})

interface CardProps {
  title: string
  img: string
  value: any
  Bool: boolean 
  sizeImg: number
}

const PontuacoesXpsGema = ({ title, img, value, Bool, sizeImg }: CardProps) => {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center gap-2">
      <span className={poppins.className}>{title}</span>
      <div
        className={`${bebasNeue.className} font-extrabold flex justify-between text-white text-2xl mb-4 items-center gap-2`}
      >
        {Bool ? (
          <>
            <Image
              alt="Ícone de Gema"
              src={`/Dashboard/${img}`}
              width={sizeImg}
              height={100}
            />
            {value}
          </>
        ) : (
          <>
            {value}
            <Image
              alt="Ícone de Gema"
              src={`/Dashboard/${img}`}
              width={sizeImg}
              height={100}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default PontuacoesXpsGema

"use client"

import { Poppins, Bebas_Neue } from "next/font/google"
import Image from "next/image"
import { FC } from "react"





interface MissaoCardProps {
   imageSrc: string
   title: string
   gems: number
   progress: string
   onClick: () => void
   vencimento: string

   description: string;

   BorderPosition?: string

   mitlicador: number
   time: string | number
   spanTimeBool: string
   idToURL: number
   

}

const poppins = Poppins({
   weight: ["500"]
})

const bebasNeue = Bebas_Neue({
   weight: ["400"]
})
const MissaoCard = ({ imageSrc, title, gems, progress, onClick, vencimento, description, BorderPosition, mitlicador, spanTimeBool, time, idToURL }: MissaoCardProps) => {

   const URL = `${idToURL}`



   return (
      <div className="bg-[#07070F] rounded-2xl overflow-hidden shadow-lg border-0 ">
         <div className="w-full h-38 relative">
            <Image
               src={imageSrc}
               alt={title}
               fill
               className="object-cover"
            />
         </div>

         <div className="p-4 space-y-2 max-h-2/12 grid  text-white py-5">


            <div className="flex flex-col  gap-2  h-[2rem]">
               <h3 className={`${poppins.className} w-full text-sm font-semibold `} >{title}</h3>

               <span className="text-sm text-gray-300">{progress}</span>
            </div>

            <div className="w-full max-w-full flex flex-col   gap-2 ">

               <div className="border-b-1 border-gray-800 w-full py-2 flex flex-row justify-between">

                  <div className={` ${bebasNeue.className} flex items-center gap-1 text-sm font-medium`}>
                     <Image src="/Dashboard/Gema.svg" alt="Gema" width={11} height={16} />
                     {gems.toFixed(2)} GEM
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs text-gray-300 font-extrabold ">{spanTimeBool || "Duração"}</span>
                     <p className="text-sm text-gray-400">{time || "10"} min</p>
                  </div>



               </div>


               <button
                  onClick={onClick}
                  className={`${bebasNeue.className} cursor-pointer  text-white  py-2 px-4 w-full   bg-[#FF6F00] hover:bg-orange-600 transition rounded-lg  focus:outline focus:outline-offset-2`}>

                  <a href={`/${URL}`} className="text-sm ">
                     Iniciar Missão
                  </a>
               </button>


            </div>

         </div>
      </div>
   )
}

export default MissaoCard
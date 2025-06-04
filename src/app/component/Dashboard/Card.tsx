"use client"

import Image from "next/image"
import { IBM_Plex_Mono, Poppins, Bebas_Neue } from "next/font/google";




const bebasNeue = Bebas_Neue({
  weight: ["400"]
})
interface CardProps { 
 

title: string; 
img: string;
price: number; 
link: string
}
const Card = ({title, img,  price, link}: CardProps) => {
   return (
      <div className="min-w-[416px] h-[306px] rounded-2xl overflow-hidden  bg-[#07070F] flex flex-col justify-between">
<a href={link}> 


         {/* Parte da imagem com título sobreposto */}
         <div className="relative  h-[240px] m-2 ">
            <Image
               src={`/Dashboard/${img}`}
               alt="Sorteio"
               fill
               className="object-cover rounded-2xl opacity-60"
            />

            <div className="absolute top-0 left-4">
               <h1 className={`${bebasNeue.className}text-white text-xl font-bold`}>{title}</h1>
            </div>
         </div>

         {/* Rodapé azul com GEM */}
         <div className=" w-full h-[56px] flex items-center px-4 gap-2">
            <Image
               src="/Dashboard/Gema.svg" // substitua por seu ícone real
               alt=""
               width={16}
               height={16}
            />
            <span className={` ${bebasNeue.className} text-white text-lg font-medium`}>{price} GEM</span>
         </div>
         </a>
      </div>
   )
}

export default Card

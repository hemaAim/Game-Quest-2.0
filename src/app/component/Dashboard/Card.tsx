"use client"

import Image from "next/image"
import {  Bebas_Neue } from "next/font/google";
import Link from "next/link";

//numero negativo não pode ser enviado para outro usuario
const bebasNeue = Bebas_Neue({
   subsets: ['latin'],
    preload: true,
  weight: ["400"]
})

interface CardProps { 
 title: string; 
img: string;
price: number; 
link: string
bool?: boolean
}

const Card = ({title, img,  price, link, bool}: CardProps) => {
   return (
      <div className="min-w-[416px] h-[306px] rounded-2xl overflow-hidden bg-[#07070F] flex flex-col justify-between"> 

      {bool ? (  

  <div className="min-w-[416px] h-[306px] rounded-2xl overflow-hidden bg-[#1a1a1f] animate-pulse flex flex-col justify-between">

  {/* Parte da imagem com "título" simulado */}
  <div className="relative h-[240px] m-2">
    <div className="absolute inset-0 bg-gray-700 rounded-2xl opacity-60"><div className="relative z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
    <p className={`${bebasNeue.className} text-6xl -rotate-27 `}>em construção</p>
  </div></div>
    <div className="absolute top-0 left-4 h-6 w-40 bg-gray-600 rounded-md mt-4"></div>
  </div>

<div className=""> {/* ou qualquer altura/width */}
  
</div>


  {/* Rodapé com ícone e texto fake */}
  <div className="w-full h-[56px] flex items-center px-4 gap-2">
    <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
    <div className="h-5 w-24 bg-gray-600 rounded"></div>
  </div>
</div>


      ): ( 
<Link href={link}> 


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
         </Link>
      )}

      </div>
   )
}

export default Card

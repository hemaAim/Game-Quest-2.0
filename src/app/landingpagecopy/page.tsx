"use client"
// ou o caminho correto

import {
   motion,
   useScroll,
   useSpring,
   useTransform,
   Variants,
} from "framer-motion"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import ScrollIndicator from "../component/ScrollIndicator"
import HeroSection from "../component/LandingPage/HeroSection"
import CharacterGrid from "../component/LandingPage/CharacterGrid"
import Header from "../component/LandingPage/Header"
import SectionCharacter from "../component/LandingPage/SectionCharacter"

const LandingPage = () => {
   

  
   const y = 12


   const ImgJoia = [
      { sectionId: "3", img: "/emblamaSection/imgXP.svg" },
      { sectionId: "4", img: "/emblamaSection/gemma.svg" },
      { sectionId: "5", img: "/emblamaSection/seasonEmblema.svg" },
      { sectionId: "6", img: "/emblamaSection/rankor.svg" },

   ];


   return (

      <div className="relative w-full max-h-max overflow-hidden scroll-smooth snap-y snap-mandatory">
         <Image
            src={ImgJoia[1].img}
            alt="joia"
            width={150}
            height={100}
            className="fixed bottom-4 right-10 z-50"
         />
         <Header />
         <ScrollIndicator />
         <HeroSection />


         <div id="2" className="  sticky top-0 h-screen w-full overflow-hidden grid place-items-center items-center justify-center bg-[#00000A] snap-start">


            <Image alt="" className="relative -left-9/12 -top-9" src={'/images/Exclude.svg'} width={1200} height={100} />



         </div>

         <CharacterGrid />





         <SectionCharacter
            idSection="3"
            TitleDescription="DESCRIÇÃO"
            Description="Um personagem curioso, que guia os jogadores por jornadas, missões e aprendizados."
            Functions="Representa as conquistas obtidas pelos desafios vencidos e objetivos atingidos."
            TitleFunction="FUNÇÃO"
            title="QUESTX"
            Img={"/images/questxImg.svg"} y={y}
            NextIdSection="4 "
            reverse={false} />

         <SectionCharacter
            idSection="4"
            TitleDescription="DESCRIÇÃO"
            Description="Ela é estratégica e calculista, ajuda os jogadores a entenderem o valor das conquistas e como usar suas gemas."
            Functions="Representa as gemas/moeda virtual, o que garante  alcançar novos ares"
            TitleFunction="FUNÇÃO"
            title="GEMM"
            Img={"/images/gemmSvg.svg"} y={y}
            NextIdSection="4 "
            reverse={true} />

         <SectionCharacter
            idSection="5"
            TitleDescription="DESCRIÇÃO"
            Description="Um personagem camaleão que muda de visual e poderes conforme cada nova temporada, guardião dos marcos e conquistas temporais."
            Functions="Representa as temporadas do jogo/curso"
            TitleFunction="FUNÇÃO"
            title=" SEASON"
            Img={"/images/SEASON.svg"} y={y}
            NextIdSection="4 "
            reverse={false} />




         <SectionCharacter
            idSection="6"
            TitleDescription="DESCRIÇÃO"
            Description="Competitivo, adora mostrar a evolução dos jogadores. Sempre alerta ao progresso e aos placares."
            Functions="Representa os níveis e rankings."
            TitleFunction="FUNÇÃO"
            title="  RANKOR"
            Img={"/images/RANKOR.svg"} y={y}
            NextIdSection="4 "
            reverse={true} />
         {/* Seção adicional com conteúdo */}
         <motion.section


            id="3" className="flex  w-screen h-[100vh] overflow-hidden items-center justify-center bg-[#00000A] snap-start">


            <Image alt="" src={'/images/logofinal.svg'} width={1200} height={400} />

         </motion.section>
      </div>
   )
}

export default LandingPage





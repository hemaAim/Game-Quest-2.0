"use client"



import { Karantina, Protest_Strike, Poppins } from 'next/font/google'
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"


interface CharacterProps {
  title: string,
  Description: string,
  TitleDescription: string,
  TitleFunction: string,
  Functions: string
  Img: string,
  idSection: string
  
  NextIdSection: string
  reverse?: boolean
}

const poppoins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})
const karantina = Karantina({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

const protest_Strike = Protest_Strike({
  subsets: ['latin'],
  weight: ['400']
})
const SectionCharacter = ({
  title, Description, Img,
  TitleFunction, TitleDescription,
  Functions, idSection, NextIdSection, reverse
}: CharacterProps) => {

  const ref = useRef<HTMLDivElement>(null)

  // Captura a rolagem desta seção
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // início da seção ao fundo da tela até fim da seção no topo da tela
  })

  // Parallax no texto e na imagem
  const imageY = useTransform(scrollYProgress, [0, 1], ["600px", "-600px"])


  const textRtoLX = useTransform(scrollYProgress, [0, 1], ["-600px", "600px"]) // vem da direita
  const textLtoRX = useTransform(scrollYProgress, [0, 1], ["500px", "-500px"]) // vem da direita
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <section
      id={idSection}
      ref={ref}
      className=" snap-center flex w-screen h-[100vh] overflow-hidden items-center justify-center -z-1 bg-[#00000A]">
      <div className={`flex w-full h-full items-center gap-10 ${reverse ? "flex-row-reverse" : "flex-row"}`}>


        {/* Imagem com efeito parallax */}
        <motion.div
          className="flex flex-1 w-full justify-center items-end text-white text-2xl font-bold h-full p-0 m-2 relative overflow-hidden cursor-pointer"
          style={{ y: imageY }}
          animate={{

          }}
        >
          <motion.img
            src={Img}
            alt=""
            className={`absolute w-full ${reverse ? '-left-2/12' : "-left-2/12"}  min-h-screen h-full object-cover `}
            initial={{ x: 100, opacity: 1 }}
            style={{ opacity }}
            animate={{
              scale: 1,
            }}
          />
        </motion.div>

        {/* Texto com entrada animada e leve movimento com scroll */}
        <div className="flex-1 flex flex-col justify-center max-w-7xl   mx-20">
        <div className={`flex  flex-col min-w-xl   ${reverse ? 'items-start' : "items-end"}`}>
            <motion.p
              className={`${karantina.className} text-[15rem]   font-bold leading-none text-white mb-4 mt-2 items-start`}

              style={{ x: reverse ? textLtoRX : textRtoLX, opacity }}
            >
              {title}
            </motion.p></div>

          <motion.div className="mt-6 text-white flex flex-col gap-12">
            <div className={`flex  flex-col min-w-xl  ${reverse ? 'items-start' : "items-end"} `}>
              <motion.h2
                className={`${protest_Strike.className} text-4xl font-bold leading-none text-white`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7, }}
              >
                {TitleDescription}
              </motion.h2>

              <motion.p
                className={`${poppoins.className} text-lg font-normal uppercase ${reverse ? 'text-left': 'text-right'}  leading-none text-gray-300 mb-4 mt-2 max-w-xl w-full`}

                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7, }}
              >
                {Description}
              </motion.p>
            </div>


            <div className={`flex  flex-col min-w-xl  ${reverse ? 'items-start' : "items-end"} `}>
              <motion.h2
                className={`${protest_Strike.className} text-4xl font-bold leading-none text-white`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7, }}
              >
                {TitleFunction}
              </motion.h2>

              <motion.p
                className={`${poppoins.className} text-lg font-normal uppercase ${reverse ? 'text-left': 'text-right'}  leading-none text-gray-300 mb-4 mt-2 max-w-xl w-full`}

                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7, }}
              >
                {Functions}
              </motion.p>

            </div>

          </motion.div>

        </div>



      </div>
      <div className="w-10 h-10 absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-300 z-40 rounded-full">
        <motion.button>
          {NextIdSection}
        </motion.button>
      </div>

    </section>
  )
}

export default SectionCharacter

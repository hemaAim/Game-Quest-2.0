"use client"
import { motion } from "framer-motion"
import { useState } from "react"

type Character = {
   name: string
   image: string
   id: number
}

const characters: Character[] = [
   { name: "QUESTX", image: "/images/1.svg", id: 3 },
   { name: "SEASON", image: "/images/rectangle7.svg", id: 4 },
   { name: "GEMM", image: "/images/rectangle8.svg", id: 5 },
   { name: "RANKOR", image: "/images/rectangle9.svg", id: 6 },
]

const CharacterGrid = () => {
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
   const [, setSelectedCharacter] = useState<string | null>(null)

   return (
      <section className=" snap-center flex w-screen h-[100vh] overflow-hidden items-center justify-center -z-1 bg-[#00000A]">
         {characters.map((char, index) => (
            <motion.div
               initial={{ opacity: 0, scale: 0 }}
               key={char.name}
               className="flex flex-1 gap-5 justify-center items-end text-white text-2xl font-bold h-full p-0 m-2 relative overflow-hidden cursor-pointer"
               onMouseEnter={() => setHoveredIndex(index)}
               onMouseLeave={() => setHoveredIndex(null)}
               onClick={() => {
                  setSelectedCharacter(char.name)
                  const targetSection = document.getElementById(String(char.id))
                  targetSection?.scrollIntoView({ behavior: "smooth" })
               }}
               animate={{
                  scale: 1.3,
                  opacity: hoveredIndex === null ? 1 : hoveredIndex === index ? 1 : 0.6,
                  rotate: 15,
               }}
               transition={{
                  duration: 0.4,
                  scale: { type: "spring", bounce: 0.5 },
               }}
            >
               <motion.img
                  src={char.image}
                  alt={char.name}
                  className="absolute w-4/5 h-full object-cover -z-10"
               />
               <motion.h2 className="absolute top-1/2 left-[40%] skew-y-[-15deg]">
                  {char.name}
               </motion.h2>
            </motion.div>
         ))}
      </section>
   )
}

export default CharacterGrid

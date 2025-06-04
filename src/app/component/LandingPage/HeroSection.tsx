"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '70%'])

  return (
    <section
      ref={ref}
      className="snap-start  sticky top-0 h-screen w-full overflow-hidden grid place-items-center bg-[#00000A]"
    >
      <motion.div
        style={{ y: textY }}
        className="font-bold text-white text-9xl relative mt-20 z-10"
      >
        <Image alt="Logo" src="/images/logo.svg" width={1900} height={300} />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `url(/images/bg1fundo.svg)`,
          backgroundPosition: "center",
          backgroundPositionY: "start",
          backgroundSize: "cover",
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(/images/bg1frente.svg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100vw"
        }}
      />   


    </section>
  )
}

export default HeroSection

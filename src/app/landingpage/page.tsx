"use client"

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef } from "react"

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function Image({ id }: { id: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 200)

  return (
    <section className="h-screen snap-start flex justify-center items-center relative">
      <div ref={ref} className="w-[300px] h-[400px] m-5 bg-gray-100 overflow-hidden sm:w-[150px] sm:h-[200px]">
        <img
          src={`/photos/cityscape/${id}.jpg`}
          alt={`Cityscape ${id}`}
          className="w-full h-full object-cover"
        />
      </div>
      <motion.h2
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
        className="text-[#8df0cc] m-0 font-mono text-[50px] font-bold tracking-[-0.15em] leading-[1.2] absolute top-1/2 left-[calc(50%+120px)] -translate-y-1/2"
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  )
}

export default function Parallax() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div id="example" className="scroll-snap-y snap-mandatory">
      {[1, 2, 3, 4, 5].map((image) => (
        <Image key={image} id={image} />
      ))}
      <motion.div
        className="fixed left-0 right-0 h-[5px] bg-[#8df0cc] bottom-[50px] origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}

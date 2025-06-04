import Image from "next/image"


interface GemaProps {

   Size: number 
   Img: string
}

const Gema = ({ Size, Img }: GemaProps) => {
   return (
      <Image alt="" src={`/Dashboard/${Img}`} width={Size} height={Size} />
   )
}


export default Gema
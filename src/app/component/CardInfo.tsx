import Gema from "./Gema";


type CardDetalheAulaProp = {

   curso: string;
   tempodaAtividade: number;
   pontuacao: number;
   multiplicador: number;


}

export default function CardDetalheMissao({ curso, tempodaAtividade, pontuacao, multiplicador }: CardDetalheAulaProp) {


   return (
      <div className="relative max-w-4xl min-w-4xl w-full mt-50 p-1 grid grid-cols-4 gap-4 border-1 bg-[#00000A]/50 border-orange-500/30 rounded-lg">

         <div className="p-2 flex items-center justify-between flex-col  border-r-1 border-blue-300">

            <p className="font-semibold text-sm   text-gray-200">Multiplicador</p>
            <p className="text-gray-500 text-xs font-bold flex gap-1"> {multiplicador} <Gema Img="../foguete.png" Size={13} /></p>
         </div>



         <div className="p-2 flex items-center justify-between flex-col  border-r-1 border-blue-300">

            <p className="font-semibold text-sm  text-gray-200">Tipo</p>
            <p className="text-gray-500 text-xs font-bold">{curso}</p>
         </div>


         <div className="p-2 flex items-center justify-between flex-col  border-r-1 border-blue-300">

            <p className="font-semibold text-sm text-gray-200">Pontuação </p>
            <p className="text-gray-500 text-sm font-bold flex gap-1">{pontuacao} <Gema Img="/ESTRELAPONTOS.svg" Size={19} /></p>
         </div>


         <div className="p-2 flex items-center gap-2  justify-between flex-col ">
            <p className="font-semibold text-sm text-gray-200">Duração</p>
            <p className="text-gray-500 text-xs font-bold">{tempodaAtividade} m</p>
         </div>




      </div>
   )

}
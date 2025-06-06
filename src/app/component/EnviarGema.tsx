/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Gema from "./Gema";

interface EnviarGemaProps {

   alunoSelecionado: any,
   setAlunoSelecionado: any,
   valorTransferencia: any,
   setValorTransferencia: any,
   handleTransferencia: any
}

const EnviarGemaModal = ({
   alunoSelecionado,

   valorTransferencia,
   setValorTransferencia,
   setAlunoSelecionado,
   handleTransferencia,
}: EnviarGemaProps) => {

   const predefinedValues = [20, 30, 40, 50, 60];

   if (!alunoSelecionado) return null;


   const handlePredefinedClick = (value: number) => {
      setValorTransferencia(value);
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-30">
         <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-[#07070F] rounded-lg shadow  sm:p-5">
               <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-2xl font-medium text-white flex gap-3">
                     Enviar GEma <Gema Img="/Gema.svg" Size={16} />
                  </h3>
                  <button
                     type="button"
                     onClick={() => setAlunoSelecionado(null)}
                     className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white w-12 h-10"
                  >
                     <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fillRule="evenodd"
                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                           clipRule="evenodd"
                        ></path>
                     </svg>
                  </button>
               </div>
               <form onSubmit={(event) => {
                  event.preventDefault(); // Impede o recarregamento da página
                  console.log("Formulário enviado!");
               }} >
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                     {[
                        { label: "Nome", field: "Nome do Aluno" },
                        { label: "Série WIT", field: "Turma do WIT" },
                        { label: "pontos", field: "XP", suffix: "⭐" },
                        { label: "gema", field: "Bitcoin", suffix: <Gema Img="Gema.svg" Size={12} /> },
                     ].map(({ label, field, suffix = "" }) => (
                        <div key={field}>
                           <label className=" mb-2 text-base font-medium text-gray-400 flex ">
                              {label}
                           </label>
                           <p className="text-white flex flex-row  items-center gap-2">
                              {suffix} {alunoSelecionado.fields.find((f: any) => f.name === field)?.value || "-"}
                           </p>
                        </div>
                     ))}
                  </div>

                  <div className="flex flex-col gap-8 items-end">

                     <div className="w-full">
                        <label className="block mb-2 text-sm font-medium  text-white">
                           Insira o valor a transferir:
                        </label>
                        <input
                           type="text"
                           value={valorTransferencia}
                           onChange={(e) => {
                              const onlyNumbers = e.target.value.replace(/\D/g, ""); // remove não-dígitos
                              const asCents = (parseInt(onlyNumbers || "0", 10) / 100).toFixed(2); // transforma em decimal fixo
                              setValorTransferencia(asCents); // salva como string ou número, como preferir
                           }}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Digite o valor (ex: 1 = R$0,01)"
                        />
                     </div>
                     <div className="grid grid-cols-9 w-full items-center gap-2 my-1 ">
                        <div className="w-full h-[1px] col-span-4 bg-gray-800"></div>
                        <div className="text-center col-span-1 text-sm text-gray-400">ou</div>
                        <div className="w-full h-[1px] col-span-4 bg-gray-800"></div>
                     </div>
                     <div className="flex flex-row w-full justify-between items-center px-4">      {predefinedValues.map((val) => (
                        <button
                           type="button"
                           key={val}
                           onClick={() => handlePredefinedClick(val)}
                           className="border-1 border-[#710ACB] px-3 rounded-lg py-2 text-white font-semibold flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-gray-900/50 hover:ring-1"

                        >
                           <Gema Img="Gema.svg" Size={12} /> {val.toFixed(2)}
                        </button>
                     ))}</div>


                     <button
                        onClick={() => { handleTransferencia() }}
                        className="mt-4 px-6 py-3 bg-[#FF6F00] text-white rounded-xl  w-fit hover:bg-orange-700 cursor-pointer"
                     >
                        Transferir
                     </button>
                  </div>

               </form>

            </div>
         </div>
      </div>
   );
};

export default EnviarGemaModal;

import React from 'react';

interface Desafio {
   Titulo: string;
   pontos: number;
   multiplicador: number;
   descricao: string;
   Exigência_1?: string;
   Exigência_2?: string;
   Exigência_3?: string;
   Exigência_4?: string;
}

interface DesafioModalProps {
   desafioSelecionado: Desafio;
   isOpen: boolean;
   onClose: () => void;
}

const DesafioModal: React.FC<DesafioModalProps> = ({
   desafioSelecionado,
   isOpen,
   onClose,
}) => {
   if (!isOpen) return null;

   const exigencias = [
      desafioSelecionado.Exigência_1,
      desafioSelecionado.Exigência_2,
      desafioSelecionado.Exigência_3,
      desafioSelecionado.Exigência_4,
   ].filter(Boolean);

   const valorPorExigencia =
      exigencias.length > 0
         ? desafioSelecionado.multiplicador / exigencias.length
         : 0;

   return (
      <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center px-4">
         <div className="bg-[#07070F] text-white rounded-xl p-6 w-full max-w-xl relative">
            {/* Botão de Fechar */}
            <button
               className="absolute top-2 right-2 text-gray-400 hover:text-white"
               onClick={onClose}
            >
               ✕
            </button>

            {/* Título e Multiplicador */}
            <h2 className="text-xl font-bold text-white uppercase text-center">
               {desafioSelecionado.Titulo}
            </h2>
            <p className="text-yellow-400 text-center font-semibold mt-1">
               {desafioSelecionado.multiplicador}x 🚀
            </p>

            {/* Descrição */}
            <div className="border border-dashed border-blue-400 rounded-md p-3 text-sm text-center text-white mt-4">
               {desafioSelecionado.descricao}
            </div>

            {/* Lista de exigências */}
            <ol className="relative   ms-3.5 mt-10 mb-4 space-y-8">
               {exigencias.map((exigencia, index) => (
                  <li key={index} className="ms-8 relative">
                    
                     <div>
                        <p className="text-base italic text-gray-300 mt-2">
                           {exigencia}
                        </p>
                        <p className="text-sm font-bold text-orange-500">
                           {valorPorExigencia.toFixed(2)} pontos
                        </p>
                     </div>
                  </li>
               ))}
            </ol>

            {/* Pontuação total + botão */}
            <div className="mt-6 flex justify-between items-center">
               <span className="text-yellow-400 font-bold text-lg">
                  ⭐ {desafioSelecionado.pontos}
               </span>
               <button className="bg-orange-500 text-white text-sm px-4 py-1 rounded-md font-semibold">
                  Realizado
               </button>
            </div>
         </div>
      </div>
   );
};

export default DesafioModal;

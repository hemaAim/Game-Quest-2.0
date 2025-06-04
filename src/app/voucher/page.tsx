"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useEffect, useState } from "react";
import CupomCard from "../component/CupomCard";
import { VoucherPorAluno } from "@/services/service-Aluno";
import { useAuth } from "../context/AuthContext";
import Header from "../component/Header";
import { listarComprasDoAluno } from "@/services/service-HistoricoCompra"; // 👈 importante
import { Bebas_Neue } from "next/font/google";
import Gema from "../component/Gema";



const Bebasneue = Bebas_Neue({
   subsets: ['latin'],
   preload: true,
   weight: ["400"]
})
function VoucherPage() {
   const { aluno, user, logout } = useAuth();
   const [vouchers, setVouchers] = useState<any[]>([]);
   const [historico, setHistorico] = useState<any[]>([]); // novo estado para o histórico

   useEffect(() => {
      if (!aluno) return;

      async function fetchVouchers() {
         try {
            const resultado = await VoucherPorAluno(aluno?.id);
            setVouchers(resultado);
         } catch (error) {
            console.error("Erro ao buscar vouchers:", error);
            toast.error("Erro ao carregar os vouchers.");
         }
      }

      async function fetchHistorico() {
         try {
            const resultado = await listarComprasDoAluno(aluno?.id);
            setHistorico(resultado);
         } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            toast.error("Erro ao carregar o histórico de compras.");
         }
      }

      fetchVouchers();
      fetchHistorico(); // 👈 busca o histórico também

   }, [aluno]);

   return (
      <div className="bg-[#00000A] min-h-screen text-white font-sans">
         <Header
            StudentPhoto={user?.photoURL}
            StudentEmail={user?.email || aluno?.email || null}
            IdStudent={aluno?.id}
            StudentName={user?.displayName || aluno?.nome_do_aluno}
            turma={aluno?.turma_do_wit || "Sem Turma"}
            TextButton="Sair da Plataforma"
            handleLogout={logout}
            link={[
               { name: "Inicio", link: "/" },
               { name: "marketplace", link: "/marketplace" },
            ]}
         />

         <div className="px-4 md:px-10 py-6 max-w-7xl mx-auto">


            <h2 className="text-2xl font-bold mb-4">Vouchers</h2>
            <div className="grid grid-cols-6 gap-4 items-center justify-center">
               {vouchers.map((voucher, index) => {
                  const [dia, mes] = voucher.vencimento.split("/").map(Number);
                  const dataVencimento = new Date(new Date().getFullYear(), mes - 1, dia);
                  const hoje = new Date();
                  hoje.setHours(0, 0, 0, 0);

                  const isVencido = dataVencimento <= hoje;

                  return (
                     <CupomCard
                        key={index}
                        titulo={voucher.title}
                        preco={voucher.preco || 20.22}
                        vencimento={voucher.vencimento || "20/07"}
                        onValidar={() => console.log("Cupom validado:", voucher)}
                        corTopo="bg-orange-500"
                        sigla="GQ"
                        isVencido={isVencido}
                     />
                  );
               })}
            </div>
            <div className="mt-20">


               <h2 className="text-2xl font-bold mb-4">Histórico de Compras</h2>
               <div className="overflow-x-auto mb-10">
                  <table className="w-full text-sm text-left text-gray-400  rounded-xl overflow-hidden">
                     <thead className="uppercase border-b border-gray-800 text-gray-100">
                        <tr>
                           <th className="px-6 py-3">item</th>
                           <th className="px-6 py-3">Gemas</th>
                           <th className="px-6 py-3">Data</th>
                        </tr>
                     </thead>
                     <tbody>
                        {historico.map((compra) => (
                           <tr key={compra.id} className={`${Bebasneue.className} border-b border-gray-700 hover:bg-[#222] transition`}>
                              <td className="px-6 py-4">{compra.nomeProduto}</td>
                              <td className="px-6 py-4 flex flex-row gap-2"><Gema Img="Gema.svg" Size={12} />{compra.preco}</td>
                              <td className="px-6 py-4">
                                 {compra.dataCompra?.toDate().toLocaleDateString()}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

            </div>
         </div>
      </div>
   );
}

export default VoucherPage;

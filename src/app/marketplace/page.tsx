"use client";

import { AlunoComprandoNoMarketplace } from "@/services/service-Aluno";
import PontuacoesXpsGema from "../component/Dashboard/PontuacoesXpsGema";

import Header from "../component/Header";
import VRCard from "../component/marketplace/card";
import { useAuth } from "../context/AuthContext";
import { useMarketplace } from "@/app/hooks/useMarketplace";
import { toast } from "sonner";
import { registrarCompra } from "@/services/service-HistoricoCompra";
function Marketplace() {

   const { marketplace } = useMarketplace();

   const { user, aluno, logout } = useAuth();

   async function handleComprarProduto(idProduto: number) {
      if (!aluno) return;

      try {
         const resultado = await AlunoComprandoNoMarketplace(aluno.id, idProduto);


         console.log("Resultado da compra:", resultado);

         if (resultado.some(msg => msg.includes("Saldo insuficiente 😞. Seu saldo é de") || msg.includes("você já possui este produto"))) {
            // Se a resposta indicar que o aluno já tem o produto ou não pode comprar
            toast.warning(resultado.join("\n"));
         } else {
            // Se a resposta for positiva
            toast.success("Produto Comprado, parabéns ✅✨");
            const produto = marketplace.find(p => p.id === idProduto);
            if (produto) {
               await registrarCompra({
                  alunoId: aluno.id,
                  produtoId: produto.id,
                  nomeProduto: produto.Titulo,
                  preco: produto.Price,
               });
            }

         }
      } catch (error) {
         console.error("Erro ao comprar o produto:", error);
         toast.error("Erro ao processar a compra.");
      }
   }
   return (
      <div className="bg-[#00000A] min-h-screen text-white font-sans w-screen flex flex-col items-center">

         <Header
            StudentEmail={user?.email || aluno?.email || null}
            StudentPhoto={user?.photoURL || "/default-user.png"}
            IdStudent={aluno?.id} // ou buscar esse ID de outro lugar, como do contexto de aluno
            StudentName={user?.displayName || aluno?.nome_do_aluno}
            turma={aluno?.turma_do_wit}
            TextButton="Sair da Plataforma"
            handleLogout={logout}
            link={[
               { name: "Inicio", link: "/" },
               { name: "Sobre", link: "/sobre" },
               { name: "Voucher", link: "/voucher" },
            ]}
         />

         <main className="w-full px-4 md:px-10 py-6 max-w-7xl">
            <div className={` flex justify-between `}>
               <PontuacoesXpsGema sizeImg={35} Bool={true} img="XpLogo.svg" title="XP's" value={aluno?.xp ?? 0} />
               <PontuacoesXpsGema sizeImg={35} Bool={true} img="ESTRELAPONTOS.svg" title="PONTOS" value={aluno?.pontos_atuais ?? 0} />
               <PontuacoesXpsGema sizeImg={22} Bool={false} img="Gema.svg" title="GEMAS" value={aluno?.bitcoin ?? 0} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
               MARKETPLACE </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">

               {marketplace.map((marketplace) => (
                  <div key={marketplace.id} className="flex items-center justify-center">

                     <VRCard img="SVGoculosVr.svg" vencimento={marketplace.vencimento} price={marketplace.Price} time={marketplace.TempoDeEntrega} title={marketplace.Titulo} onClick={() => handleComprarProduto(marketplace.id)} />
                  </div>
               ))}

            </div>
         </main>
      </div>
   )
}
export default Marketplace
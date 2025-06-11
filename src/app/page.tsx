"use client"

import { useEffect, useState } from "react";

import { auth } from "../firabase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { TemporadaELiga } from "@/app/types/TemporadaELiga"
import Card from "./component/Dashboard/Card";
import TemporadaCard from "./component/Dashboard/TemporadaCard";
import PontuacoesXpsGema from "./component/Dashboard/PontuacoesXpsGema";
import MissaoCard from "./component/Dashboard/MissaoCard";
import { useDesafios } from "@/app/hooks/useDesafios";

import ListaTurmaDoAlunoLogado from "./component/ListaTurmaDoAluno";
import Header from "./component/Header";
import { Desafio } from "./types/Desafios";

import PegandoDadosDaTemporada from "../services/service-Temporada"
import { useTemporadaELiga } from "./hooks/useTemporadaELiga";
import { useAuth } from "./context/AuthContext";
export default function Home() {



  const [, setDesafioSelecionado] = useState<Desafio | null>(null);
  const [, setTemporadas] = useState<TemporadaELiga[]>([]);
  const { desafios } = useDesafios(334266439);

  const { temporadaELiga, erro } = useTemporadaELiga();


  const { user, aluno, loading } = useAuth();
  const router = useRouter();



  useEffect(() => {
    const carregarTemporada = async () => {
      //  console.log("Iniciando o carregamento da temporada...");
      try {
        const temporadaAtiva = await PegandoDadosDaTemporada();
        setTemporadas(temporadaAtiva ? [temporadaAtiva] : []);


        //console.log("Dados da temporada recebidos:", temporadasArray);

      } catch (error) {
        console.error("Erro ao carregar a temporada:", error);
      }
    };

    carregarTemporada();
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (erro) {
      console.error("Erro ao deslogar o usuário:", erro);
    }
  };

  // Renderização condicional no JSX



  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div className="bg-[#00000A] min-h-screen text-white font-sans">
      <Header StudentPhoto={user?.photoURL} StudentEmail={user?.email || aluno?.email || null} IdStudent={aluno?.id} StudentName={user?.displayName || aluno?.nome_do_aluno} turma={aluno?.turma_do_wit || "Sem Turma"} TextButton="Sair da Plataforma" handleLogout={handleLogout} link={[
        { name: "Inicio", link: "/" },
        { name: "Sobre", link: "/sobre" },
      ]} />

      <div className="flex flex-col w-full items-center">
        <main className="w-full px-4 md:px-10 py-6 max-w-7xl">
          <div className={` flex justify-between `}>
            <PontuacoesXpsGema sizeImg={35} Bool={true} img="XpLogo.svg" title="XP's" value={aluno?.xp ?? 0} />
            <PontuacoesXpsGema sizeImg={35} Bool={true} img="ESTRELAPONTOS.svg" title="PONTOS" value={aluno?.pontos_atuais ?? 0} />
            <PontuacoesXpsGema sizeImg={22} Bool={false} img="Gema.svg" title="GEMAS" value={aluno?.bitcoin ?? 0} />
          </div>


          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
            BEM VINDO, {user?.displayName?.toUpperCase() || aluno?.nome_do_aluno?.toUpperCase()}
          </h1>


          {/* Cards Temporada e Sorteio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="md:col-span-2">

              <div className="md:col-span-2">
                {temporadaELiga && (
                  <TemporadaCard
                    Description={temporadaELiga?.descricao || ""}
                    Links={"/temporada"}
                    Recompense={`${temporadaELiga?.quantidade_de_criptons_fixos} `}
                    Title={temporadaELiga?.nome_da_temporada || ""}
                  />
                )}


              </div>
            </div>
            <div className="md:col-span-1">
              <Card img="../imgSorteio.svg" price={30} title="Quizz" link="/quizz" bool={false} />
            </div>
          </div>

          {/* Missões e Marketplace */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="md:col-span-2">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">MISSÕES 🚀</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {desafios.map((desafio) => (
                    <MissaoCard key={desafio.id} description={desafio.descricao} mitlicador={desafio.multiplicador} idToURL={desafio.id} spanTimeBool="" time={desafio.tempo_da_atividade} BorderPosition="" gems={desafio.pontos} imageSrc="/Dashboard/ImgSorteio.svg" onClick={() => setDesafioSelecionado(desafio)} progress="" title={desafio.Titulo} vencimento="10/20" />
                  ))} </div>



              </section>
            </div>
            <div className="md:col-span-1">
              <Card img="marketplace.svg" price={30} title="MARKETPLACE" link="/marketplace" />
            </div>
          </div>

          {/* Listagens de usuários e turma */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">


            <div className="md:col-span-5">
              <ListaTurmaDoAlunoLogado turma={aluno?.turma_do_wit} title={aluno?.turma_do_wit} email={aluno?.email} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

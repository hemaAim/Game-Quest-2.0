
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useQuiz } from "@/app/context/QuizContext";

import Header from "../component/Header";
import PontuacoesXpsGema from "../component/Dashboard/PontuacoesXpsGema";
import QuizCard from "./QuizCard";
import { codeAuth } from "../context/CodeContext";



export default function QuizClientWrapper({ quiz }: { quiz: any,  }) {
  const { user, aluno, logout } = useAuth(); 

  const {code} = codeAuth()
  const {quizPin} = useQuiz() 


  

 
  return (
    <div className="font-sans">
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
          { name: "Sobre", link: "/sobre" },
        ]}
      />

      <div className="flex flex-col w-full items-center">
        <main className="w-full px-4 md:px-10 py-6 max-w-7xl">
          <div className={`flex justify-between`}>
            <PontuacoesXpsGema
              sizeImg={35}
              Bool={true}
              img="XpLogo.svg"
              title="XP's"
              value={aluno?.xp ?? 0}
            />
            <PontuacoesXpsGema
              sizeImg={35}
              Bool={true}
              img="ESTRELAPONTOS.svg"
              title="PONTOS"
              value={aluno?.pontos_atuais ?? 0}
            />
            <PontuacoesXpsGema
              sizeImg={22}
              Bool={false}
              img="Gema.svg"
              title="GEMAS"
              value={aluno?.bitcoin ?? 0}
            />
          </div>
        </main>
   
    {quizPin && code  ? (
  <QuizCard
    remainingQuestions={21}
    title={"Quizz"}
    totalQuestions={1}
    codeId={code}
    url={quizPin}
  />
) : (
  <p className="text-white">Nenhum PIN disponível.</p>
)}

      </div>

    
    </div>
  );
}

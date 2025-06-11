"use client";

import RequireAdmin from "@/app/component/RequireAdmin";
import Header from "../../component/Header";
import { useAuth } from "../../context/AuthContext";

import { useState } from "react";

import { useQuiz } from "@/app/context/QuizContext";
import { CodeAuth } from "@/app/context/CodeContext";
import { toast } from "sonner";
import Confetti from 'react-confetti';
export default function AdminPageQuiz() {
  const { user, aluno, logout } = useAuth();
  const { setQuizPin } = useQuiz();
  const [quizId, setQuizId] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const { code } = CodeAuth(); // <-- pegando função

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizPin(quizId);
    toast.info(`Quiz adicionado com sucesso`)
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 7000);
    console.log("Quiz ID enviado:", quizId);
  };


  return (
    <RequireAdmin>
      <div className="flex flex-col items-center p-4 font-sans">
        <Header
          StudentEmail={user?.email || aluno?.email || null}
          StudentPhoto={user?.photoURL}
          IdStudent={aluno?.id}
          StudentName={user?.displayName || aluno?.nome_do_aluno}
          turma={aluno?.turma_do_wit}
          TextButton="Sair da Plataforma"
          handleLogout={logout}
          link={[
            { name: "Inicio", link: "/" },
            { name: "Sobre", link: "/sobre" },
          ]}
        />

        <div className="max-w-7xl w-full flex justify-center items-center flex-col mt-8">
          <form className="flex flex-col gap-4 w-full max-w-md">
            <div className="min-h-screen flex items-center justify-center ">
              <div className="bg-white p-6 rounded shadow-lg w-[300px]">
                <div className="mb-4">
                  {showConfetti && <Confetti />}





                  <button
                    onClick={() => {
                      const novo = Math.floor(10000 + Math.random() * 90000).toString();
                      localStorage.setItem("codigo-temporario", novo);
                      alert("Código salvo: " + novo);
                      toast.info(`o novo codigo é: ${novo}`)
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded m-3"
                  >
                    Salvar código temporário
                  </button>
                  {code && (<p className="text-center text-gray-700 text-lg">
                    Código da turma: <strong>{code}</strong>
                  </p>)}
                  <input
                    type="text"
                    placeholder="PIN do jogo"
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                    className="w-full border border-gray-300 text-gray-500 text-center text-lg py-2 rounded shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-2 text-lg rounded hover:bg-gray-800 transition"
                >
                  Inserir
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </RequireAdmin>
  );
}

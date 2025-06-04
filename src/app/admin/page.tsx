"use client";

import RequireAdmin from "@/app/component/RequireAdmin";
import Header from "../component/Header";
import { useAuth } from "../context/AuthContext";

import { useState } from "react";
import ListaTurmaDoAlunoADM from "../component/ListaAlunoADM";

export default function AdminPage() {
  const { user, aluno, logout } = useAuth();
  const [valor, setValor] = useState("");

  return (
    <RequireAdmin>
      <div className="flex flex-col items-center p-4 font-sans">
        <Header
          StudentEmail={user?.email || aluno?.email || null}
          StudentPhoto={user?.photoURL || "/default-user.png"}
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

        <div className="max-w-7xl w-full flex justify-center items-center flex-col">
          <select
            id="turma"
            name="turma"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full max-w-md mt-4 border border-gray-300 rounded-md px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione a turma</option>
            <option value="MVM2110">MVM2110</option>
            <option value="MVM2210">MVM2210</option>
            <option value="MVM3113">MVM3113</option>
            <option value="MVM3213">MVM3213</option>
            <option value="MVM4111">MVM4111</option>
            <option value="MVM4211">MVM4211</option>
            <option value="MVM5115">MVM5115</option>
            <option value="MVM5215">MVM5215</option>
            <option value="MVM6114">MVM6114</option>
            <option value="MVM6214">MVM6214</option>
          </select>

          {valor && (
            <div className="md:col-span-2 mt-6 w-full">
              <ListaTurmaDoAlunoADM turma={valor} />
            </div>


          )}
        </div>

      </div>
    </RequireAdmin>
  );
}

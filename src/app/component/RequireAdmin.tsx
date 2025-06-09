"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { aluno, loading } = useAuth();
  const router = useRouter();

useEffect(() => {
  console.log("loading:", loading);
  console.log("aluno:", aluno);

  if (!loading && aluno && aluno.role !== "ADM") {
    console.log("Redirecionando para /unauthorized");
    router.replace("/unauthorized");
  }
}, [aluno, loading, router]);

  // Enquanto carrega ou ainda não sabemos se é ADM, mostra tela de carregamento
  if (loading || !aluno) {
    return <p className="text-white">Verificando permissões...</p>;
  }

  if (aluno.role !== "ADM") {
    return null; // previne renderização se o redirecionamento ainda não foi feito
  }

  return <>{children}</>;
}

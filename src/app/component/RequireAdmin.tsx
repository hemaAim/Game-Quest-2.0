"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { aluno, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && aluno?.role !== "ADM") {
      router.push("/"); // volta para Home se não for admin
    }
  }, [aluno, loading, router]);

  if (loading || aluno?.role !== "ADM") {
    return <p className="text-white">Verificando permissões...</p>;
  }

  return <>{children}</>;
}

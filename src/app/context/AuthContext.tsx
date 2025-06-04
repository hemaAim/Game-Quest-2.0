// src/components/AuthProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/firabase.config";
import { useRouter } from "next/navigation";
import { AlunoLoginAutenticacao } from "@/services/service-Aluno";
import { Aluno } from "@/app/types/Aluno";

interface AuthContextType {
  user: User | null;
  aluno: Aluno | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  aluno: null,
  loading: true,
  logout: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        setUser(firebaseUser);
        try {
          const alunoData = await AlunoLoginAutenticacao(firebaseUser.email);
          setAluno(alunoData); 

          
        // Redirecionar para admin se for ADM
        if (alunoData?.role === "ADM") {
          router.push("/admin");
          return;
        }
        } catch (error) {
          console.error("Erro ao buscar aluno:", error);
        } finally {
          setLoading(false);
        }
      } else {
        const publicRoutes = ["/login", "/cadastro"];
        const path = window.location.pathname;

        if (!publicRoutes.includes(path)) {
          router.push("/login");
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setAluno(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, aluno, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

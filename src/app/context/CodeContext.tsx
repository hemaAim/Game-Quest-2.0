"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface CodeContextType {
  code: string | null;
}

const CodeContext = createContext<CodeContextType>({
  code: null,
});

export const CodeProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState<string | null>(null);

  function gerarCodigoAleatorio(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  useEffect(() => {
    // Verifica se já existe um código no localStorage
    const codigoExistente = localStorage.getItem("codigo-temporario");

    if (codigoExistente) {
      setCode(codigoExistente);
    } else {
      const novoCodigo = gerarCodigoAleatorio();
      setCode(novoCodigo);
      localStorage.setItem("codigo-temporario", novoCodigo);

      // Expiração em 5 minutos
      const tempoExpiracao = 5 * 60 * 1000;
      setTimeout(() => {
        localStorage.removeItem("codigo-temporario");
      }, tempoExpiracao);
    }
  }, []);

  return (
    <CodeContext.Provider value={{ code }}>
      {children}
    </CodeContext.Provider>
  );
};

export const CodeAuth = () => useContext(CodeContext);

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
  gerarNovoCodigo: () => void; // <-- NOVO
}

const CodeContext = createContext<CodeContextType>({
  code: null,
  gerarNovoCodigo: () => {},
});

export const CodeProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState<string | null>(null);

  function gerarCodigoAleatorio(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  const gerarNovoCodigo = () => {
    const novoCodigo = gerarCodigoAleatorio();
    setCode(novoCodigo);
    localStorage.setItem("codigo-temporario", novoCodigo);

    // Expiração em 5 minutos
    const tempoExpiracao = 1 * 60 * 10;
    setTimeout(() => {
      localStorage.removeItem("codigo-temporario");
    }, tempoExpiracao);
  };

  useEffect(() => {
    const codigoExistente = localStorage.getItem("codigo-temporario");
    if (codigoExistente) {
      setCode(codigoExistente);
    } else {
      gerarNovoCodigo();
    }
  }, []);

  return (
    <CodeContext.Provider value={{ code, gerarNovoCodigo }}>
      {children}
    </CodeContext.Provider>
  );
};

export const CodeAuth = () => useContext(CodeContext);

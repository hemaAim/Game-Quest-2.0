"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface CodeContextType {
  code: string | null;
  gerarNovoCodigo: () => void;
}

const CodeContext = createContext<CodeContextType>({
  code: null,
  gerarNovoCodigo: () => {},
});

export const CodeProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState<string | null>(null);

  const gerarCodigoAleatorio = useCallback((): string => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }, []);

  const gerarNovoCodigo = useCallback(() => {
    const novoCodigo = gerarCodigoAleatorio();
    setCode(novoCodigo);
    localStorage.setItem("codigo-temporario", novoCodigo);

    // Expiração em 10 minutos
    const tempoExpiracao = 60 * 10 * 1000;
    setTimeout(() => {
      localStorage.removeItem("codigo-temporario");
    }, tempoExpiracao);
  }, [gerarCodigoAleatorio]);

  useEffect(() => {
    const codigoExistente = localStorage.getItem("codigo-temporario");
    if (codigoExistente) {
      setCode(codigoExistente);
    } else {
      gerarNovoCodigo();
    }
  }, [gerarNovoCodigo]);

  return (
    <CodeContext.Provider value={{ code, gerarNovoCodigo }}>
      {children}
    </CodeContext.Provider>
  );
};

export const CodeAuth = () => useContext(CodeContext);

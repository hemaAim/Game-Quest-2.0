import { useState, useEffect } from "react";
import PegandoDadosDaTemporada from "@/services/service-Temporada";
import { TemporadaELiga } from "@/app/types/TemporadaELiga";

export function useTemporadaELiga() {
  const [temporadaELiga, setTemporadaELiga] = useState<TemporadaELiga | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarTemporadaELiga() {
      try {
        const data = await PegandoDadosDaTemporada();
        setTemporadaELiga(data);
      } catch (error: any) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    carregarTemporadaELiga();
  }, []);

  

  

  return { temporadaELiga, loading, erro };
}

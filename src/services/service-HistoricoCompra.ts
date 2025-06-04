
import { collection, addDoc, Timestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firabase.config";

type Compra = {
   alunoId: string;
   produtoId: number;
   nomeProduto: string;
   preco: number;
};

export async function registrarCompra({ alunoId, produtoId, nomeProduto, preco }: Compra) {
   try {
      const docRef = await addDoc(collection(db, "historicoCompras"), {
         alunoId,
         produtoId,
         nomeProduto,
         preco,
         dataCompra: Timestamp.now(),
      });

      return {
         sucesso: true,
         id: docRef.id,
      };
   } catch (error) {
      console.error("Erro ao registrar a compra:", error);
      return {
         sucesso: false,
         mensagens: ["Erro ao registrar a compra."],
      };
   }
}

export async function listarComprasDoAluno(alunoId: string) {
  try {
    const historicoRef = collection(db, "historicoCompras");
    const q = query(historicoRef, where("alunoId", "==", alunoId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    return [];
  }
}
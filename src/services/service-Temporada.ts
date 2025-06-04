
import { Desafio } from "@/app/types/Desafios";
import { TemporadaELiga } from "@/app/types/TemporadaELiga"

 const PIPEFY_API_URL = "https://api.pipefy.com/graphql";
  const PIPEFY_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3Mzk4MTY4MDcsImp0aSI6Ijk3ODFhYmRjLThhMDItNDU2Ni05MzBjLTE0Mzk2MzQwNWVkZiIsInN1YiI6MzAyNDA2NzU2LCJ1c2VyIjp7ImlkIjozMDI0MDY3NTYsImVtYWlsIjoiYWltaGVtYTc3QGdtYWlsLmNvbSJ9fQ.6l60GT46e8hU6Alzvg9-x0vSsbraVpp3a1NulAk8JcZs-9N4vN8iFQYxQZgB6wtfV0U184_Mr6oUb_JKYjX3pw"
  const PIPE_ID = 334522537; // Converte para número

export default async function PegandoDadosDaTemporada() {
 
  const query = `
    {
      phase(id: ${PIPE_ID}) {
        id
        name
        cards {
          edges {
            node {
              id
              title 
               fields {
            name
            value
          }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

    const data = await response.json();

    return data.data.phase.cards.edges
      .map((edge: any) => {
        const fields = edge.node.fields.reduce((acc: any, field: any) => {
          acc[field.name.trim()] = field.value;
          return acc;
        }, {});

        return {
          id: edge.node.id,
          nome_da_temporada: fields["Nome da Temporada"] || "Sem Título",
          descricao: fields["Descrição"] || "Sem descrição",
          data_de_inicio: fields["Data de Início"] || "",
          termino: fields["Termino"] || "",
          status: fields["Status"] || "Indefinido",
          quantidade_de_desafios_na_temporada: Number(fields["Quantidade de Desafios na Temporada"] || 0),
          desafios_da_temporada: fields["Desafios da Temporada"] ? fields["Desafios da Temporada"].split(",") : [],
          alunos_participantes: fields["Alunos Participantes"] ? fields["Alunos Participantes"].split(",") : [],
          alunos_no_top_03: fields["Alunos no Top 03"] ? fields["Alunos no Top 03"].split(",") : [],
          xp_necessario_para_premiacao: Number(fields["XP Necessário para Premiação"] || 0),
          quantidade_de_criptons_fixos: Number(fields["Quantidade de Criptons Fixos"] || 0),
          quantidade_de_criptons_para_o_top_3: Number(fields["Quantidade de Criptons para o Top 3"] || 0),
          temporada_ativada: Number(fields["Temporada ativada?"] || 0),
        };
      })
      .filter((temporada: any) => temporada.temporada_ativada === 1)[0]; // Pega a primeira temporada ativa


  } catch (error) {
    console.error("Erro ao buscar desafios:", error);
    throw new Error("Erro ao carregar desafios...");
  }
}
 

export const   PegarDesafiosDaTemporada = async(IdTemporada: number): Promise<Desafio[]> => {
      const query = `
      {
         card(id: ${IdTemporada}) {
            fields {
               name
               value
               connected_repo_items {
                  ... on Card {
                     id
                     fields {
                        name
                        value
                        date_value
                     }
                     title
                  }
               }
            }
         }
      }`;

      try {
         const response = await fetch(PIPEFY_API_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${PIPEFY_TOKEN}`,
            },
            body: JSON.stringify({ query }),
         });

         //console.log("Resposta da API:", response);

         if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

         const data = await response.json();
         //console.log("Resposta da API data:", JSON.stringify(data, null, 2));

         // Filtra o campo "Desafios da temporada" e retorna os desafios conectados
         const desafiosConectados: Desafio[] = data.data.card.fields
            .filter((field: any) => field.name.trim() === "Desafios da temporada")
            .flatMap((field: any) => field.connected_repo_items || [])
            .map((item: any) => {
               // Criar um objeto para armazenar os valores dos campos
               const campoMap: Record<string, string> = {};

               // Preencher os campos a partir do array fields[]
               item.fields.forEach((field: any) => {
                  campoMap[field.name.trim()] = field.value || "";
               });

               return {
                  id: item.id,
                  Titulo: item.title || "Sem título",
                  descricao: campoMap["Descrição"] || "Sem descrição",
                  pontos: campoMap["pontuação"] ? parseInt(campoMap["pontuação"], 10) : 0,
                  multiplicador: campoMap["multiplicador"] ? parseFloat(campoMap["multiplicador"]) : 1,
                  tempo_da_atividade: campoMap["tempo_da_atividade"] || "00:00",
                  Exigência_1: campoMap["Exigência_1"] || "",
                  Exigência_2: campoMap["Exigência_2"] || "",
                  Exigência_3: campoMap["Exigência_3"] || "",
                  Exigência_4: campoMap["Exigência_4"] || "",
                  AlunosQueRealizaram: campoMap["Alunos que realizaram a atividade"] || "",
                  links: campoMap["Links"] || "",
               };
            });

        // console.log("Desafios conectados:", desafiosConectados);
         return desafiosConectados;

      } catch (error) {
         console.error("Erro ao buscar desafios da temporada:", error);
         throw new Error("Erro ao carregar os desafios da temporada.");
      }
   }
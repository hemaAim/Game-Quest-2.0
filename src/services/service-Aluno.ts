/* eslint-disable @typescript-eslint/no-explicit-any */
import { Aluno } from '@/app/types/Aluno'



const PIPEFY_API_URL = "https://api.pipefy.com/graphql";
const PIPEFY_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3Mzk4MTY4MDcsImp0aSI6Ijk3ODFhYmRjLThhMDItNDU2Ni05MzBjLTE0Mzk2MzQwNWVkZiIsInN1YiI6MzAyNDA2NzU2LCJ1c2VyIjp7ImlkIjozMDI0MDY3NTYsImVtYWlsIjoiYWltaGVtYTc3QGdtYWlsLmNvbSJ9fQ.6l60GT46e8hU6Alzvg9-x0vSsbraVpp3a1NulAk8JcZs-9N4vN8iFQYxQZgB6wtfV0U184_Mr6oUb_JKYjX3pw"
const PIPE_ID = 305731497; // Converte para número


export async function AlunoLoginAutenticacao(email: string): Promise<Aluno | null> {
  // Validação simples de email utilizando regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Email inválido:", email);
    return null; // Retorna null se o email não for válido
  }

  const queryLogin = `
   query {
     cards(pipe_id: ${PIPE_ID}, search: {title: "${email}"}) {
       edges {
         node {
           id
           fields {
             name
             value
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
      body: JSON.stringify({ query: queryLogin }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data?.cards?.edges?.length) {
      return null; // Nenhum aluno encontrado
    }

    const userNode = data.data.cards.edges[0]?.node;
    if (!userNode) return null;

    const userData: Aluno = {
      id: userNode.id,
      email: email,
      nome_do_aluno: userNode.fields.find((f: any) => f.name === "Nome do Aluno")?.value || "",
      s_rie_do_aluno: userNode.fields.find((f: any) => f.name === "Série do Aluno")?.value || "",
      senha_do_aluno: userNode.fields.find((f: any) => f.name === "Senha do Aluno")?.value || "",
      curso_do_wit: userNode.fields.find((f: any) => f.name === "Curso do WIT")?.value || "",
      turma_do_wit: userNode.fields.find((f: any) => f.name === "Turma do WIT")?.value || "",
      pontos_atuais: userNode.fields.find((f: any) => f.name === "Pontos Atuais")?.value || "",
      xp: userNode.fields.find((f: any) => f.name === "XP")?.value || "",
      advert_ncias: userNode.fields.find((f: any) => f.name === "Advertências")?.value || "",
      bitcoin: userNode.fields.find((f: any) => f.name === "Bitcoin")?.value || "",
      level: userNode.fields.find((f: any) => f.name === "Nivel do aluno")?.value || "",
      compras: userNode.fields.find((f: any) => f.name === "compras")?.value || "",
      role: userNode.fields.find((f: any) => f.name === "role")?.value || ""
    };

    return userData;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null; // Retorna null caso ocorra algum erro
  }
}

export async function UpdateUserClasse(IdStudent: number, turma: string): Promise<Aluno | null> {
  const QueryupdateClasseStudentInPipefy = `
  mutation {
  updateCardField(input: {card_id: ${IdStudent}, field_id: "turma_do_wit", new_value: ${turma}}) {
    card {
      title
    }
  }
}`

  try {
    const response = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: QueryupdateClasseStudentInPipefy }),
    });

    const data = await response.json();
    alert("Turma Atualizada com Sucesso")

    return data
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro ao cadastrar!");
    return null;
  }

}
export async function CriandoAlunoNoPipefy(
  email: string,
  name: string | null,

  turma: string
): Promise<Aluno | null> {
  const queryCriandoAlunoNoPipefy = `
     mutation {
       createCard(input: {
         pipe_id: ${PIPE_ID},
         title: "${name}",
         fields_attributes: [
           {field_id: "nome_do_aluno", field_value: "${name}"},
           {field_id: "s_rie_do_aluno", field_value: "1"},
           {field_id: "email", field_value: "${email}"},
           {field_id: "senha_do_aluno", field_value: "null"},
           {field_id: "curso_do_wit", field_value: "Metaverso"},
           {field_id: "turma_do_wit", field_value: "${turma}"},
           {field_id: "pontos_atuais", field_value: "21"},
           {field_id: "xp", field_value: "10"},
           {field_id: "advert_ncias", field_value: "none"},
           {field_id: "bitcoin", field_value: "10,70"},
           {field_id: "nivel_do_aluno", field_value: "Iniciante"},
           {field_id: "role", field_value: "ALUNO"}

         ]
       }) {
         card {
           id
           title
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
      body: JSON.stringify({ query: queryCriandoAlunoNoPipefy }),
    });

    const data = await response.json();
    console.log("Resposta do Pipefy:", data);

    return {
      id: data.data.createCard.card.id,
      nome_do_aluno: name,
      email: email,
      turma_do_wit: turma,
      senha_do_aluno: "null"
    } as Aluno;
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro ao cadastrar!");
    return null;
  }
}



export const PegarAlunosParaTabela = async (): Promise<{ alunos: Aluno[]; hasNextPage: boolean; endCursor?: string }> => {
  const query = `{
     allCards(pipeId: 305731497, first: 50) {
        pageInfo {
           hasNextPage
           endCursor
        }
        edges {
           node {
              id
              fields {
                 name
                 value
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

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return {
      alunos: data.data.allCards.edges.map((edge: any) => edge.node),
      hasNextPage: data.data.allCards.pageInfo.hasNextPage,
      endCursor: data.data.allCards.pageInfo.endCursor,
    };
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    throw new Error("Erro ao carregar alunos. Tente novamente.");
  }
};




export const ListaDeAlunosPorTurmaDoAluno = async (turma: string): Promise<{ alunos: Aluno[] }> => {
  const query = `{
    findCards(pipeId: 305731497, search: {fieldId: "turma_do_wit", fieldValue: "${turma}"})  {
    edges {
      node {
        id
        title
        fields {
          name
          value
          field {
            id
            label
          }
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

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return {
      alunos: data.data.findCards.edges.map((edge: any) => edge.node),

    };
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    throw new Error("Erro ao carregar alunos. Tente novamente.");
  }
};


export const transferirBitcoin = async (
  user_bitcoin: number, // Recebe o user como parâmetro
  remetenteId: string,
  destinatarioId: string,
  quantidade: number,


) => {

  console.log("🚀 Iniciando transferência de Bitcoin...");
  console.log("📌 Remetente ID:", remetenteId);
  console.log("📌 Destinatário ID:", destinatarioId);
  console.log("📌 Quantidade:", quantidade);

  console.log("valor do bitcoin do remetente", user_bitcoin)
  // 🔹 1️⃣ BUSCAR O SALDO ATUAL DO DESTINATÁRIO
  const getBalanceQuery = `
     query {
        card(id: ${destinatarioId}) {
           fields {
              name
              value
           }
        }
     }
  `;


  try {
    console.log("🔍 Buscando saldo do destinatário...");
    const balanceResponse = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: getBalanceQuery }),
    });

    const balanceData = await balanceResponse.json();
    console.log("📄 Resposta do saldo:", JSON.stringify(balanceData, null, 2));

    if (balanceData.errors) {
      console.error("❌ Erro ao buscar saldo do destinatário:", balanceData.errors);
      return false;
    }

    // 🔹 2️⃣ PEGAR O SALDO ATUAL E SOMAR
    const fields = balanceData.data.card.fields;
    const bitcoinField = fields.find((field: any) => field.name === "Bitcoin");
    const saldoAtual = bitcoinField ? parseFloat(bitcoinField.value) : 0;
    const novoSaldo = saldoAtual + quantidade;
    console.log("💰 BITCOIN FIELD:", bitcoinField);
    console.log("💰 Saldo atual:", saldoAtual);
    console.log("➕ Novo saldo após recebimento:", novoSaldo);

    // 🔹 3️⃣ PRIMEIRO, SUBTRAIR DO REMETENTE
    console.log("🔄 Atualizando saldo do remetente...");

    if (user_bitcoin < quantidade) {
      console.error("❌ o saldo atual tem que ser maior que a tranferencia:",);
      return false;
    }
    const updateRemetenteQuery = `
        mutation {
           updateCardField(input: {card_id: ${remetenteId}, field_id: "bitcoin", new_value: "${(user_bitcoin - quantidade)}"}) {
              card {
                 title
              }
           }
        }
     `;
    const updateRemetenteResponse = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: updateRemetenteQuery }),
    });

    const updateRemetenteData = await updateRemetenteResponse.json();
    //console.log("📄 Resposta da atualização do remetente:", JSON.stringify(updateRemetenteData, null, 2));

    if (updateRemetenteData.errors) {
      console.error("❌ Erro ao atualizar saldo do remetente:", updateRemetenteData.errors);
      return false;
    }

    // 🔹 4️⃣ AGORA, ADICIONAR AO DESTINATÁRIO
    console.log("🔄 Atualizando saldo do destinatário...");
    const updateDestinatarioQuery = `
        mutation {
           updateCardField(input: {card_id: ${destinatarioId}, field_id: "bitcoin", new_value: "${novoSaldo}"}) {
              card {
                 title
              }
           }
        }
     `;

    const updateDestinatarioResponse = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: updateDestinatarioQuery }),
    });

    const updateDestinatarioData = await updateDestinatarioResponse.json();
    //"📄 Resposta da atualização do destinatário:", JSON.stringify(updateDestinatarioData, null, 2));

    if (updateDestinatarioData.errors) {
      console.error("❌ Erro ao atualizar saldo do destinatário:", updateDestinatarioData.errors);
      return false;
    }

    console.log("✅ Transferência concluída com sucesso!");
    return true;

  } catch (error) {
    console.error("❌ Erro na requisição:", error);
    return false;
  }
};

export const AlunoComprandoNoMarketplace = async (IdComprador: number, IdProdutoComprado: number): Promise<string[]> => {
  console.log("Iniciando processo de compra...");

  const queryComprador = `
    {
      card(id: ${IdComprador}) {
        fields {
          name
          value
          connectedRepoItems {
            ... on PublicCard {
              id
              title
            }
          }
        }
      }
    }`;

  const queryProduto = `
    {
      card(id: ${IdProdutoComprado}) {
        fields {
          name
          value
        }
      }
    }`;

  try {
    console.log("Consultando saldo do comprador...");
    const responseComprador = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: queryComprador }),
    });

    if (!responseComprador.ok) {
      console.error(`Erro ao consultar comprador: ${responseComprador.status}`);
      throw new Error(`Erro ao consultar comprador: ${responseComprador.status}`);
    }

    const dataComprador = await responseComprador.json();
    console.log("Dados do comprador recebidos:", JSON.stringify(dataComprador, null, 2));


    const varSaldo = dataComprador.data.card.fields.find((field: any) => field.name === "Bitcoin")?.value || "0"
    const saldo = parseFloat(varSaldo.replace(",", "."));

    console.log(`Saldo do comprador (${IdComprador}): ${saldo}`);

    console.log("Consultando preço do produto...");
    const responseProduto = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: queryProduto }),
    });

    if (!responseProduto.ok) {
      console.error(`Erro ao consultar produto: ${responseProduto.status}`);
      throw new Error(`Erro ao consultar produto: ${responseProduto.status}`);
    }

    const dataProduto = await responseProduto.json();
    console.log("Dados do produto recebidos:", JSON.stringify(dataProduto, null, 2));

    const precoString = dataProduto.data.card.fields.find((field: any) => field.name === "Preço")?.value || "0";
    const preco = parseFloat(precoString.replace(",", "."));

    console.log(`Preço do produto (${IdProdutoComprado}): ${preco}`);


    if (saldo < preco) {
      console.warn("Saldo insuficiente.");
      return [`Saldo insuficiente 😞. Seu saldo é de: ${saldo}`];
    }

    console.log("Verificando se o produto já foi comprado...");
    const connectedIds: string[] = dataComprador.data.card.fields
      .filter((field: any) => field.name.trim() === "compras")
      .flatMap((field: any) => field.connectedRepoItems || [])
      .map((item: any) => item.id);

    console.log("IDs conectados de 'compras':", connectedIds);

    if (connectedIds.includes(IdProdutoComprado.toString())) {
      console.warn(`O aluno com ID ${IdComprador} já possui o produto ${IdProdutoComprado}`);
      return [`você já possui este produto 🤔.`];
    }

    console.log("Atualizando saldo do comprador...");
    const novoSaldo = saldo - preco;
    console.log(`Novo saldo após compra: ${novoSaldo}`);

    const updateSaldoMutation = `
      mutation {
        updateCardField(input: {card_id: ${IdComprador}, field_id: "bitcoin", new_value: "${novoSaldo}"}) {
          card {
            title
          }
        }
      }
    `;

    console.log("Atualizando lista de compras...");
    const updateComprasMutation = `
      mutation {
        updateCardField(input: {card_id: ${IdComprador}, field_id: "compras", new_value: [${[...connectedIds, IdProdutoComprado].map(id => `"${id}"`).join(", ")}]}) {
          card {
            title
          }
        }
      }
    `;

    console.log("Enviando requisição para atualizar saldo...");
    const updateSaldoResponse = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: updateSaldoMutation }),
    });

    console.log("Enviando requisição para atualizar compras...");
    const updateComprasResponse = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: updateComprasMutation }),
    });

    console.log("Verificando resposta das mutações...");
    if (!updateSaldoResponse.ok) {
      console.error(`Erro ao atualizar saldo: ${updateSaldoResponse.status}`);
    }
    if (!updateComprasResponse.ok) {
      console.error(`Erro ao atualizar compras: ${updateComprasResponse.status}`);
    }

    console.log("Compra realizada com sucesso!");
    return [`Compra realizada com sucesso!✅`];
  } catch (error) {
    console.error("Erro ao processar a compra:", error);
    throw new Error("Erro ao processar a compra.");
  }
};

export const VoucherPorAluno = async (IdAluno: number) => {
  const queryAlunoVouchers = `
  {
    card(id: ${IdAluno}) {
      fields {
        name
        connected_repo_items {
          ... on Card {
            id
            fields {
              value
              name
            }
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
      body: JSON.stringify({ query: queryAlunoVouchers }),
    });

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

    const data = await response.json();

    // Filtra o campo "compras" e retorna os vouchers conectados
    const vouchersComprados = data.data.card.fields
      .filter((field: any) => field.name.trim() === "compras")
      .flatMap((field: any) => field.connected_repo_items || []);

    // Mapeia corretamente os vouchers
    const vouchers = vouchersComprados.map((voucher: any) => {
      const fields = voucher.fields; // Pega os campos do voucher

      return {
        title: fields.find((field: any) => field.name === "Nome do Produto")?.value || "Sem título",
        descricao: fields.find((field: any) => field.name === "Descrição")?.value || "Sem descrição",
        price: fields.find((field: any) => field.name === "Preço")?.value || "0,00",
        tempodeentrega: fields.find((field: any) => field.name === "Tempo de Entrega")?.value || "Desconhecido",
        vencimento: fields.find((field: any) => field.name === "vencimento")?.value || "desconhecido"
      };
    });

    console.log("Vouchers comprados:", vouchers);
    return vouchers; // Retorna um array de vouchers
  } catch (error) {
    console.error("Erro ao buscar 'compras':", error);
    return [];
  }
};







export const ReceberRecompensaPosAtividade = async (

  destinatarioId: string,
  quantidadeGema: number,



) => {




  // 🔹 1️⃣ BUSCAR O SALDO ATUAL DO DESTINATÁRIO
  const getBalanceQuery = `
     query {
        card(id: ${destinatarioId}) {
           fields {
              name
              value
           }
        }
     }
  `;


  try {
    console.log("🔍 Buscando saldo do destinatário...");
    const balanceResponse = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: getBalanceQuery }),
    });

    const balanceData = await balanceResponse.json();


    if (balanceData.errors) {
      console.error("❌ Erro ao buscar saldo do destinatário:", balanceData.errors);
      return false;
    }

    // 🔹 2️⃣ PEGAR O SALDO ATUAL E SOMAR
    const fields = balanceData.data.card.fields;
    const bitcoinField = fields.find((field: any) => field.name === "Pontos Atuais");
    const saldoAtual = bitcoinField ? parseFloat(bitcoinField.value) : 0;
    const novoSaldo = saldoAtual + quantidadeGema;




    const AtualizandoAlunoComRecompensaQuery = `
        mutation {
           updateCardField(input: {card_id: ${destinatarioId}, field_id: "pontos_atuais", new_value: "${novoSaldo}"}) {
              card {
                 title
              }
           }
        }
     `;

    const updateDestinatarioResponse = await fetch(PIPEFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPEFY_TOKEN}`,
      },
      body: JSON.stringify({ query: AtualizandoAlunoComRecompensaQuery }),
    });

    const updateDestinatarioData = await updateDestinatarioResponse.json();
    //"📄 Resposta da atualização do destinatário:", JSON.stringify(updateDestinatarioData, null, 2));

    if (updateDestinatarioData.errors) {
      console.error("❌ Erro ao atualizar saldo do destinatário:", updateDestinatarioData.errors);
      return false;
    }

    console.log("✅ Transferência concluída com sucesso!");
    return true;

  } catch (error) {
    console.error("❌ Erro na requisição:", error);
    return false;
  }
};
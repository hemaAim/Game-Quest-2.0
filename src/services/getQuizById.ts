// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
   const QAPI = require("quizizz.js");
    const client = new QAPI.QuizizzClient();




export async function getQuizById(quizID: string) {
  const quizData = await client.fetchQuiz(quizID);
  console.log("FULL FETCHED QUIZ DATA", JSON.stringify(quizData, null, 2));
  return quizData._raw.quiz; // aqui talvez seja necessário ajustar esse caminho
}


// app/services/getQuizById.ts
const QAPI = require("quizizz.js");
const client = new QAPI.QuizizzClient();




export async function getQuizById(quizID: string) {
  const quizData = await client.fetchQuiz(quizID);
  return quizData._raw.quiz;
}

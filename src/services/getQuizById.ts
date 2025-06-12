/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getQuizById(quizId: string) {
  const QAPI = await import("quizizz.js") as any;
  const client = new QAPI.QuizizzClient();

  const quiz = await client.fetchQuiz(quizId);
  return quiz;
}

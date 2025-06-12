
import { getQuizById } from "@/services/getQuizById";
import QuizClientWrapperID from "@/app/component/compoPageIdquiz";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuizClientPage({ params }: Props) {

  
  const { id: quizId } = await params;

  if (!quizId) return <p>Erro: ID não encontrado</p>;

  const quiz = await getQuizById(quizId);
const plainQuiz = JSON.parse(JSON.stringify(quiz))
  return (
    <div className="text-white w-full">
     <QuizClientWrapperID quiz={plainQuiz} />
    </div>
  );
}

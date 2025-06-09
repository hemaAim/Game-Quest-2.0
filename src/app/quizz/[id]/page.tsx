// app/quizz/page.tsx ou app/quizz/[id]/page.tsx
import { getQuizById } from "@/services/getQuizById";
import QuizClientWrapper from "@/app/component/QuizClientWrapper";
import QuizClientWrapperID from "@/app/component/compoPageIdquiz";
import { QuizData } from "@/app/types";

interface Props {
  searchParams: { idQuizz?: string };
}

export default async function QuizClientPage({ searchParams }: Props) {
  const ID = searchParams.idQuizz;

  if (!ID) return <p>erro: id não encontrado</p>;

  const quiz = await getQuizById(String(ID));

  return (
    <div className="text-white w-full ">
      <QuizClientWrapperID quiz={quiz} />
    </div>
  );
}

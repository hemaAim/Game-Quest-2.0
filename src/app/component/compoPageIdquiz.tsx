// app/component/QuizClientWrapper.tsx
"use client";

import { QuizData } from "@/app/types";
import QuizClient from "./QuizClient";

interface Props {
  quiz: QuizData;
}

export default function QuizClientWrapperID({ quiz }: Props) {
  return (
    <div>
      <QuizClient quiz={quiz} />
    </div>
  );
}

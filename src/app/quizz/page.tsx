import Image from "next/image";
import QuizClientWrapper from "@/app/component/QuizClientWrapper";
import { getQuizById } from "@/services/getQuizById";

export default async function PageQuizz() {
   
  const quiz = await getQuizById("6708f5dfd1a67df2f04399ce");


  
  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      {/* Fundo com imagem e opacidade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/wallpaper.svg"
          alt="Wallpaper"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      {/* Conteúdo acima da imagem */}
      <div className="relative z-10">
        <QuizClientWrapper quiz={quiz} />
      </div>
    </div>
  );
}

"use client";

import QuizClientWrapper from "@/app/component/QuizClientWrapper";

export default function PageQuizz() {
  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/wallpaper.svg"
          alt="Wallpaper"
          className="object-cover opacity-50 w-full h-full"
        />
      </div>

      <div className="relative z-10">
        <QuizClientWrapper  />
      </div>
    </div>
  );
}

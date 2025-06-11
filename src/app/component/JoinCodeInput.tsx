"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ para App Router

interface codeProps {
  codeID: string;
  url?: string
}

export default function JoinCodeInput({ codeID, url }: codeProps) {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const router = useRouter();

  const handleJoin = () => {
    const trimmed = code.trim();
    const isCorrect = trimmed === codeID;

    setIsValid(isCorrect);
    setAttempted(true);

    if (isCorrect) {
      router.push(`/quizz/${url}`); // ✅ funciona com next/navigation
      
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-2">
      <div className="flex rounded-full overflow-hidden bg-white shadow-md w-full max-w-md ">
       
<input
          type="text"
          placeholder="Digite o código do quiz"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleJoin();
          }}
          className="flex-1 px-4 py-5 text-gray-700 !text-xl  focus:outline-none font-bold"
        />
      
        
        <button
          onClick={handleJoin}
          className="bg-[#00000A] text-white px-5 text-sm font-semibold hover:bg-gray-900 transition"
        >
          Entrar
        </button>
      </div>

      {attempted && (
        <p className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}>
          {isValid ? "✅ Código correto!" : "❌ Código incorreto!"}
        </p>
      )}
    </div>
  );
}

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface QuizContextProps {
  quizPin: string;
  setQuizPin: (pin: string) => void;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizPin, setQuizPinState] = useState("");

  useEffect(() => {
    // Carregar do localStorage se houver
    const savedPin = localStorage.getItem("quizPin");
    if (savedPin) setQuizPinState(savedPin);
  }, []);

  const setQuizPin = (pin: string) => {
    localStorage.setItem("quizPin", pin); // Salva no localStorage
    setQuizPinState(pin); // Atualiza o estado do contexto
  };

  return (
    <QuizContext.Provider value={{ quizPin, setQuizPin }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

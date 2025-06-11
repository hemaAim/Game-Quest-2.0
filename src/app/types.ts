// types.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Option {
  id: string;
  text: string;
  // Se precisar de outros campos de Option, adicione aqui
}

export interface Media {
  type: string;
  src?: string;
  url?: string;
}

export interface Marks {
  correct: number;
  incorrect: number;
}

export interface Structure {
  settings: {
    hasCorrectAnswer: boolean;
    fibDataType: string;
    canSubmitCustomResponse: boolean;
    doesOptionHaveMultipleTargets: boolean;
  };
  hasMath: boolean;
  query: {
    type: string | null;
    hasMath: boolean;
    math: {
      latex: any[];
      template: string | null;
    };
    answerTime: number;
    text: string;
    media: Media[];
  };
  options: Option[];
  explain: {
    type: string;
    text: string;
    media: Media[];
    hasMath: boolean;
    math: {
      template: string | null;
      latex: any[];
    };
    answerTime: number;
  };
  hints: any[]; // ou algo mais específico, caso você saiba mais sobre o formato de “hints”
  kind: string; // ex.: "MCQ"
  theme: {
    fontFamily: string;
    titleFontFamily: string;
    fontColor: { text: string };
    background: { color: string; image: string; video: string };
    shape: { largeShapeColor: string; smallShapeColor: string };
  };
  marks: Marks;
  answer: number;
}

export interface Question {
  structure: Structure;
  standards: any[];    // conforme seu JSON, é uma lista vazia
  topics: any[];       // idem
  isSuperParent: boolean;
  standardIds: any[];  // seu JSON mostra array vazio
  aiGenerated: boolean;
  __v: number;
  teleportFrom: string | null;
  cloned: boolean;
  ver: number;
  parent: string | null;
  _id: string;
  time: number;
  published: boolean;
  aiCreateMeta: any | null;
  type: string;          // ex.: "MCQ"
  createdAt: string;     // ou Date, se você converter no parser
  updated: string;
  cached: boolean;
}

export interface QuizData {
  info: {
    lang: string;
    name: string;
    subjects: string[];
    grade: string[];
    questions: Question[];
  };
  stats: {
    played: number;
    totalPlayers: number;
    totalCorrect: number;
    totalQuestions: number;
  };
  createdBy: {
    google: {
      displayName: string;
      image: string; 
    };
  };
}

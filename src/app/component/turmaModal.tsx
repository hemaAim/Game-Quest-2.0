import { useState } from "react";

type Props = {
  turmas: string[];
  onSelectTurma: (turma: string) => void;
};

export default function TurmaModal({ turmas, onSelectTurma }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [, setSelectedTurma] = useState<string | null>(null);

  const handleSelect = (turma: string) => {
    setSelectedTurma(turma);
    onSelectTurma(turma);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Qual a sua turma?</h2>
        <div className="grid grid-cols-2 gap-4">
          {turmas.map((turma) => (
            <button
              key={turma}
              onClick={() => handleSelect(turma)}
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {turma}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

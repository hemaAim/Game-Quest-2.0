import React, { useState } from 'react';
import clsx from 'clsx';

const GRID_SIZE = 16;
const BOMB_COUNT = 4;
const INITIAL_BALANCE = 100;

const generateBombs = (bombCount: number, totalCells: number): number[] => {
   const bombs = new Set<number>();
   while (bombs.size < bombCount) {
      bombs.add(Math.floor(Math.random() * totalCells));
   }
   return Array.from(bombs);
};

export default function MinesGame() {
   const [bombs, setBombs] = useState<number[]>([]);
   const [revealed, setRevealed] = useState<number[]>([]);
   const [earnings, setEarnings] = useState(0);
   const [balance, setBalance] = useState(INITIAL_BALANCE);
   const [gameOver, setGameOver] = useState(false);

   const startGame = () => {
      setBombs(generateBombs(BOMB_COUNT, GRID_SIZE));
      setRevealed([]);
      setEarnings(0);
      setGameOver(false);
   };

   const revealCell = (index: number) => {
      if (revealed.includes(index) || gameOver) return;

      if (bombs.includes(index)) {
         setGameOver(true);
         setRevealed(prev => [...prev, index]);
         alert('💥 Você perdeu!');
         return;
      }

      setEarnings(prev => prev + 10);
      setRevealed(prev => [...prev, index]);
   };

   const cashOut = () => {
      setBalance(balance + earnings);
      alert(`🎉 Você ganhou $${earnings}!`);
      setGameOver(true);
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-800 to-black text-white">
         <h1 className="text-3xl font-bold mb-4">💎 Jogo dos Diamantes 💣</h1>
         <p className="mb-2">Saldo: <span className="font-semibold">${balance}</span></p>
         <p className="mb-4">Ganhos atuais: <span className="font-semibold">${earnings}</span></p>

         <div className="grid grid-cols-4 gap-2 mb-6 border-3 p-2 rounded-xl">
            {Array.from({ length: GRID_SIZE }).map((_, index) => {
               const isRevealed = revealed.includes(index);
               const isBomb = bombs.includes(index);
               const content = isRevealed ? (isBomb ? '💣' : '💎') : '';

               return (
                  <button
                     key={index}
                     className={clsx(
                        'w-16 h-16 border-2 flex items-center justify-center text-2xl rounded transition-all duration-200',
                        isRevealed ? (isBomb ? 'bg-red-600 border-red-800' : 'bg-green-600 border-green-800') : 'bg-cyan-500 border-white hover:scale-105',
                        gameOver && 'cursor-not-allowed'
                     )}
                     onClick={() => revealCell(index)}
                     disabled={gameOver}
                  >
                     {content}
                  </button>
               );
            })}
         </div>

         <div className="flex gap-4">
            <button
               onClick={startGame}
               className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded"
            >
               Começar Jogo
            </button>
            <button
               onClick={cashOut}
               className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
               disabled={earnings === 0 || gameOver}
            >
               Sacar
            </button>
         </div>
      </div>
   );
}

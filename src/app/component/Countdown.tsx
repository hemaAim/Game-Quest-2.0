"use client";
import { Poppins } from "next/font/google";
import { useEffect, useState, useCallback } from "react";

interface CountdownProps {
   targetDate: string;
   Finaliza_em: string;
   inicio: string
} 
const poppin = Poppins({ 
   subsets: ['latin'],
    preload: true,
  weight: ["300" ,"400" , "500", "600" , "700", "800", "900"] 
})

export default function Countdown({ targetDate, Finaliza_em, inicio }: CountdownProps) {
   const formatDate = useCallback((dateStr: string) => {
      const [day, month, yearWithTime] = dateStr.split("/");
      const [year, time] = yearWithTime.split(" ");
      const [hour, minute] = time.split(":");
      const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:00`;

      return new Date(formattedDate).getTime();
   }, []);

   const calculateTimeLeft = useCallback(() => {
      const difference = formatDate(targetDate) - new Date().getTime();
      return {
         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
         minutes: Math.floor((difference / (1000 * 60)) % 60),
         seconds: Math.floor((difference / 1000) % 60),
      };
   }, [formatDate, targetDate]);

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
      return () => clearInterval(timer);
   }, [calculateTimeLeft]); // Agora `calculateTimeLeft` é uma dependência estável

   return (
      <div className="flex flex-col items-start space-y-4 mt-10 mb-5 ">

         <p className="mt-2 text-xl font-bold text-gray-300">
            Inicio: <code className="bg-white/10  text-white  px-3 text-base rounded-sm italic font-medium">{inicio}</code>
         </p>
         <h2 className="text-xl font-bold text-gray-300">{Finaliza_em}:</h2>
         <div className="flex space-x-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
               <div key={unit} className="flex flex-col items-center">
                  <div className={`${poppin.className} font-black  w-24 h-20 bg-[#710ACC] text-white flex items-center justify-center text-3xl  rounded-xl shadow-md`}>
                     {String(value).padStart(2, "0")}
                  </div>
                  <p className={`${poppin.className} font-base text-base text-white  uppercase`}>{unit}</p>
               </div>
            ))}
         </div>
      </div>
   );
}

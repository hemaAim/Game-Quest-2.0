import React, { useEffect, useState } from "react";

interface CarouselProps {
   phrases: string[];
}

const Carousel: React.FC<CarouselProps> = ({ phrases }) => {
   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);

      return () => clearInterval(interval);
   }, [phrases.length]);

   return (
      <div className="w-full h-2/4 overflow-hidden relative  flex items-center justify-center">
         <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
               transform: `translateX(-${currentIndex * 100}%)`,
               width: `${phrases.length * 100}%`,
            }}
         >
            {phrases.map((phrase, index) => (
               <div
                  key={index}
                  className="w-full flex-shrink-0 flex items-center justify-center px-4"
                  style={{ width: "100%" }}
               >
                  <p className="text-xl sm:text-xl md:text-2xl font-semibold text-center">
                     {phrase}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Carousel;

'use client';

import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export function LocomotiveScrollWrapper({ children }: { children: React.ReactNode }) {
   const containerRef = useRef(null);

   useEffect(() => {
      if (!containerRef.current) return;

      const scroll = new LocomotiveScroll({
         el: containerRef.current,
         smooth: true,
      });

      return () => {
         scroll.destroy();
      };
   }, []);

   return (
      <div data-scroll-container ref={containerRef}>
         {children}
      </div>
   );
}

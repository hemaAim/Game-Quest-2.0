// components/ScrollIndicator.tsx
"use client";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const target = document.getElementById(`section-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-1/2 left-6 -translate-y-1/2 flex flex-col gap-4 z-50">
      {[...Array(9)].map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className={`w-4 h-4 rounded-full border-2 transition-colors ${
            activeIndex === index ? "bg-gray-300" : "border-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default ScrollIndicator;

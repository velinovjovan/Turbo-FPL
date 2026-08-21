import React from "react";
import type { CardProps } from "../types";

const Card = ({ children, title, parag }: CardProps) => {
  return (
    <div className="max-w-[30rem] surface-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="relative z-10">{children}</div>
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-white">
        {title}
      </h3>
      <p className="text-base text-slate-300 text-center leading-relaxed">
        {parag}
      </p>
    </div>
  );
};

export default Card;

import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  parag: string;
}

const Card = ({ children, title, parag }: Props) => {
  return (
    <div className=" max-w-[30rem] bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 transition-all duration-300 hover:bg-slate-900/50 hover:border-slate-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          <div className="relative z-10">{children}</div>
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-white">
        {title}
      </h3>
      <p className="text-base text-gray-400 text-center leading-relaxed">
        {parag}
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
    </div>
  );
};

export default Card;

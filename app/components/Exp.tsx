import React from "react";

const Exp = () => {
  return (
    <div className="text-center mb-20">
      <div className="inline-block mb-4">
        <span className="text-sm uppercase tracking-widest text-cyan-400 font-semibold px-4 py-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full">
          About
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 mt-20 font-gothic leading-tight">
        Master FPL for Free with{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
          AI-Powered Tools
        </span>
      </h2>

      <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
        Dominate your FPL mini-leagues with advanced AI tools - all for free!
        Get smart transfer advice, team ratings, predicted points, Opta-powered
        stats, and in-depth fixture analysis, all in one place!
      </p>
    </div>
  );
};

export default Exp;

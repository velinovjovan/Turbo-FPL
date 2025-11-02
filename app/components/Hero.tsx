import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-kdbLanding bg-cover bg-center min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 font-gothic">
          <span className="block text-white mb-2 animate-fade-in">
            Winning FPL Has
          </span>
          <span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Never Been Easier
          </span>
        </h1>
        <p
          className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Get AI-powered insights, real-time stats, and price alerts to dominate
          your fantasy league
        </p>
        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Link
            href="/my-team"
            className="group relative inline-flex items-center gap-3 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 font-gothic"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Start Now</span>
            <svg
              className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
        <div
          className="flex flex-wrap justify-center gap-4 mt-16 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-200 font-medium">
            🎯 AI Predictions
          </span>
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-200 font-medium">
            📊 Opta Stats
          </span>
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-200 font-medium">
            💰 Price Alerts
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

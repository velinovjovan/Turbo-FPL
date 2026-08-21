import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-kdbLanding bg-cover bg-center min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/70"></div>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-8 leading-tight">
          <span className="block text-white mb-2 animate-fade-in">
            Winning FPL Has
          </span>
          <span
            className="block text-cyan-300 animate-fade-in"
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
            className="group relative inline-flex items-center gap-3 text-lg sm:text-xl font-semibold text-white bg-teal-700 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:bg-teal-600 hover:scale-105"
          >
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
          <span className="px-4 py-2 bg-teal-900/40 border border-teal-700/50 rounded-full text-sm text-teal-200 font-medium">
            🎯 AI Predictions
          </span>
          <span className="px-4 py-2 bg-sky-900/40 border border-sky-700/50 rounded-full text-sm text-sky-200 font-medium">
            📊 Opta Stats
          </span>
          <span className="px-4 py-2 bg-emerald-900/40 border border-emerald-700/50 rounded-full text-sm text-emerald-200 font-medium">
            💰 Price Alerts
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

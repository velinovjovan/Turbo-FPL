import React from "react";
import FormTeam from "../components/FormTeam";

const MyTeam = () => {
  return (
    <div className="page-shell pb-32 pt-10">
      <div className="page-inner pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
            <span className="text-white">View Your</span>
            <br />
            <span className="text-emerald-300">FPL Squad</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-5xl mx-auto">
            Access detailed stats, player performance, and insights for your
            Fantasy Premier League team
          </p>
        </div>
        <FormTeam />
        <div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="text-center p-6 surface-card transition-all duration-300 hover:border-teal-500/50">
            <div className="w-12 h-12 mx-auto mb-4 bg-teal-900/40 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-teal-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Live Stats</h3>
            <p className="text-sm text-slate-400">
              Real-time player performance data
            </p>
          </div>

          <div className="text-center p-6 surface-card transition-all duration-300 hover:border-emerald-500/50">
            <div className="w-12 h-12 mx-auto mb-4 bg-emerald-900/40 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Team Value</h3>
            <p className="text-sm text-slate-400">
              Track your squad&apos;s total worth
            </p>
          </div>

          <div className="text-center p-6 surface-card transition-all duration-300 hover:border-violet-500/50">
            <div className="w-12 h-12 mx-auto mb-4 bg-violet-900/35 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-violet-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Smart Tips</h3>
            <p className="text-sm text-slate-400">AI-powered recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;

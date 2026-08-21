"use client";
import React from "react";
import TableOpta from "../components/TableOpta";
import ErrorScreen from "../components/ErrorScreen";
import { useFplBootstrap } from "../providers/FplProvider";

const OptaStats = () => {
  const { bootstrap, isLoading, error } = useFplBootstrap();

  if (error) {
    return <ErrorScreen />;
  }

  if (isLoading || !bootstrap) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-600/30 border-solid rounded-full"></div>
            <div className="w-16 h-16 border-4 border-slate-300 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-slate-300">
            Loading Opta stats...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell overflow-hidden pt-24">
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            <span className="text-white">Player Stats: </span>
            <span className="text-sky-300">Opta & FPL Performance</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Your one-stop source for detailed insights into player performance
            across the Premier League. Find comprehensive breakdowns powered by
            Opta data for tactical insights, performance predictions, and
            critical transfer decisions.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="group text-center p-6 surface-card hover:border-sky-500/50 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-sky-900/35 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-sky-300"
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
            <h3 className="text-white font-semibold text-lg mb-2">
              Opta Powered
            </h3>
            <p className="text-sm text-slate-400">
              Industry-leading data and analytics
            </p>
          </div>
          <div className="group text-center p-6 surface-card hover:border-emerald-500/50 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-emerald-900/35 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-emerald-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Real-Time Updates
            </h3>
            <p className="text-sm text-slate-400">Latest performance metrics</p>
          </div>

          <div className="group text-center p-6 surface-card hover:border-amber-500/50 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-amber-900/30 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-amber-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Advanced Metrics
            </h3>
            <p className="text-sm text-slate-400">xG, xA, and BPS</p>
          </div>
        </div>
        <TableOpta Data={bootstrap} />
      </div>
    </div>
  );
};

export default OptaStats;

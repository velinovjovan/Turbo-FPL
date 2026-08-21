"use client";
import React from "react";
import ErrorScreen from "../components/ErrorScreen";
import TablePredict from "../components/TablePredict";
import { useFplBootstrap } from "../providers/FplProvider";

const PredictedPoints = () => {
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
            Loading predicted points...
          </p>
        </div>
      </div>
    );
  }

  const currentEvent = bootstrap?.events?.find((e) => e.is_current);
  const nextEvent = bootstrap?.events?.find((e) => e.is_next);

  const currentGw = currentEvent
    ? currentEvent.id
    : nextEvent
      ? nextEvent.id - 1
      : 38;

  return (
    <div className="page-shell overflow-hidden pt-24">
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            <span className="text-white">Points Predictor: </span>
            <span className="text-violet-300">Project FPL Player Points</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-4">
            Your ultimate tool for forecasting player performance in FPL.{" "}
            <span className="text-violet-300 font-semibold">
              Powered by a machine learning model trained on Premier League data
            </span>
            , our tool analyzes performance trends and key metrics to provide
            per-match point predictions for each player.
          </p>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Whether you&apos;re strategizing transfers or choosing your captain,
            Points Predictor offers data-driven insights to help you make
            smarter decisions. Note: predictions indicate{" "}
            <span className="text-violet-300 font-semibold">
              average points per match
            </span>{" "}
            — for double gameweeks, points reflect individual match
            performances.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="group text-center p-6 surface-card hover:border-violet-500/50 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-violet-900/35 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-violet-300"
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
            <h3 className="text-white font-semibold text-lg mb-2">
              ML Powered
            </h3>
            <p className="text-sm text-slate-400">
              Machine learning predictions
            </p>
          </div>

          <div className="group text-center p-6 surface-card hover:border-fuchsia-500/40 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-fuchsia-900/30 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-fuchsia-300"
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
            <h3 className="text-white font-semibold text-lg mb-2">
              Performance Trends
            </h3>
            <p className="text-sm text-slate-400">
              Analyze player form and metrics
            </p>
          </div>

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
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Per-Match Insights
            </h3>
            <p className="text-sm text-slate-400">
              Individual game predictions
            </p>
          </div>
        </div>

        {currentGw >= 5 ? (
          <TablePredict Data={bootstrap} />
        ) : (
          <div className="max-w-4xl mx-auto surface-card p-10 sm:p-14 text-center border border-violet-500/20 rounded-2xl shadow-lg backdrop-blur-sm bg-slate-900/40">
            <div className="w-20 h-20 mx-auto mb-6 bg-violet-900/30 rounded-2xl flex items-center justify-center border border-violet-500/30">
              <svg
                className="w-10 h-10 text-violet-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Predictions Unlock After Gameweek 5
            </h3>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Our machine learning model requires sufficient performance data
              from the start of the season to establish reliable trends and
              provide accurate point projections.
            </p>
            <p className="text-violet-300 font-medium mt-6 text-sm sm:text-base bg-violet-900/20 inline-block px-4 py-2 rounded-lg border border-violet-500/20">
              Currently at Gameweek{" "}
              {currentGw > 0 ? currentGw : "0 (Pre-season)"}. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictedPoints;

"use client";
import React, { useMemo } from "react";
import TablePrice from "../components/TablePrice";
import ErrorScreen from "../components/ErrorScreen";
import type { PricePlayer } from "../types";
import { useFplBootstrap } from "../providers/FplProvider";

const PriceChanges = () => {
  const { bootstrap, isLoading, error } = useFplBootstrap();

  const sortedPlayers = useMemo<PricePlayer[]>(() => {
    if (!bootstrap) {
      return [];
    }

    return bootstrap.elements
      .filter((el) => el.element_type !== 5)
      .map((player) => {
        const ownership =
          (bootstrap.total_players * Number(player.selected_by_percent)) / 100;
        const selectedByPercent = player.selected_by_percent ?? "0";
        const transfersIn = player.transfers_in ?? 0;
        const transfersOut = player.transfers_out ?? 0;
        const transfersInEvent = player.transfers_in_event ?? 0;
        const transfersOutEvent = player.transfers_out_event ?? 0;
        const costChangeEvent = player.cost_change_event ?? 0;
        const costChangeStart = player.cost_change_start ?? 0;
        const netGain = transfersIn - transfersOut;

        const defOwnership = ownership - netGain;

        const lastChange =
          defOwnership *
          Math.pow(costChangeStart >= 0 ? 1.1 : 0.9, Math.abs(costChangeStart));

        let progress;

        if (lastChange - ownership <= 0) {
          progress = (ownership / (lastChange * 1.1)) * 100;

          if (progress > 65 && progress < 500) {
            progress = (progress / 500) * 100;
          } else if (progress > 500) {
            progress = (progress / 500) * 100;
            progress -= 100;
          } else {
            progress *= 0.7;
          }
        } else {
          progress = (ownership / (lastChange * 0.9)) * 100;

          if (progress > 65 && progress < 500) {
            progress = (progress / 500) * 100;
          } else if (progress > 500) {
            progress = (progress / 500) * 100;
            progress -= 100;
          } else {
            progress *= 0.7;
          }

          progress = -progress;
        }

        return {
          ...player,
          selected_by_percent: selectedByPercent,
          transfers_in: transfersIn,
          transfers_out: transfersOut,
          transfers_in_event: transfersInEvent,
          transfers_out_event: transfersOutEvent,
          cost_change_event: costChangeEvent,
          cost_change_start: costChangeStart,
          progress: progress,
        };
      });
  }, [bootstrap]);

  if (error) {
    return <ErrorScreen />;
  }

  if (isLoading || !bootstrap) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center pt-24">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-500/20 border-solid rounded-full"></div>
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-300">
            Loading price projections...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden pt-24">
      <div className="absolute top-40 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-60 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm uppercase tracking-widest text-emerald-400 font-semibold px-4 py-2 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-full">
              Price Tracker
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">FPL </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-cyan-500">
              Price Changes Predictor
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            In{" "}
            <span className="text-emerald-400 font-semibold">
              Fantasy Premier League
            </span>
            , player prices fluctuate based on transfer activity. Our{" "}
            <span className="text-emerald-400 font-semibold">
              Price Changes Predictor
            </span>{" "}
            provides live updates and projections on which players are likely to
            experience a price rise or fall during the current gameweek.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-40">
          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-emerald-400"
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
              Price Rises
            </h3>
            <p className="text-sm text-gray-400">
              Track players likely to increase in value
            </p>
          </div>

          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Price Falls
            </h3>
            <p className="text-sm text-gray-400">
              Monitor players decreasing in price
            </p>
          </div>

          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-cyan-400"
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
            <h3 className="text-white font-semibold text-lg mb-2">
              Live Updates
            </h3>
            <p className="text-sm text-gray-400">
              Real-time predictions and alerts
            </p>
          </div>
        </div>
        <TablePrice sortedPlayers={sortedPlayers} />
      </div>
    </div>
  );
};

export default PriceChanges;

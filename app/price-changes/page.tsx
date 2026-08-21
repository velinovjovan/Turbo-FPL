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
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-600/30 border-solid rounded-full"></div>
            <div className="w-16 h-16 border-4 border-slate-300 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-slate-300">
            Loading price projections...
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
            <span className="text-white">FPL </span>
            <span className="text-emerald-300">Price Changes Predictor</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            In{" "}
            <span className="text-emerald-300 font-semibold">
              Fantasy Premier League
            </span>
            , player prices fluctuate based on transfer activity. Our{" "}
            <span className="text-emerald-300 font-semibold">
              Price Changes Predictor
            </span>{" "}
            provides live updates and projections on which players are likely to
            experience a price rise or fall during the current gameweek.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-40">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Price Rises
            </h3>
            <p className="text-sm text-slate-400">
              Track players likely to increase in value
            </p>
          </div>

          <div className="group text-center p-6 surface-card hover:border-rose-500/50 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-rose-900/30 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-rose-300"
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
            <p className="text-sm text-slate-400">
              Monitor players decreasing in price
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Live Updates
            </h3>
            <p className="text-sm text-slate-400">
              Real-time predictions and alerts
            </p>
          </div>
        </div>

        {currentGw >= 3 ? (
          <TablePrice sortedPlayers={sortedPlayers} />
        ) : (
          <div className="max-w-4xl mx-auto surface-card p-10 sm:p-14 text-center border border-emerald-500/20 rounded-2xl shadow-lg backdrop-blur-sm bg-slate-900/40">
            <div className="w-20 h-20 mx-auto mb-6 bg-emerald-900/30 rounded-2xl flex items-center justify-center border border-emerald-500/30">
              <svg
                className="w-10 h-10 text-emerald-300"
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
              Predictions Unlock After Gameweek 3
            </h3>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Our model requires sufficient transfer activity and performance
              data from the start of the season to establish reliable trends and
              provide accurate price change projections.
            </p>
            <p className="text-emerald-300 font-medium mt-6 text-sm sm:text-base bg-emerald-900/20 inline-block px-4 py-2 rounded-lg border border-emerald-500/20">
              Currently at Gameweek{" "}
              {currentGw > 0 ? currentGw : "0 (Pre-season)"}. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChanges;

"use client";
import React, { useEffect, useMemo, useState } from "react";
import TablePrice from "../components/TablePrice";
import ErrorScreen from "../components/ErrorScreen";

const PriceChanges = () => {
  const [players, setPlayers] = useState({
    elements: [
      {
        cost_change_start: 0,
        cost_change_event: 0,
        transfers_in_event: 0,
        transfers_out_event: 0,
        transfers_in: 0,
        transfers_out: 0,
        selected_by_percent: "",
        web_name: "",
        now_cost: 0,
        id: 0,
      },
    ],
    total_players: 0,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const timeStamp = new Date().getTime();
        const response = await fetch(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/bootstrap-static/?_=${timeStamp}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setPlayers(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(true);
      }
    };

    getData();
  }, []);

  const sortedPlayers = useMemo(() => {
    return players.elements
      .filter((el: any) => el.element_type !== 5)
      .map((player) => {
        const ownership =
          (players.total_players * Number(player.selected_by_percent)) / 100;
        const netGain = player.transfers_in - player.transfers_out;

        const defOwnership = ownership - netGain;

        const lastChange =
          defOwnership *
          Math.pow(
            player.cost_change_start >= 0 ? 1.1 : 0.9,
            Math.abs(player.cost_change_start)
          );

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
          progress: progress,
        };
      });
  }, [players]);

  if (error) {
    return <ErrorScreen />;
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

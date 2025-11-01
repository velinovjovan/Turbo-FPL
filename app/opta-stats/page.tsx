"use client";
import React, { useState, useEffect } from "react";
import TableOpta from "../components/TableOpta";
import ErrorScreen from "../components/ErrorScreen";

const OptaStats = () => {
  const [data, setData] = useState({
    elements: [
      {
        web_name: "",
        now_cost: 0,
        starts: 0,
        minutes: 0,
        bps: 0,
        bonus: 0,
        assists: 0,
        goals_scored: 0,
        expected_assists: "",
        expected_assists_per_90: 0,
        expected_goal_involvements: "",
        expected_goal_involvements_per_90: 0,
        expected_goals: "",
        total_points: 0,
        id: 0,
        element_type: 0,
      },
    ],
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
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(true);
      }
    };

    getData();
  }, []);

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden pt-24">
      <div className="absolute top-40 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-60 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm uppercase tracking-widest text-cyan-400 font-semibold px-4 py-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full">
              Opta Stats
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Player Stats: </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Opta & FPL Performance
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Your one-stop source for detailed insights into player performance
            across the Premier League. Find comprehensive breakdowns powered by
            Opta data for tactical insights, performance predictions, and
            critical transfer decisions.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Opta Powered
            </h3>
            <p className="text-sm text-gray-400">
              Industry-leading data and analytics
            </p>
          </div>
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
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Real-Time Updates
            </h3>
            <p className="text-sm text-gray-400">Latest performance metrics</p>
          </div>

          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-purple-400"
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
            <p className="text-sm text-gray-400">xG, xA, and BPS</p>
          </div>
        </div>
        <TableOpta Data={data} />
      </div>
    </div>
  );
};

export default OptaStats;

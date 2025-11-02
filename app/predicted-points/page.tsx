"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import ErrorScreen from "../components/ErrorScreen";
import TablePredict from "../components/TablePredict";
import { devLink } from "../API/devLink";
import { prodLink } from "../API/prodLink";

const baseLink = process.env.NODE_ENV === "development" ? devLink : prodLink;

const PredictedPoints = () => {
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
        points_per_game: "",
        clean_sheets: 0,
        saves: 0,
        yellow_cards: 0,
        expected_goals_conceded: "",
        selected_by_percent: "",
        photo: "",
        element_type: 0,
      },
    ],

    events: [
      {
        is_current: false,
        id: 0,
      },
    ],
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const timeStamp = new Date().getTime();
        const response = await fetch(
          `${baseLink}/api/bootstrap-static/?_=${timeStamp}`
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
      <div className="absolute top-40 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-60 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm uppercase tracking-widest text-purple-400 font-semibold px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
              AI Predictions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Points Predictor: </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
              Project FPL Player Points
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-4">
            Your ultimate tool for forecasting player performance in FPL.{" "}
            <span className="text-purple-400 font-semibold">
              Powered by a machine learning model trained on Premier League data
            </span>
            , our tool analyzes performance trends and key metrics to provide
            per-match point predictions for each player.
          </p>

          <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Whether you&apos;re strategizing transfers or choosing your captain,
            Points Predictor offers data-driven insights to help you make
            smarter decisions. Note: predictions indicate{" "}
            <span className="text-purple-400 font-semibold">
              average points per match
            </span>{" "}
            — for double gameweeks, points reflect individual match
            performances.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              ML Powered
            </h3>
            <p className="text-sm text-gray-400">
              Machine learning predictions
            </p>
          </div>

          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-pink-400"
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
            <p className="text-sm text-gray-400">
              Analyze player form and metrics
            </p>
          </div>

          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-blue-400"
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
            <p className="text-sm text-gray-400">Individual game predictions</p>
          </div>
        </div>
        <TablePredict Data={data} />
      </div>
    </div>
  );
};

export default PredictedPoints;

"use client";
import React, { useMemo, useState } from "react";
import TableComp from "./TableComp";

type Player = {
  web_name: string;
  now_cost: number;
  starts: number;
  minutes: number;
  bps: number;
  bonus: number;
  assists: number;
  goals_scored: number;
  expected_assists: string;
  expected_assists_per_90: number;
  expected_goal_involvements: string;
  expected_goal_involvements_per_90: number;
  expected_goals: string;
  total_points: number;
  id: number;
  element_type: number;
};

const TableOpta = ({
  Data,
}: {
  Data: {
    elements: Player[];
  };
}) => {
  const [sortAttribute, setSortAttribute] = useState<string>("total_points");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [num, setNum] = useState(20);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    if (e.target.value === "All") setNum(1000);
    else setNum(Number(e.target.value));
  };

  const handleSort = (attribute: string) => {
    if (sortAttribute === attribute) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortAttribute(attribute);
      setSortOrder("desc");
    }
  };

  const sortedPlayers = useMemo(() => {
    return [...Data.elements]
      .filter((el: Player) => el.element_type !== 5)
      .sort((a, b) => {
        if (sortAttribute === "web_name") {
          const nameA = a.web_name.toLowerCase();
          const nameB = b.web_name.toLowerCase();
          return sortOrder === "desc"
            ? nameB.localeCompare(nameA)
            : nameA.localeCompare(nameB);
        }

        if (sortAttribute === "goal_involvements") {
          return sortOrder === "desc"
            ? b.assists + b.goals_scored - (a.assists + a.goals_scored)
            : a.assists + a.goals_scored - (b.assists + b.goals_scored);
        }

        if (sortAttribute === "goal_involvements_per_90") {
          if (a.minutes === 0) {
            return sortOrder === "desc" ? 1 : -1;
          }
          if (b.minutes === 0) {
            return sortOrder === "desc" ? -1 : 1;
          }
          return sortOrder === "desc"
            ? (b.assists + b.goals_scored) / b.minutes -
                (a.assists + a.goals_scored) / a.minutes
            : (a.assists + a.goals_scored) / a.minutes -
                (b.assists + b.goals_scored) / b.minutes;
        }
        const valueA = a[sortAttribute as keyof Player];
        const valueB = b[sortAttribute as keyof Player];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortOrder === "desc"
            ? Number(valueB) - Number(valueA)
            : Number(valueA) - Number(valueB);
        } else {
          return sortOrder === "desc" ? +valueB - +valueA : +valueA - +valueB;
        }
      });
  }, [sortAttribute, sortOrder, Data.elements]);

  const getSortIcon = (attribute: string) => {
    if (sortAttribute !== attribute) {
      return (
        <svg
          className="w-4 h-4 ml-1 opacity-30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }
    return sortOrder === "desc" ? (
      <svg
        className="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    );
  };

  return (
    <div className="relative w-full px-4 py-8">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Player Statistics
            </h2>
            <p className="text-sm text-gray-400">
              Click column headers to sort • {sortedPlayers.length} players
              found
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <label
              htmlFor="results"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Show Results
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <select
                id="results"
                className="relative z-10 bg-slate-900/50 backdrop-blur-sm border border-slate-700 text-white text-sm rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 block w-full sm:w-40 px-4 py-2.5 transition-all duration-300 cursor-pointer hover:border-cyan-500/50"
                value={num === 1000 ? "All" : num}
                onChange={handleChange}
              >
                <option value={20} className="bg-slate-900 text-white">
                  Top 20
                </option>
                <option value={50} className="bg-slate-900 text-white">
                  Top 50
                </option>
                <option value={100} className="bg-slate-900 text-white">
                  Top 100
                </option>
                <option value="All" className="bg-slate-900 text-white">
                  All Players
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm text-gray-400 border-collapse">
                <thead className="text-xs uppercase bg-slate-900/80 backdrop-blur-sm text-gray-300 sticky top-0 z-20">
                  <tr>
                    <th
                      onClick={() => handleSort("web_name")}
                      scope="col"
                      className={`px-4 py-4 text-left cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "web_name"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Player Name"
                    >
                      <div className="flex items-center">
                        Name
                        {getSortIcon("web_name")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("now_cost")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "now_cost"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Cost"
                    >
                      <div className="flex items-center justify-center">
                        £M
                        {getSortIcon("now_cost")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("starts")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "starts"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Games Started"
                    >
                      <div className="flex items-center justify-center">
                        Starts
                        {getSortIcon("starts")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("minutes")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "minutes"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Minutes Played"
                    >
                      <div className="flex items-center justify-center">
                        Mins
                        {getSortIcon("minutes")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("expected_goals")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "expected_goals"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Expected Goals"
                    >
                      <div className="flex items-center justify-center">
                        xG
                        {getSortIcon("expected_goals")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("goals_scored")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "goals_scored"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Goals Scored"
                    >
                      <div className="flex items-center justify-center">
                        G{getSortIcon("goals_scored")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("expected_assists")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "expected_assists"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Expected Assists"
                    >
                      <div className="flex items-center justify-center">
                        xA
                        {getSortIcon("expected_assists")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("assists")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "assists"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Assists"
                    >
                      <div className="flex items-center justify-center">
                        A{getSortIcon("assists")}
                      </div>
                    </th>
                    <th
                      onClick={() =>
                        handleSort("expected_goal_involvements_per_90")
                      }
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "expected_goal_involvements_per_90"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Expected Goal Involvement per 90"
                    >
                      <div className="flex items-center justify-center">
                        xGIp90
                        {getSortIcon("expected_goal_involvements_per_90")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("goal_involvements_per_90")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "goal_involvements_per_90"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Goal Involvement per 90"
                    >
                      <div className="flex items-center justify-center">
                        GIp90
                        {getSortIcon("goal_involvements_per_90")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("expected_goal_involvements")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "expected_goal_involvements"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Expected Goal Involvement"
                    >
                      <div className="flex items-center justify-center">
                        xGI
                        {getSortIcon("expected_goal_involvements")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("goal_involvements")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "goal_involvements"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Goal Involvement"
                    >
                      <div className="flex items-center justify-center">
                        GI
                        {getSortIcon("goal_involvements")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("bps")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "bps"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Bonus Points System (FPL)"
                    >
                      <div className="flex items-center justify-center">
                        BPS
                        {getSortIcon("bps")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("bonus")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "bonus"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Bonus Points"
                    >
                      <div className="flex items-center justify-center">
                        B{getSortIcon("bonus")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("total_points")}
                      scope="col"
                      className={`px-4 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-200 whitespace-nowrap ${
                        sortAttribute === "total_points"
                          ? "text-cyan-400 border-b-2 border-cyan-400"
                          : "border-b-2 border-transparent"
                      }`}
                      title="Points Scored"
                    >
                      <div className="flex items-center justify-center">
                        Pts
                        {getSortIcon("total_points")}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayers.slice(0, num).map((player, index) => (
                    <TableComp player={player} key={player.id} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {Math.min(num, sortedPlayers.length)} of{" "}
          {sortedPlayers.length} players
        </div>
      </div>
    </div>
  );
};

export default TableOpta;

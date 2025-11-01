import React from "react";

const TableComp = ({
  player,
  index,
}: {
  player: {
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
  };
  index?: number;
}) => {
  return (
    <tr
      className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors duration-200 ${
        index !== undefined && index % 2 === 0
          ? "bg-slate-900/20"
          : "bg-transparent"
      }`}
    >
      <td className="px-4 py-3 text-left font-semibold text-gray-300 whitespace-nowrap w-44">
        {player.web_name}
      </td>
      <td className="px-4 py-3 text-center w-20">
        £{(player.now_cost / 10).toFixed(1)}
      </td>
      <td className="px-4 py-3 text-center w-20">{player.starts}</td>
      <td className="px-4 py-3 text-center w-20">{player.minutes}</td>
      <td className="px-4 py-3 text-center w-20">
        {Number(player.expected_goals).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-center font-semibold text-emerald-400 w-16">
        {player.goals_scored}
      </td>
      <td className="px-4 py-3 text-center w-20">
        {Number(player.expected_assists).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-center font-semibold text-cyan-400 w-20">
        {player.assists}
      </td>
      <td className="px-4 py-3 text-center w-20">
        {Number(player.expected_goal_involvements_per_90).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-center w-20">
        {player.minutes > 0
          ? (
              ((Number(player.assists) + Number(player.goals_scored)) /
                player.minutes) *
              90
            ).toFixed(2)
          : "0.00"}
      </td>
      <td className="px-4 py-3 text-center w-20">
        {Number(player.expected_goal_involvements).toFixed(2)}
      </td>
      <td className="px-4 py-3 text-center font-semibold text-purple-400 w-20">
        {Number(player.assists) + Number(player.goals_scored)}
      </td>
      <td className="px-4 py-3 text-center w-22">{player.bps}</td>
      <td className="px-4 py-3 text-center w-20">{player.bonus}</td>
      <td className="px-4 py-3 text-center font-bold text-cyan-400 w-22">
        {player.total_points}
      </td>
    </tr>
  );
};

export default TableComp;

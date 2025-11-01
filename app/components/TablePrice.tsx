import React from "react";
import PriceComp from "./PriceComp";

type PricePlayer = {
  progress: number;
  cost_change_start: number;
  cost_change_event: number;
  transfers_in_event: number;
  transfers_out_event: number;
  transfers_in: number;
  transfers_out: number;
  selected_by_percent: string;
  web_name: string;
  now_cost: number;
  id: number;
};

const TablePrice = ({ sortedPlayers }: { sortedPlayers: PricePlayer[] }) => {
  const filteredPlayers = sortedPlayers
    .filter((player) => Number(player.selected_by_percent) > 10)
    .sort((a, b) => b.progress - a.progress);

  return (
    <div className="relative w-full px-4 py-8">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Price Change Predictions
            </h2>
            <p className="text-sm text-gray-400">
              {filteredPlayers.length} players tracked • Ownership &gt; 10%
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-300">Price Rise</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Price Fall</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm text-gray-400 border-collapse">
                <thead className="text-xs uppercase bg-slate-900/80 backdrop-blur-sm text-gray-400 sticky top-0 z-20">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left whitespace-nowrap w-64"
                    >
                      Player Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center whitespace-nowrap w-32"
                    >
                      Current Cost
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center whitespace-nowrap w-40"
                    >
                      Progress
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center whitespace-nowrap w-40"
                    >
                      Change Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((player, index) => (
                    <PriceComp
                      name={player.web_name}
                      cost={player.now_cost / 10}
                      key={player.id}
                      progress={player.progress}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {filteredPlayers.length} players with ownership above 10%
        </div>
      </div>
    </div>
  );
};

export default TablePrice;

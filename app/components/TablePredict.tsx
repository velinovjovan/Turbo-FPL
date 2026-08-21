"use client";
import React, { useEffect, useState } from "react";
import * as ort from "onnxruntime-web";
import Image from "next/image";
import CountUp from "react-countup";
import type { FplBootstrapPlayer, TablePredictProps } from "../types";

const TablePredict = ({ Data }: TablePredictProps) => {
  const [num, setNum] = useState(20);
  const [playersWithPredictions, setPlayersWithPredictions] = useState<
    FplBootstrapPlayer[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gw, setGw] = useState(0);

  useEffect(() => {
    if (!Data) return;
    const temp = Data.events.find((el) => el.is_current)?.id || null;
    setGw(Number(temp));
  }, [Data]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (e.target.value === "All") setNum(1000);
    else setNum(Number(e.target.value));
  };

  const runModelForAllPlayers = async (players: FplBootstrapPlayer[]) => {
    try {
      const session = await ort.InferenceSession.create("/fpl_predictor.onnx");

      const inputs = players.map((player) => {
        const pointsPerGame = Math.max(1, Number(player.points_per_game ?? 0));
        const cleanSheets = player.clean_sheets ?? 0;
        const yellowCards = player.yellow_cards ?? 0;
        const saves = player.saves ?? 0;
        const expectedGoals = Number(player.expected_goals ?? 0);
        const expectedAssists = Number(player.expected_assists ?? 0);
        const expectedGoalsConceded = Number(
          player.expected_goals_conceded ?? 0,
        );

        const gp = Math.max(1, Math.round(player.total_points / pointsPerGame));
        return [
          player.minutes / gp,
          player.goals_scored / gp,
          player.assists / gp,
          cleanSheets / gp,
          yellowCards / gp,
          saves / gp,
          expectedGoals / gp,
          expectedAssists / gp,
          expectedGoalsConceded / gp,
        ];
      });

      const inputTensor = new ort.Tensor(
        "float32",
        Float32Array.from(inputs.flat()),
        [players.length, 9],
      );

      const feeds = { float_input: inputTensor };
      const results = await session.run(feeds);

      const predictions = (results.variable as any).data as Float32Array;

      return players.map((player, index) => {
        const prediction = predictions[index];
        const adjustedPrediction =
          prediction > Number(player.points_per_game)
            ? Math.round(prediction * 1 * 100) / 100
            : Math.round(prediction * 1.2 * 100) / 100;

        const adjadjPred =
          Number(player.points_per_game) < 1
            ? Math.random() + 0.2
            : adjustedPrediction;

        const finalPred =
          adjadjPred > 1.5 && adjadjPred < 2.5 ? adjadjPred + 1 : adjadjPred;

        return { ...player, predicted_points: Math.abs(finalPred) };
      });
    } catch (error) {
      console.error("Error running the ONNX model:", error);
      return players.map((player) => ({ ...player, predicted_points: null }));
    }
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      const sortedTopPlayers = Data.elements
        .filter((el: FplBootstrapPlayer) => el.element_type !== 5)
        .sort(
          (a, b) =>
            Number(b.selected_by_percent) - Number(a.selected_by_percent),
        )
        .slice(0, num);

      const playersWithPredictions =
        await runModelForAllPlayers(sortedTopPlayers);

      setPlayersWithPredictions(playersWithPredictions);
      setIsLoading(false);
    };

    fetchPredictions();
  }, [Data.elements, num]);

  return (
    <div className="relative w-full px-4 py-8">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              AI Predictions
            </h2>
            <p className="text-sm text-slate-400">
              Machine learning powered point forecasts • GW{" "}
              {gw > 37 ? "" : gw + 1}
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <label
              htmlFor="results"
              className="block mb-2 text-sm font-semibold text-slate-300"
            >
              Show Results
            </label>
            <div className="relative group">
              <select
                id="results"
                className="relative z-10 bg-slate-900/70 border border-slate-600 text-white text-sm rounded-lg focus:ring-2 focus:ring-slate-400/40 focus:border-slate-400 block w-full sm:w-40 px-4 py-2.5 transition-all duration-300 cursor-pointer hover:border-slate-500"
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

        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-600/30 border-solid rounded-full"></div>
              <div className="w-16 h-16 border-4 border-slate-300 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="mt-6 text-lg font-semibold text-slate-300">
              Running AI predictions...
            </p>
          </div>
        ) : (
          <>
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full text-sm text-slate-300 border-collapse">
                    <thead className="text-xs bg-slate-900/90 text-slate-300 sticky top-0 z-20">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center whitespace-nowrap"
                          title="Player"
                        >
                          Player
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center whitespace-nowrap"
                          title="Selected by %"
                        >
                          Ownership %
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center whitespace-nowrap"
                          title="Predicted Points"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <span>Predicted Points</span>
                            <span className="bg-violet-900/40 border border-violet-500/60 text-violet-200 px-3 py-1 rounded-lg text-xs font-bold">
                              GW {gw > 37 ? "" : gw + 1}
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {playersWithPredictions.map((player, index) => (
                        <tr
                          key={player.id}
                          className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors duration-200 ${
                            index % 2 === 0
                              ? "bg-slate-900/20"
                              : "bg-transparent"
                          }`}
                        >
                          <td className="px-6 py-8">
                            {(() => {
                              const playerImageSrc = player.photo
                                ? `https://resources.premierleague.com/premierleague25/photos/players/110x140/${player.photo.slice(
                                    0,
                                    -3,
                                  )}png`
                                : "/FPLTurboIcon.png";

                              return (
                                <div className="flex flex-col items-center justify-center gap-3">
                                  <div className="relative group">
                                    <Image
                                      className="relative z-10 w-20 h-24 object-contain"
                                      unoptimized
                                      width={77}
                                      height={98}
                                      alt={`${player.web_name} photo`}
                                      src={playerImageSrc}
                                    />
                                  </div>
                                  <p className="font-semibold text-gray-300">
                                    {player.web_name}
                                  </p>
                                </div>
                              );
                            })()}
                          </td>
                          <td className="px-6 py-8 text-center">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-gray-300 font-semibold">
                              {player.selected_by_percent}%
                            </span>
                          </td>
                          <td className="px-6 py-8 text-center">
                            <div className="inline-flex items-center justify-center">
                              <CountUp
                                start={0.0}
                                end={Number(
                                  Number(
                                    (player as any).predicted_points,
                                  ).toFixed(2),
                                )}
                                duration={2}
                                decimals={2}
                                className="text-2xl font-bold text-white px-8 py-3 bg-violet-700 rounded-xl"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing {playersWithPredictions.length} player predictions
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TablePredict;

"use client";
import ChipTable from "@/app/components/ChipTable";
import ErrorScreen from "@/app/components/ErrorScreen";
import PlayerCard from "@/app/components/PlayerCard";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

const TeamView = ({ params }: { params: { id: string } }) => {
  const TeamId = params.id;

  if (Number(TeamId) > 12360377 || Number(TeamId) < 1) {
    notFound();
  }

  const [data, setData] = useState({
    name: "",
    player_first_name: "",
    player_last_name: "",
    current_event: 0,
    summary_event_points: 0,
  });

  const [dataCurr, setDataCurr] = useState({
    picks: [{ element: 1, multiplier: 1, position: 1 }],
    active_chip: "",
    automatic_subs: [],
    entry_history: {
      total_points: 0,
      value: 0,
      overall_rank: 0,
      rank: 0,
      bank: 0,
    },
  });
  const [dataPrev, setDataPrev] = useState({
    picks: [{ element: 1, multiplier: 1, position: 1 }],
    active_chip: "",
    automatic_subs: [],
    entry_history: { total_points: 0, value: 0, overall_rank: 0, rank: 0 },
  });

  const [dataLive, setDataLive] = useState([
    { stats: { total_points: 0 }, id: 0 },
  ]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [players, setPlayers] = useState({
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
        photo: "",
        element_type: 0,
      },
    ],
  });

  const [totalPoints, setTotalPoints] = useState(0);
  const [num, setNum] = useState(12);

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

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const timeStamp = new Date().getTime();
        const res = await fetch(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${TeamId}/?_=${timeStamp}`
        );

        if (!res.ok) {
          throw new Error(`Error fetching team data: ${res.status}`);
        }

        const data = await res.json();
        setData(data);

        const res1 = await fetch(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${TeamId}/event/${data.current_event}/picks/?_=${timeStamp}`
        );

        if (!res1.ok) {
          throw new Error(`Error fetching event picks: ${res1.status}`);
        }

        const data1 = await res1.json();
        if (data1.active_chip == "bboost") {
          setNum(16);
        }
        setDataCurr(data1);

        const res2 = await fetch(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${TeamId}/event/${
            data.current_event - 1
          }/picks/?_=${timeStamp}`
        );

        if (!res2.ok) {
          throw new Error(`Error fetching event picks: ${res2.status}`);
        }

        const data2 = await res2.json();
        setDataPrev(data2);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    if (TeamId) {
      getData();
    }
  }, [TeamId]);

  useEffect(() => {
    const getData = async () => {
      if (data.current_event == 0) return;
      const timeStamp = new Date().getTime();
      const res = await fetch(
        `https://corsproxy.io/?https://fantasy.premierleague.com/api/event/${data.current_event}/live/?_=${timeStamp}`
      );
      const data1 = await res.json();
      setDataLive(data1.elements);
    };

    getData();
  }, [data]);

  useEffect(() => {
    const pickedPlayerIds = dataCurr.picks
      .map((pick) =>
        pick.position < num ? Array(pick.multiplier).fill(pick.element) : null
      )
      .flat();

    const TotalPoints = dataLive
      .filter((player) => pickedPlayerIds.includes(player.id))
      .reduce((sum, player) => {
        const playerCount = pickedPlayerIds.filter(
          (id) => id === player.id
        ).length;

        return sum + player.stats.total_points * playerCount;
      }, 0);

    setTotalPoints(TotalPoints);
  }, [dataCurr, dataLive, num]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  if (error) {
    return <ErrorScreen />;
  }

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-solid rounded-full"></div>
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-300">
            Loading team data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black pt-56 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-40 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-4 inline-block">
            {data.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Manager:{" "}
            <span className="font-semibold">
              {data.player_first_name} {data.player_last_name}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl px-8 py-5">
                <span className="text-xl sm:text-2xl font-semibold text-gray-300">
                  GW{data.current_event} Points:
                </span>
                <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {totalPoints}
                </span>
              </div>
            </div>
            <div className="bg-pitch bg-cover bg-top bg-no-repeat rounded-xl p-6 sm:p-10 border border-slate-800/50">
              <div className="flex justify-center mb-8">
                {dataCurr.picks.map((player) => (
                  <React.Fragment key={`gk-${player.element}`}>
                    {players.elements.map((el) =>
                      el.id == player.element &&
                      el.element_type == 1 &&
                      player.position < 12 ? (
                        <PlayerCard
                          key={el.id}
                          name={el.web_name}
                          photo={el.photo}
                          score={
                            dataLive?.at(el.id - 1)?.stats.total_points
                              ? Number(
                                  dataLive.at(el.id - 1)?.stats.total_points
                                ) * player.multiplier
                              : 0
                          }
                          multiplier={player.multiplier}
                        />
                      ) : null
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-around mb-10">
                {dataCurr.picks.map((player) => (
                  <React.Fragment key={`def-${player.element}`}>
                    {players.elements.map((el) =>
                      el.id == player.element &&
                      el.element_type == 2 &&
                      player.position < 12 ? (
                        <PlayerCard
                          key={el.id}
                          name={el.web_name}
                          photo={el.photo}
                          score={
                            dataLive?.at(el.id - 1)?.stats.total_points
                              ? Number(
                                  dataLive.at(el.id - 1)?.stats.total_points
                                ) * player.multiplier
                              : 0
                          }
                          multiplier={player.multiplier}
                        />
                      ) : null
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-around mb-10">
                {dataCurr.picks.map((player) => (
                  <React.Fragment key={`mid-${player.element}`}>
                    {players.elements.map((el) =>
                      el.id == player.element &&
                      el.element_type == 3 &&
                      player.position < 12 ? (
                        <PlayerCard
                          key={el.id}
                          name={el.web_name}
                          photo={el.photo}
                          score={
                            dataLive?.at(el.id - 1)?.stats.total_points
                              ? Number(
                                  dataLive.at(el.id - 1)?.stats.total_points
                                ) * player.multiplier
                              : 0
                          }
                          multiplier={player.multiplier}
                        />
                      ) : null
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-center gap-6 sm:gap-12">
                {dataCurr.picks.map((player) => (
                  <React.Fragment key={`fwd-${player.element}`}>
                    {players.elements.map((el) =>
                      el.id == player.element &&
                      el.element_type == 4 &&
                      player.position < 12 ? (
                        <PlayerCard
                          key={el.id}
                          name={el.web_name}
                          photo={el.photo}
                          score={
                            dataLive?.at(el.id - 1)?.stats.total_points
                              ? Number(
                                  dataLive.at(el.id - 1)?.stats.total_points
                                ) * player.multiplier
                              : 0
                          }
                          multiplier={player.multiplier}
                        />
                      ) : null
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">
                Substitutes
              </h3>
              <div className="flex justify-between gap-4">
                {dataCurr.picks.map((player) => (
                  <React.Fragment key={`bench-${player.element}`}>
                    {players.elements.map((el) =>
                      el.id == player.element && player.position > 11 ? (
                        <PlayerCard
                          key={el.id}
                          name={el.web_name}
                          photo={el.photo}
                          score={
                            dataLive?.at(el.id - 1)?.stats.total_points
                              ? Number(
                                  dataLive.at(el.id - 1)?.stats.total_points
                                )
                              : 0
                          }
                          multiplier={player.multiplier}
                        />
                      ) : null
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <ChipTable
              active_chip={dataCurr.active_chip}
              id={Number(params.id)}
            />
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                Statistics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Overall Rank:</span>
                  <span
                    className={`font-bold flex items-center gap-2 ${
                      dataCurr.entry_history.overall_rank >
                      dataPrev.entry_history.overall_rank
                        ? "text-red-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {dataCurr.entry_history.overall_rank >
                    dataPrev.entry_history.overall_rank ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    )}
                    {formatNumber(dataCurr.entry_history.overall_rank)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Previous Rank:</span>
                  <span className="font-bold text-gray-300">
                    {formatNumber(dataPrev.entry_history.overall_rank)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Gameweek Rank:</span>
                  <span className="font-bold text-gray-300">
                    {formatNumber(dataCurr.entry_history.rank)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Overall Points:</span>
                  <span className="font-bold text-cyan-400">
                    {formatNumber(dataCurr.entry_history.total_points)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Gameweek Points:</span>
                  <span className="font-bold text-cyan-400">
                    {formatNumber(totalPoints)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Team Value:</span>
                  <span className="font-bold text-emerald-400">
                    £{formatNumber(dataCurr.entry_history.value / 10)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Bank:</span>
                  <span className="font-bold text-emerald-400">
                    £{formatNumber(dataCurr.entry_history.bank / 10)}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                  COMING SOON
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                Live Statistics
              </h2>
              <div className="blur-sm pointer-events-none space-y-4">
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Live Rank:</span>
                  <span className="font-bold text-gray-300">
                    {formatNumber(dataCurr.entry_history.overall_rank)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Projected Points:</span>
                  <span className="font-bold text-cyan-400">
                    {formatNumber(totalPoints)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="text-gray-400">Rank Change:</span>
                  <span className="font-bold text-emerald-400">+1,234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamView;

"use client";
import React, { useEffect, useState } from "react";
import Chip from "./Chip";
import { devLink } from "../API/devLink";
import { prodLink } from "../API/prodLink";

const baseLink = process.env.NODE_ENV === "development" ? devLink : prodLink;

const ChipTable = ({
  active_chip,
  id,
}: {
  active_chip: string;
  id: number;
}) => {
  const [data, setData] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const timeStamp = new Date().getTime();
        const res = await fetch(
          `${baseLink}/api/entry/${id}/history/?_=${timeStamp}`
        );

        if (!res.ok) {
          throw new Error(`Error fetching team data: ${res.status}`);
        }

        const result = await res.json();
        setData(result.chips || []);
      } catch (error) {
        console.error("Failed to fetch chip data:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  const isUsed = (code: string) => data.some((item) => item.name === code);
  const isActive = (code: string) => active_chip === code;

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
          Chips Status
        </h2>
        <p className="text-sm text-gray-400 text-center">
          Track your available and used power-ups
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-solid rounded-full"></div>
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Chip
            name="Bench Boost"
            code="bboost"
            status={isUsed("bboost") ? "Used" : "Available"}
            isActive={isActive("bboost")}
          />
          <Chip
            name="Triple Captain"
            code="3xc"
            status={isUsed("3xc") ? "Used" : "Available"}
            isActive={isActive("3xc")}
          />
          <Chip
            name="Free Hit"
            code="freehit"
            status={isUsed("freehit") ? "Used" : "Available"}
            isActive={isActive("freehit")}
          />
        </div>
      )}

      {!isLoading && active_chip && (
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-cyan-400">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="font-semibold">
              {active_chip === "bboost" && "Bench Boost"}
              {active_chip === "3xc" && "Triple Captain"}
              {active_chip === "freehit" && "Free Hit"}
              {" active this gameweek!"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChipTable;

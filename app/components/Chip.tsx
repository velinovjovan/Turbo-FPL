import Image from "next/image";
import React from "react";
import type { ChipProps } from "../types";

const Chip = ({ name, code, status, isActive = false }: ChipProps) => {
  const getStatusStyles = () => {
    if (isActive) {
      return "bg-slate-600 text-white border-slate-400";
    }
    if (status === "Used") {
      return "bg-slate-700 text-slate-200 border-slate-500";
    }
    if (status === "Unavailable") {
      return "bg-slate-700 text-gray-400 border-slate-600";
    }
    return "bg-emerald-700 text-white border-emerald-500";
  };

  const getStatusIcon = () => {
    if (isActive) {
      return (
        <svg
          className="w-4 h-4"
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
      );
    }
    if (status === "Used") {
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  };

  const getStatusText = () => {
    if (isActive) return "Active Now";
    return status;
  };

  return (
    <div
      className={`group relative bg-slate-800/70 border rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
        isActive
          ? "border-slate-400"
          : status === "Used"
            ? "border-slate-700"
            : "border-emerald-600/50 hover:border-emerald-500"
      }`}
    >
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-slate-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <svg
              className="w-3 h-3 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="6" />
            </svg>
            ACTIVE
          </div>
        </div>
      )}
      <div className="relative mb-4 flex justify-center">
        <Image
          className={`relative z-10 w-16 md:w-20 lg:w-24 h-auto transition-all duration-300 ${
            isActive
              ? "opacity-90 group-hover:opacity-100 group-hover:scale-110"
              : status === "Used"
                ? "opacity-40 grayscale"
                : "opacity-90 group-hover:opacity-100 group-hover:scale-110"
          }`}
          unoptimized
          width={120}
          height={120}
          alt={`${name} chip`}
          src={`https://fantasy.premierleague.com/img/chips/${code}-120.png`}
        />
      </div>
      <h3 className="text-center text-base md:text-lg font-bold text-white mb-3">
        {name}
      </h3>
      <div
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all duration-300 ${getStatusStyles()}`}
      >
        {getStatusIcon()}
        <span>{getStatusText()}</span>
      </div>
    </div>
  );
};

export default Chip;

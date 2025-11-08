import Image from "next/image";
import React from "react";

const Chip = ({
  name,
  code,
  status,
  isActive = false,
}: {
  name: string;
  code: string;
  status: string;
  isActive?: boolean;
}) => {
  const getStatusStyles = () => {
    if (isActive) {
      return "bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/50";
    }
    if (status === "Used") {
      return "bg-gradient-to-r from-red-600 to-red-500 text-white border-red-400 shadow-lg shadow-red-500/30";
    }
    if (status === "Unavailable") {
      return "bg-slate-700 text-gray-400 border-slate-600";
    }
    return "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/30";
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
      className={`group relative bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
        isActive
          ? "border-cyan-500 shadow-lg shadow-cyan-500/30"
          : status === "Used"
          ? "border-slate-700"
          : "border-emerald-500/30 hover:border-emerald-500/50"
      }`}
    >
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
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
        <div
          className={`absolute inset-0 blur-2xl rounded-full transition-opacity duration-300 ${
            isActive
              ? "bg-cyan-500/50 opacity-100"
              : status === "Available"
              ? "bg-emerald-500/30 opacity-0 group-hover:opacity-100"
              : "opacity-0"
          }`}
        ></div>
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

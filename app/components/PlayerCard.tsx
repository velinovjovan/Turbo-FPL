import Image from "next/image";
import React from "react";
import type { PlayerCardProps } from "../types";

const PlayerCard = ({ photo, name, score, multiplier }: PlayerCardProps) => {
  const formatPlayerName = (inputString: string) => {
    let formatted = inputString;
    const hyphenIndex = formatted.indexOf("-");
    if (hyphenIndex !== -1) {
      formatted = formatted.substring(hyphenIndex + 1);
    }
    const spaceIndex = formatted.indexOf(" ");
    if (spaceIndex !== -1) {
      formatted = formatted.substring(spaceIndex + 1);
    }
    return formatted;
  };

  const isCaptain = multiplier > 1;

  return (
    <div className="group relative">
      <div
        className={`relative flex flex-col items-center w-14 sm:w-20 md:w-28 lg:w-32 rounded-2xl pt-3 pb-4 border-2 transition-all duration-300 ${
          isCaptain
            ? "bg-amber-100 border-amber-300"
            : "bg-slate-800/90 border-slate-600 hover:border-slate-500"
        }`}
      >
        {isCaptain && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="relative">
              <div className="relative bg-amber-300 text-amber-900 font-bold text-xs sm:text-sm w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 border-amber-200">
                C
              </div>
            </div>
          </div>
        )}
        <div className="relative mb-2">
          <Image
            className="relative z-10 w-10 sm:w-14 md:w-20 lg:w-24 h-auto object-contain"
            unoptimized
            width={77}
            height={98}
            alt={`${name}`}
            src={`https://resources.premierleague.com/premierleague25/photos/players/110x140/${photo.slice(
              0,
              -3,
            )}png`}
          />
        </div>
        <div
          className={`w-full px-1 sm:px-2 pt-2 border-t-2 ${
            isCaptain ? "border-yellow-700" : "border-slate-600"
          }`}
        >
          <p
            className={`font-bold text-center text-[10px] sm:text-xs md:text-sm truncate ${
              isCaptain ? "text-amber-900" : "text-white"
            }`}
          >
            {formatPlayerName(name)}
          </p>
        </div>
      </div>
      <div
        className={`absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 min-w-[40px] sm:min-w-[48px] px-2 sm:px-3 py-1 rounded-full text-center font-bold text-xs sm:text-sm transition-all duration-300 ${
          score > 5
            ? "bg-emerald-700 text-white"
            : score < 0
              ? "bg-red-700 text-white"
              : score > 0
                ? "bg-slate-600 text-white"
                : "bg-slate-700 text-gray-300 border border-slate-600"
        }`}
      >
        {score}
      </div>
    </div>
  );
};

export default PlayerCard;

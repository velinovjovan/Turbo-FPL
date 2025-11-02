import Image from "next/image";
import React from "react";

const PlayerCard = ({
  photo,
  name,
  score,
  multiplier,
}: {
  photo: string;
  name: string;
  score: number;
  multiplier: number;
}) => {
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
            ? "bg-gradient-to-b from-yellow-400/90 to-yellow-500/90 border-yellow-600 shadow-lg shadow-yellow-500/50"
            : "bg-slate-800/90 border-slate-600 hover:border-slate-500"
        } backdrop-blur-sm`}
      >
        {isCaptain && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-md rounded-full"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 font-bold text-xs sm:text-sm w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-lg">
                C
              </div>
            </div>
          </div>
        )}
        <div className="relative mb-2">
          <div
            className={`absolute inset-0 blur-xl rounded-full ${
              isCaptain ? "bg-yellow-400/50" : "bg-cyan-500/30"
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>
          <Image
            className="relative z-10 w-10 sm:w-14 md:w-20 lg:w-24 h-auto object-contain"
            unoptimized
            width={77}
            height={98}
            alt={`${name}`}
            src={`https://resources.premierleague.com/premierleague25/photos/players/110x140/${photo.slice(
              0,
              -3
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
              isCaptain ? "text-yellow-900" : "text-white"
            }`}
          >
            {formatPlayerName(name)}
          </p>
        </div>
      </div>
      <div
        className={`absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 min-w-[40px] sm:min-w-[48px] px-2 sm:px-3 py-1 rounded-full text-center font-bold text-xs sm:text-sm transition-all duration-300 ${
          score > 5
            ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/50"
            : score < 0
            ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/50"
            : score > 0
            ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/50"
            : "bg-slate-700 text-gray-300 border border-slate-600"
        }`}
      >
        {score}
      </div>
    </div>
  );
};

export default PlayerCard;

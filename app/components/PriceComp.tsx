import React from "react";

const PriceComp = ({
  name,
  cost,
  progress,
  index,
}: {
  name: string;
  cost: number;
  progress: number;
  index?: number;
}) => {
  const isRise = progress >= 0;
  const absProgress = Math.abs(progress);
  const progressWidth = absProgress < 100 ? absProgress : 100;

  const getChangeTime = () => {
    if (absProgress > 90) return "Today";
    if (absProgress < 50) return "> Week";
    return "This Week";
  };

  return (
    <tr
      className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors duration-200 ${
        index !== undefined && index % 2 === 0
          ? "bg-slate-900/20"
          : "bg-transparent"
      }`}
    >
      <td className="px-6 py-4 text-left font-semibold text-gray-300 whitespace-nowrap w-64">
        {name}
      </td>
      <td className="px-6 py-4 text-center font-medium text-gray-400 w-32">
        £{cost.toFixed(1)}
      </td>
      <td className="px-6 py-4 w-40">
        <div className="flex items-center gap-3">
          <div
            className={`flex-1 bg-slate-800/50 rounded-full h-6 overflow-hidden ${
              !isRise ? "flex flex-row-reverse" : ""
            }`}
          >
            <div
              className={`h-6 rounded-full transition-all duration-500 flex items-center justify-center ${
                isRise
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500"
                  : "bg-gradient-to-r from-red-600 to-red-500"
              }`}
              style={{
                width: `${progressWidth}%`,
              }}
            >
              {progressWidth > 20 && (
                <span className="text-xs font-bold text-white px-2">
                  {Number(absProgress.toFixed(0)) > 100
                    ? 100
                    : absProgress.toFixed(0)}
                  %
                </span>
              )}
            </div>
          </div>
          <div
            className={`flex-shrink-0 ${
              isRise ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isRise ? (
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
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-center w-40">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            absProgress > 90
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : absProgress < 50
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
          }`}
        >
          {absProgress > 90 && (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {getChangeTime()}
        </span>
      </td>
    </tr>
  );
};

export default PriceComp;

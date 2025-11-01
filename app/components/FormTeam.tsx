"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormTeam = () => {
  const [id, setId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    if (errorMsg) setErrorMsg("");
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const teamId = parseInt(id);

    if (teamId && teamId < 12360377 && teamId >= 1) {
      setIsLoading(true);
      router.push(`my-team/${teamId}`);
    } else {
      setErrorMsg("Team Not Found! Please enter a valid FPL ID.");
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto px-4 py-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <form className="relative z-10" onSubmit={handleOnSubmit}>
        <div className="mb-8 text-center">
          <label
            htmlFor="fpl-id-input"
            className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white mb-3"
          >
            Enter your FPL ID
          </label>
          <p className="text-sm text-gray-400">
            Find your ID in the FPL website URL or app
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            <input
              id="fpl-id-input"
              type="number"
              className="relative z-10 bg-slate-900/50 backdrop-blur-sm border border-slate-700 text-white text-base rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 block w-full sm:w-64 px-4 py-3 placeholder-gray-500 transition-all duration-300"
              placeholder="e.g. 1234567"
              required
              value={id}
              onChange={handleOnChange}
              min="1"
              max="12360377"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-semibold rounded-lg text-base px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                View Team
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
          Don&apos;t know your ID? Visit{" "}
          <a
            href="https://fantasy.premierleague.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            fantasy.premierleague.com
          </a>
        </p>
      </form>
      {errorMsg && (
        <div className="mt-6 animate-shake">
          <div className="relative z-10 bg-red-950/50 backdrop-blur-sm border border-red-800/50 rounded-lg p-4 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-200 text-sm font-medium">{errorMsg}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FormTeam;

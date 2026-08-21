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
      <form className="relative z-10" onSubmit={handleOnSubmit}>
        <div className="mb-8 text-center">
          <label
            htmlFor="fpl-id-input"
            className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3"
          >
            Enter your FPL ID
          </label>
          <p className="text-sm text-slate-400">
            Find your ID in the FPL website URL or app
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
          <div className="relative group">
            <input
              id="fpl-id-input"
              type="number"
              className="relative z-10 bg-slate-900/70 border border-slate-600 text-white text-base rounded-lg focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 block w-full sm:w-64 px-4 py-3 placeholder-slate-500 transition-all duration-300"
              placeholder="e.g. 1234567"
              required
              value={id}
              onChange={handleOnChange}
              min="1"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center gap-2 text-white bg-teal-700 hover:bg-teal-600 font-semibold rounded-lg text-base px-6 py-3 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            className="text-teal-300 hover:text-teal-200 underline"
          >
            fantasy.premierleague.com
          </a>
        </p>
      </form>
      {errorMsg && (
        <div className="mt-6 animate-shake">
          <div className="relative z-10 bg-red-950/30 border border-red-700/40 rounded-lg p-4 flex items-start gap-3">
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

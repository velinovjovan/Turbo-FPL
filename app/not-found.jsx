"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center pt-40">
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl sm:text-[9rem] lg:text-[11rem] font-semibold text-slate-300 leading-none">
            404
          </h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Oops! The page you&apos;re looking for seems to have been
            transferred out. Let&apos;s get you back in the game.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 text-white bg-teal-700 hover:bg-teal-600 font-semibold rounded-lg text-base px-8 py-4 transition-all duration-300 hover:scale-105"
          >
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </Link>

          <Link
            href="/my-team"
            className="group relative inline-flex items-center gap-2 text-slate-300 bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 hover:border-slate-500 font-semibold rounded-lg text-base px-8 py-4 transition-all duration-300 hover:scale-105"
          >
            View My Team
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
          </Link>
        </div>
        <div className="pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500 mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/opta-stats"
              className="text-sm text-slate-400 hover:text-sky-300 transition-colors duration-300"
            >
              Opta Stats
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/price-changes"
              className="text-sm text-slate-400 hover:text-emerald-300 transition-colors duration-300"
            >
              Price Changes
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/predicted-points"
              className="text-sm text-slate-400 hover:text-violet-300 transition-colors duration-300"
            >
              Predicted Points
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden flex items-center justify-center pt-40">
      <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="mb-8 animate-bounce-slow">
          <h1 className="text-9xl sm:text-[12rem] lg:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 leading-none">
            404
          </h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
            Oops! The page you&apos;re looking for seems to have been
            transferred out. Let&apos;s get you back in the game.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 text-white bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 font-semibold rounded-lg text-base px-8 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:scale-105"
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
            className="group relative inline-flex items-center gap-2 text-gray-300 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 font-semibold rounded-lg text-base px-8 py-4 transition-all duration-300 hover:scale-105"
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
          <p className="text-sm text-gray-500 mb-4">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/opta-stats"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              Opta Stats
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/price-changes"
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-300"
            >
              Price Changes
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              href="/predicted-points"
              className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300"
            >
              Predicted Points
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;

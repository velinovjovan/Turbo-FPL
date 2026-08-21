import React from "react";
import type { MenuIconProps } from "../types";

const MenuIcon: React.FC<MenuIconProps> = ({ navbar, setNavbar }) => {
  return (
    <div className="md:hidden">
      <button
        className="relative p-2 rounded-lg outline-none focus:ring-2 focus:ring-slate-500/60 transition-all duration-300 group"
        onClick={() => setNavbar(!navbar)}
        aria-label={navbar ? "Close menu" : "Open menu"}
        aria-expanded={navbar}
      >
        <div className="absolute inset-0 bg-slate-700/40 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
        {navbar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-8 text-slate-200 relative z-10 transform group-hover:rotate-90 transition-transform duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-8 text-white relative z-10 group-hover:text-slate-300 transition-colors duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MenuIcon;

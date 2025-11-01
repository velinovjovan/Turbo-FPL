import React from "react";

interface Props {
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  navbar: boolean;
}

const MenuIcon: React.FC<Props> = ({ navbar, setNavbar }) => {
  return (
    <div className="md:hidden">
      <button
        className="relative p-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 group"
        onClick={() => setNavbar(!navbar)}
        aria-label={navbar ? "Close menu" : "Open menu"}
        aria-expanded={navbar}
      >
        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
        {navbar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-8 text-cyan-400 relative z-10 transform group-hover:rotate-90 transition-transform duration-300"
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
            className="size-8 text-white relative z-10 group-hover:text-cyan-400 transition-colors duration-300"
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

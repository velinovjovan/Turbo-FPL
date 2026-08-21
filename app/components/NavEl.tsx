import Link from "next/link";
import React from "react";
import type { NavElProps } from "../types";

const NavEl: React.FC<NavElProps> = ({ setNavbar, children, path }) => {
  return (
    <li className="group relative text-base lg:text-lg py-3 px-5 lg:px-6 text-center transition-all duration-300 z-100">
      <Link
        href={`/${path}`}
        onClick={() => setNavbar(false)}
        className="block relative z-10 font-semibold tracking-wide text-slate-300 group-hover:text-slate-100 transition-colors duration-300"
      >
        {children}
        <span className="hidden md:block absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400/80 group-hover:w-full transition-all duration-500 ease-out"></span>
        <span className="hidden md:block absolute inset-0 bg-teal-900/25 opacity-0 group-hover:opacity-100 rounded-lg transition-all duration-300 -z-10"></span>
      </Link>
      <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-slate-700"></div>
    </li>
  );
};

export default NavEl;

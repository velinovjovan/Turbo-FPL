import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  path: string;
}

const NavEl: React.FC<Props> = ({ setNavbar, children, path }) => {
  return (
    <li className="group relative text-base lg:text-lg py-3 px-5 lg:px-6 text-center transition-all duration-300 z-100">
      <Link
        href={`/${path}`}
        onClick={() => setNavbar(false)}
        className="block relative z-10 font-semibold tracking-wide text-gray-200 group-hover:text-white transition-colors duration-300"
      >
        {children}
        <span className="hidden md:block absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-700 ease-out"></span>
        <span className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-all duration-300 -z-10"></span>
      </Link>
      <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
    </li>
  );
};

export default NavEl;

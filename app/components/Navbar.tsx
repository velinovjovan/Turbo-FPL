"use client";

import { useState } from "react";
import MenuIcon from "./MenuIcon";
import Logo from "./Logo";
import NavMain from "./NavMain";
import NavEl from "./NavEl";

function NavBar() {
  const [navbar, setNavbar] = useState<boolean>(false);

  return (
    <nav
      className={`w-full ${
        navbar ? "h-fit" : "h-24"
      }  bg-gradient-to-r from-slate-950 via-black to-slate-950 fixed top-0 inset-x-0 z-50 backdrop-blur-sm bg-opacity-95 border-b border-slate-800/50`}
      aria-label="Main navigation"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="justify-between px-4 ml-auto mr-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Logo />
            <MenuIcon setNavbar={setNavbar} navbar={navbar} />
          </div>
        </div>
        <div>
          <NavMain navbar={navbar}>
            <NavEl setNavbar={setNavbar} path="my-team">
              My Team
            </NavEl>
            <NavEl setNavbar={setNavbar} path="opta-stats">
              Opta Stats
            </NavEl>
            <NavEl setNavbar={setNavbar} path="price-changes">
              Price Changes
            </NavEl>
            <NavEl setNavbar={setNavbar} path="predicted-points">
              Predicted Points
            </NavEl>
          </NavMain>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

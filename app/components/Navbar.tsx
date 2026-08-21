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
      } fixed top-0 inset-x-0 z-50 border-b border-slate-700/70 bg-slate-950/95 backdrop-blur`}
      aria-label="Main navigation"
    >
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

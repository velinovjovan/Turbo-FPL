import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  navbar: boolean;
}

const NavMain: React.FC<Props> = ({ children, navbar }) => {
  return (
    <div
      className={`flex-1 justify-self-center pb-3 mt-8 md:pb-0 md:mt-0 md:block transition-all duration-300 ease-in-out ${
        navbar
          ? "p-8 md:p-0 block opacity-100"
          : "hidden md:block opacity-0 md:opacity-100"
      }`}
    >
      <ul className="h-screen md:h-auto items-center justify-center md:flex gap-2 lg:gap-4">
        {children}
      </ul>
    </div>
  );
};

export default NavMain;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="group relative inline-block"
      aria-label="Go to homepage"
    >
      <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      <Image
        src="/FPLTurboIcon.png"
        width={50}
        height={50}
        alt="FPL Turbo Logo"
        className="relative z-10 transform group-hover:scale-110 transition-transform duration-300"
      />
    </Link>
  );
};

export default Logo;

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
      <Image
        src="/FPLTurboIcon.png"
        width={50}
        height={50}
        alt="FPL Turbo Logo"
        className="relative z-10 transform group-hover:scale-105 transition-transform duration-300"
      />
    </Link>
  );
};

export default Logo;

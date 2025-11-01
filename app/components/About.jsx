import React from "react";
import CardSection from "./CardSection";
import Exp from "./Exp";

const About = () => {
  return (
    <section className="relative bg-gradient-to-b from-black via-slate-950 to-black py-20 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="relative max-w-[100rem] mx-auto px-4 pb-20">
        <Exp />
        <CardSection />
      </div>
    </section>
  );
};

export default About;

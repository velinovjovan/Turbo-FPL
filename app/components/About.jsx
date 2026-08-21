import React from "react";
import CardSection from "./CardSection";
import Exp from "./Exp";

const About = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative max-w-[100rem] mx-auto px-4 pb-20">
        <Exp />
        <CardSection />
      </div>
    </section>
  );
};

export default About;

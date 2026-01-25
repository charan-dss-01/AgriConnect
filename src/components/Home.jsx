import React from "react";
import Hero from "../home/Hero";
import Fruits from "../home/Fruits";
import Vegetables from "../home/Vegetables";
import Creator from "../home/Creator";

export default function Home() {
  return (
    <div>
      <Hero />
      <Fruits />
      <Vegetables />
      <Creator />
    </div>
  );
}

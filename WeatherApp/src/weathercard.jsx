import React from "react";
import Statblock from "./statblock";
import { useState } from "react";

const Weathercard = () => {
  const [city, setCity] = useState("Moscow");
  const [temp, setTemp] = useState(22);

  return (
    <div>
      <h2>City</h2>
      <h1>25°C</h1>
      <Statblock />
    </div>
  );
};

export default Weathercard;

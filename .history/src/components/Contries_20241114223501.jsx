import React from "react";
import Country from "./Contry";

export default function Countries ({ countries }) {
  return (
    <div>
      {countries.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </div>
  );
};





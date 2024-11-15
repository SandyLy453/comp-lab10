import React from "react";

export default function Country({ country }) {
  return (
    <div className="cardContainer">
      <img src={country.flags.svg} alt={country.name.common} className="cardPhoto" />
      <div className="cardText">
        <h3 className="cardTitle">{country.name.common}</h3>
        <p className="cardInfo">Capital: {country.capital ? country.capital[0] : "N/A"}</p>
        <p className="cardInfo">Population: {country.population.toLocaleString()}</p>
        <p className="cardInfo">Area: {country.area.toLocaleString()} km²</p>
        <p className="cardInfo">Continent: {country.continents[0]}</p>
        <p className="cardInfo">Subregion: {country.subregion || "N/A"}</p>
      </div>
    </div>
  );
};




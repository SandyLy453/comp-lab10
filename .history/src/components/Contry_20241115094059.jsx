

export default function Country({ country }) {

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => `${currency.name} (${currency.symbol || ""})`)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <div className="cardContainer">
      <img src={country.flags.svg} alt={country.name.common} className="cardPhoto" />
      <div className="cardText">
        <h3 className="cardTitle">{country.name.common}</h3>
        <hr className="breaker"/>
        <p className="cardInfo"> <span>Official Name:</span> {country.name.official}</p>
        <p className="cardInfo"> <span>Capital:</span> {country.capital ? country.capital[0] : "N/A"}</p>
        <p className="cardInfo"> <span>Population:</span> {country.population.toLocaleString()}</p>
        <p className="cardInfo"> <span>Languages:</span> {languages}</p>
        <p className="cardInfo"> <span>Currency:</span> {currencies}</p>
        <p className="cardInfo"> <span>Area:</span> {country.area.toLocaleString()} km²</p>
        <p className="cardInfo"> <span>Continent:</span> {country.continents[0]}</p>
        <p className="cardInfo"> <span>Subregion:</span> {country.subregion || "N/A"}</p>
      </div>
      <a
          href={`https://www.google.com/maps/search/?api=1&query=${country.latlng[0]},${country.latlng[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cardLink"
        >
          View on Google Maps
        </a>
    </div>
  );
};




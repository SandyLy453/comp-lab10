import { useState, useEffect } from 'react'
import Countries from './components/Contries'

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState({ continent: "", subregion: "" });

  useEffect(() => {
    // Fetch data from the Rest Countries API
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data); // Initialize with all countries
    };

    fetchData();
  }, []);

  const handleFilter = (type, value) => {
    if (type === "all") {
      setFilter({ continent: "", subregion: "" });
      setFilteredCountries(countries); // Reset to show all countries
      return;
    }

    let updatedCountries = [...countries];

    if (type === "continent") {
      setFilter({ continent: value, subregion: "" });
      updatedCountries = updatedCountries.filter(
        (country) => country.continents[0] === value
      );
    } else if (type === "subregion") {
      setFilter({ continent: "", subregion: value });
      updatedCountries = updatedCountries.filter(
        (country) => country.subregion === value
      );
    }

    setFilteredCountries(updatedCountries);
  };

  const handleTop10 = (criteria) => {
    const sortedCountries = [...filteredCountries].sort((a, b) =>
      criteria === "population"
        ? b.population - a.population
        : b.area - a.area
    );
    setFilteredCountries(sortedCountries.slice(0, 10));
  };

  const handleSort = () => {
    const sortedCountries = [...filteredCountries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    setFilteredCountries(sortedCountries);
  };

  return (
    <>
      <div className="container">
        <h1>Countries of the World</h1>
        <div>
        <button onClick={() => handleFilter("all", "")}>All</button>
          <button onClick={() => handleFilter("continent", "Asia")}>Asia</button>
          <button onClick={() => handleFilter("continent", "Africa")}>Africa</button>
          <button onClick={() => handleFilter("subregion", "Southern Asia")}>Southern Asia</button>
          <button onClick={() => handleFilter("subregion", "Western Europe")}>Western Europe</button>
          <button onClick={() => handleTop10("population")}>Top 10 by Population</button>
          <button onClick={() => handleTop10("area")}>Top 10 by Area</button>
          <button onClick={handleSort}>Sort Alphabetically</button>
        </div>
        <Countries countries={filteredCountries} />
      </div>
    </>
  )
}

export default App

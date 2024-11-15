import { useState, useEffect } from 'react'
import Countries from './components/Contries'

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState({ continent: "", subregion: "" });

  const uniqueContinents = [
    ...new Set(countries.map((country) => country.continents?.[0])),
  ].filter(Boolean); // Remove undefined values

  const uniqueSubregions = [
    ...new Set(countries.map((country) => country.subregion)),
  ].filter(Boolean); // Remove undefined values

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
    let updatedCountries = [...countries];

    if (type === "all") {
      setFilter({ continent: "", subregion: "" });
      setFilteredCountries(countries); // Reset to all countries
      return;
    }

    if (type === "continent") {
      setFilter({ ...filter, continent: value, subregion: "" });
      updatedCountries = updatedCountries.filter(
        (country) => country.continents[0] === value
      );
    } else if (type === "subregion") {
      setFilter({ ...filter, continent: "", subregion: value });
      updatedCountries = updatedCountries.filter(
        (country) => country.subregion === value
      );
    }

    setFilteredCountries(updatedCountries);
  };

  const handleTop10 = (criteria) => {
    if (!criteria) {
      setFilteredCountries(countries); // Reset if no selection
      return;
    }
    const sortedCountries = [...filteredCountries].sort((a, b) =>
      criteria === "population"
        ? b.population - a.population
        : b.area - a.area
    );
    setFilteredCountries(sortedCountries.slice(0, 10)); // Limit to top 10
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
          <button onClick={handleSort}>Sort Alphabetically</button>
          <select
          value={filter.continent}
          onChange={(e) => handleFilter("continent", e.target.value)}
          >
          <option value="">Filter by Continent</option>
          {uniqueContinents.map((continent, index) => (
            <option key={index} value={continent}>
              {continent}
            </option>
          ))}
          </select>
          <select
            value={filter.subregion}
            onChange={(e) => handleFilter("subregion", e.target.value)}
          >
            <option value="">Filter by Subregion</option>
            {uniqueSubregions.map((subregion, index) => (
              <option key={index} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>

          <select onChange={(e) => handleTop10(e.target.value)}>
            <option value="">Top 10</option>
            <option value="population">Top 10 by Population</option>
            <option value="area">Top 10 by Area</option>
          </select>
        </div>
        <Countries countries={filteredCountries} />
      </div>
    </>
  )
}

export default App

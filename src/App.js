import "./App.css";
import { useEffect, useState } from "react";
import { fetchInfo } from "./lib/apis";
import { getComplementUrl } from "./helper";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [continent, setContinent] = useState("");
  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line
  }, [query, continent]);

  const fetchAllData = () => {
    const complement = getComplementUrl(query, continent);
    fetchInfo(complement)
      .then(({ data }) => {
        setCountries(data || []);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (e) => {
    setContinent(e.target.value);
    setQuery("");
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
    setContinent("");
  };
  // Africa, Americas, Asia, Europe, Oceania
  return (
    <>
      <div id="menu">
        <div className="hamburger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="menu-inner">
          <ul>
            <li>
              Search By Countries
              <input
                type="text"
                placeholder="Search Countries"
                value={query}
                onChange={(e) => handleQuery(e)}
              />
            </li>
            <li>
              Search By Continents
              <select
                id="continent"
                onChange={(e) => handleSelect(e)}
                value={continent}
              >
                <option value="select">Select</option>
                <option value="europe">Europe</option>
                <option value="americas">America</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="oceania">Oceania</option>
              </select>
            </li>
          </ul>
        </div>
        <svg version="1.1" id="blob" xmlns="http://www.w3.org/2000/svg">
          <path
            id="blob-path"
            d="M60,500H0V0h60c0,0,20,172,20,250S60,900,60,500z"
          />
        </svg>
      </div>
      <div className="main-container">
        <table className="my-table">
          <tr>
            <th>Country Name</th>
            <th>Capital</th>
            <th>Flag</th>
            <th>Population</th>
            <th>Currency</th>
            <th>Subregion</th>
          </tr>
          {countries.map(
            ({ name, capital, flag, population, subregion, currencies }) => {
              return (
                <tr>
                  <td>{name}</td>
                  <td>{capital}</td>
                  <td>
                    <img
                      src={flag}
                      alt={name}
                      style={{ height: "32px", width: "40px" }}
                    />
                  </td>
                  <td>{population}</td>
                  <td>{currencies[0].name}</td>
                  <td>{subregion}</td>
                </tr>
              );
            }
          )}
        </table>
      </div>
    </>
  );
}

export default App;

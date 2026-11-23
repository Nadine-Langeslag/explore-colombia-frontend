import "./search.css";

import destinations from "../../data/destinations";
import places from "../../data/places";
import DestinationCard from "../DestinationCard/DestinationCard.jsx";

import { useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      handleClear();
      return;
    }

    const destinationResults = destinations
      .filter((destination) =>
        destination.name.toLowerCase().includes(normalizedSearch)
      )
      .map((destination) => ({
        ...destination,
        type: "destination",
      }));

    const placeResults = places
      .filter((place) => place.name.toLowerCase().includes(normalizedSearch))
      .map((place) => ({
        ...place,
        type: "place",
      }));

    const allResults = [...destinationResults, ...placeResults];

    setSearchResults(allResults);
    onSearchResults(allResults);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchResults([]);
    onSearchResults([]);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="search"
          placeholder="Search destinations or attractions..."
          aria-label="Search destinations or attractions"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button className="search__button" type="submit">
          Search
        </button>

        {(searchTerm || searchResults.length > 0) && (
          <button
            className="search__clear-button"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </form>

      {searchResults.length > 0 && (
        <div className="search__results">
          {searchResults.map((result) => {
            const destinationId =
              result.type === "destination" ? result.id : result.destination;

            return result.type === "destination" ? (
              <DestinationCard key={result.id} destination={result} />
            ) : (
              <Link
                to={`/destinations/${destinationId}`}
                className="search__place-result"
                key={`${result.type}-${result.id}`}
              >
                <img
                  src={result.image}
                  alt={result.name}
                  className="search__place-image"
                />

                <h3 className="search__place-name">{result.name}</h3>

                <p className="search__place-category">{result.category}</p>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Search;

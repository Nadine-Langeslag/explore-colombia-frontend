import "./main.css";

import Hero from "./../Hero/Hero.jsx";
import heroImage from "../../images/hero/hero-cocora-valley.jpg";
import Destinations from "../Destinations/Destinations.jsx";
import Search from "../Search/Search.jsx";

import { useState } from "react";

const Main = () => {
  const [hasSearchResults, setHasSearchResults] = useState(false);

  return (
    <main className="main">
      <Hero
        title="Discover Colombia"
        subtitle="Explore Colombia's cities, landscapes, culture, and natural wonders."
        image={heroImage}
      />
      <Search
        onSearchResults={(results) => setHasSearchResults(results.length > 0)}
      />
      {!hasSearchResults && <Destinations />}
    </main>
  );
};

export default Main;

import "./main.css";
import Hero from "./../Hero/Hero.jsx";
import Destinations from "../Destinations/Destinations.jsx";

const Main = () => {
  return (
    <main className="main">
      <Hero
        title="Discover Colombia"
        subtitle="Explore Colombia's cities, landscapes, culture, and natural wonders."
        image="/images/colombia-hero.jpg"
      />
      <Destinations />
    </main>
  );
};

export default Main;

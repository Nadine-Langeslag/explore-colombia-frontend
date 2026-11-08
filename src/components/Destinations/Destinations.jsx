import "./destinations.css";
import DestinationCard from "../DestinationCard/DestinationCard.jsx";
import destinations from "../../data/destinations.js";

const Destinations = () => {
  return (
    <section className="destinations">
      {destinations.map((destination) => (
        <DestinationCard key={destination.name} destination={destination} />
      ))}
    </section>
  );
};

export default Destinations;

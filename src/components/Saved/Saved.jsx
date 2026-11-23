import "./saved.css";

import { useSavedItems } from "../../contexts/useSavedItems.js";
import destinations from "../../data/destinations.js";
import places from "../../data/places.js";
import DestinationCard from "../../components/DestinationCard/DestinationCard.jsx";
import PlaceCard from "../../components/PlaceCard/PlaceCard.jsx";
import { useAuth } from "../../contexts/useAuth.js";
import Hero from "../Hero/Hero.jsx";
import heroImage from "../../images/hero/magdalena-river-hero.jpg";

const Saved = () => {
  const { savedItems, isLoading } = useSavedItems();
  const { currentUser } = useAuth();

  const savedDestinations = destinations.filter((destination) =>
    savedItems.some(
      (item) =>
        item.itemId === destination.id && item.itemType === "destination"
    )
  );

  const savedPlaces = places.filter((place) =>
    savedItems.some(
      (item) => item.itemId === place.id && item.itemType === "place"
    )
  );

  return (
    <section className="saved">
      <Hero
        title={`Welcome back, ${currentUser.name}!`}
        subtitle="Continue exploring Colombia and keep track of the places you love."
        image={heroImage}
      />

      {isLoading && (
        <div className="saved__loading">
          <p>Loading your saved places...</p>
        </div>
      )}

      {!isLoading && savedItems.length === 0 && (
        <div className="saved__empty">
          <h2>Your collection is waiting!</h2>
          <p>
            You haven't saved any places yet. Explore Colombia and bookmark the
            destinations and attractions you'd love to visit.
          </p>
        </div>
      )}

      {!isLoading && savedDestinations.length > 0 && (
        <div className="saved__section">
          <h2>Destinations</h2>

          <div className="saved__grid">
            {savedDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && savedPlaces.length > 0 && (
        <div className="saved__section">
          <h2>Attractions</h2>

          <div className="saved__grid">
            {savedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Saved;

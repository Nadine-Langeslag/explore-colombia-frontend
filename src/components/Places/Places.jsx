import "./places.css";

import { useEffect, useState } from "react";

import PlaceCard from "../PlaceCard/PlaceCard.jsx";
import places from "../../data/places.js";
import PlaceModal from "../PlaceModal/PlaceModal.jsx";
import { getPlaceCoordinates } from "../../utils/api.js";
import Preloader from "../Preloader/Preloader.jsx";

const Places = ({ destinationId, destinationName }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placesWithCoordinates, setPlacesWithCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaceCoordinates = async () => {
      setError("");
      setIsLoading(true);

      try {
        const destinationPlaces = places.filter(
          (place) => place.destination === destinationId
        );

        const results = await Promise.allSettled(
          destinationPlaces.map(async (place) => {
            const location = await getPlaceCoordinates(
              place.name,
              destinationName
            );

            return {
              ...place,
              coordinates: {
                lat: location.lat,
                lon: location.lon,
              },
            };
          })
        );

        const updatedPlaces = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);

        const failedCount = results.filter(
          (result) => result.status === "rejected"
        ).length;

        if (failedCount > 0 && updatedPlaces.length > 0) {
          setError(
            "Some attractions could not be loaded. Please refresh the page to try again."
          );
        }

        if (updatedPlaces.length === 0) {
          setError(
            "We couldn't load the attractions. Please refresh the page to try again."
          );
        }

        setPlacesWithCoordinates(updatedPlaces);
      } catch (error) {
        console.error(error);
        setError("Something went wrong while loading attractions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceCoordinates();
  }, [destinationId, destinationName]);

  /* console.log("Places with coordinates:", placesWithCoordinates); */

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      {error && (
        <p className="places__error" role="alert">
          {error}
        </p>
      )}

      <section className="places">
        {placesWithCoordinates.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onOpen={(place) => {
              setSelectedPlace(place);
            }}
          />
        ))}
      </section>

      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </>
  );
};

export default Places;

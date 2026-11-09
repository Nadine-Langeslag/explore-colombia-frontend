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

  const destinationPlaces = places.filter(
    (place) => place.destination === destinationId
  );
  useEffect(() => {
    const fetchPlaceCoordinates = async () => {
      try {
        const updatedPlaces = await Promise.all(
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

        setPlacesWithCoordinates(updatedPlaces);
      } catch (error) {
        console.error(error);
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

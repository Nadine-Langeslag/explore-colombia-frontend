import "./placePage.css";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getPlaceCoordinates, searchNearbyPlaces } from "../../utils/api.js";

import destinations from "../../data/destinations.js";
import places from "../../data/places.js";
import Hero from "../Hero/Hero.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import Experiences from "../Experiences/Experiences.jsx";

const PlacePage = () => {
  const { destinationId, placeId } = useParams();

  const destination = destinations.find((item) => item.id === destinationId);

  const place = places.find(
    (item) => item.id === placeId && item.destination === destinationId
  );

  const [coordinates, setCoordinates] = useState(null);
  const [coordinateError, setCoordinateError] = useState(false);
  const [coordinateRetry, setCoordinateRetry] = useState(0);

  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [isLoadingNearby, setIsLoadingNearby] = useState(false);
  const [nearbyError, setNearbyError] = useState(false);
  const [visibleNearbyCount, setVisibleNearbyCount] = useState(3);
  const [nearbyRetry, setNearbyRetry] = useState(0);

  useEffect(() => {
    if (!place || !destination) return;

    let isActive = true;

    const fetchCoordinates = async () => {
      setCoordinates(null);
      setCoordinateError(false);

      try {
        const location = await getPlaceCoordinates(
          place.name,
          destination.name
        );

        if (isActive) {
          setCoordinates({
            lat: location.lat,
            lon: location.lon,
          });
        }
      } catch (error) {
        console.error("Unable to load attraction coordinates:", error);

        if (isActive) {
          setCoordinateError(true);
        }
      }
    };

    fetchCoordinates();

    return () => {
      isActive = false;
    };
  }, [place, destination, coordinateRetry]);

  useEffect(() => {
    if (!coordinates || !place) return;

    let isActive = true;

    const fetchNearbyPlaces = async () => {
      setIsLoadingNearby(true);
      setNearbyPlaces([]);
      setVisibleNearbyCount(3);
      setNearbyError(false);

      try {
        const results = await searchNearbyPlaces(
          ["entertainment.museum"],
          coordinates.lat,
          coordinates.lon
        );

        if (isActive) {
          const filteredResults = results.filter(
            (item) =>
              item.properties.name &&
              item.properties.name.toLowerCase() !== place.name.toLowerCase()
          );

          setNearbyPlaces(filteredResults);
        }
      } catch (error) {
        console.error("Unable to load nearby places:", error);

        if (isActive) {
          setNearbyError(true);
        }
      } finally {
        if (isActive) {
          setIsLoadingNearby(false);
        }
      }
    };

    fetchNearbyPlaces();

    return () => {
      isActive = false;
    };
  }, [coordinates, place, nearbyRetry]);

  if (!destination || !place) {
    return (
      <main className="place-page">
        <section className="place-page__not-found">
          <h1>Attraction not found</h1>
          <p>The attraction you're looking for doesn't exist.</p>
          <Link to="/">Back to destinations</Link>
        </section>
      </main>
    );
  }

  if (!coordinates && !coordinateError) {
    return <Preloader />;
  }

  return (
    <main className="place-page">
      <Hero title={place.name} subtitle={place.category} image={place.image} />

      <section className="place-page__description">
        <p>{place.description}</p>
      </section>
      <Experiences itemId={place.id} itemType="place" />
      {coordinateError && (
        <div className="place-page__error">
          <p role="alert">
            We couldn't load the location of this attraction. Please try again.
          </p>

          <button
            type="button"
            className="place-page__retry-button"
            onClick={() => setCoordinateRetry((count) => count + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {coordinates && (
        <>
          <iframe
            src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lon}&output=embed`}
            title={`Map showing ${place.name}`}
            loading="lazy"
            className="place-page__map"
          />

          <section className="place-page__nearby">
            <h2 className="place-page__nearby-title">
              Other places of interest nearby
            </h2>

            {isLoadingNearby && (
              <p className="place-page__nearby-message">
                Finding nearby places...
              </p>
            )}

            {nearbyError && (
              <div className="place-page__nearby-error">
                <p role="alert">
                  We couldn't load nearby places. Please try again.
                </p>

                <button
                  type="button"
                  className="place-page__retry-button"
                  onClick={() => setNearbyRetry((count) => count + 1)}
                >
                  Try again
                </button>
              </div>
            )}

            {!isLoadingNearby && !nearbyError && nearbyPlaces.length === 0 && (
              <p className="place-page__nearby-message">
                No nearby places were found.
              </p>
            )}

            {!isLoadingNearby && !nearbyError && nearbyPlaces.length > 0 && (
              <>
                <div className="place-page__nearby-list">
                  {nearbyPlaces.slice(0, visibleNearbyCount).map((item) => {
                    const details = item.properties;
                    const category = details.categories
                      ?.at(-1)
                      ?.split(".")
                      .pop();

                    return (
                      <article className="nearby-place" key={details.place_id}>
                        <h3 className="nearby-place__name">{details.name}</h3>

                        <p className="nearby-place__category">
                          {category || "Place of interest"}
                        </p>

                        <p className="nearby-place__address">
                          {details.address_line2 || details.formatted}
                        </p>

                        <a
                          className="nearby-place__link"
                          href={`https://www.google.com/maps/search/?api=1&query=${details.lat},${details.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Google Maps ↗
                        </a>
                      </article>
                    );
                  })}
                </div>

                {visibleNearbyCount < nearbyPlaces.length && (
                  <button
                    className="place-page__show-more"
                    onClick={() => setVisibleNearbyCount((count) => count + 3)}
                  >
                    Show more
                  </button>
                )}
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default PlacePage;

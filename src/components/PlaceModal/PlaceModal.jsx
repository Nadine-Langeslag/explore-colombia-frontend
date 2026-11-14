import "./placeModal.css";

import { useEffect, useState, useRef } from "react";
import { searchNearbyPlaces } from "../../utils/api.js";

const PlaceModal = ({ place, onClose }) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [isLoadingNearby, setIsLoadingNearby] = useState(false);
  const [nearbyError, setNearbyError] = useState(false);
  const [visibleNearbyCount, setVisibleNearbyCount] = useState(3);
  const [retryCount, setRetryCount] = useState(0);
  const modalRef = useRef(null);

  // Close popup when Escape is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Fetch nearby places around the selected attraction
  useEffect(() => {
    if (!place?.coordinates) return;

    let isActive = true;

    const fetchNearbyPlaces = async () => {
      setIsLoadingNearby(true);
      setNearbyPlaces([]);
      setVisibleNearbyCount(3);
      setNearbyError(false);

      try {
        const results = await searchNearbyPlaces(
          ["entertainment.museum"],
          place.coordinates.lat,
          place.coordinates.lon
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
  }, [place, retryCount]);

  // Keep keyboard focus inside the modal
  useEffect(() => {
    const modal = modalRef.current;

    if (!modal) return;

    const previouslyFocusedElement = document.activeElement;

    const getFocusableElements = () =>
      modal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];

    firstElement?.focus();

    const handleTabKey = (event) => {
      if (event.key !== "Tab") return;

      const elements = getFocusableElements();
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    modal.addEventListener("keydown", handleTabKey);

    return () => {
      modal.removeEventListener("keydown", handleTabKey);
      previouslyFocusedElement?.focus();
    };
  }, []);

  if (!place) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="place-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="place-modal-title"
      onClick={onClose}
    >
      <button
        className="place-modal__close"
        onClick={onClose}
        aria-label="Close modal"
      >
        &times;
      </button>

      <div
        className="place-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={place.image}
          alt={place.name}
          className="place-modal__image"
        />

        <div className="place-modal__details">
          <h2 id="place-modal-title" className="place-modal__title">
            {place.name}
          </h2>
          <p className="place-modal__category">{place.category}</p>
          <p className="place-modal__description">{place.description}</p>
        </div>

        <iframe
          src={`https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lon}&output=embed`}
          title={`Map showing ${place.name}`}
          loading="lazy"
          className="place-modal__map"
        />

        <section className="place-modal__nearby">
          <h3 className="place-modal__nearby-title">
            Other places of interest nearby
          </h3>

          {isLoadingNearby && (
            <p className="place-modal__nearby-message">
              Finding nearby places...
            </p>
          )}

          {nearbyError && (
            <div className="place-modal__nearby-error">
              <p role="alert">
                We couldn't load nearby places. Please try again.
              </p>

              <button
                type="button"
                className="place-modal__retry-button"
                onClick={() => setRetryCount((prevCount) => prevCount + 1)}
              >
                Try again
              </button>
            </div>
          )}

          {!isLoadingNearby && !nearbyError && nearbyPlaces.length === 0 && (
            <p className="place-modal__nearby-message">
              No nearby places were found.
            </p>
          )}

          {!isLoadingNearby && !nearbyError && nearbyPlaces.length > 0 && (
            <>
              <div className="place-modal__nearby-list">
                {nearbyPlaces.slice(0, visibleNearbyCount).map((item) => {
                  const details = item.properties;
                  const category = details.categories?.at(-1)?.split(".").pop();

                  return (
                    <article className="nearby-place" key={details.place_id}>
                      <h4 className="nearby-place__name">{details.name}</h4>

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
                  className="place-modal__show-more"
                  onClick={() =>
                    setVisibleNearbyCount((prevCount) => prevCount + 3)
                  }
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default PlaceModal;

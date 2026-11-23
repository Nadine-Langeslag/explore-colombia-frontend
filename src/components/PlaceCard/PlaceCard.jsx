import "./placeCard.css";

import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

import { useSavedItems } from "../../contexts/useSavedItems.js";

const PlaceCard = ({ place }) => {
  const { isItemSaved, saveItem, removeSavedItem, getSavedItemId } =
    useSavedItems();

  const isSaved = isItemSaved(place.id, "place");

  const handleSaveClick = async () => {
    try {
      if (isSaved) {
        const savedItemId = getSavedItemId(place.id, "place");
        await removeSavedItem(savedItemId);
      } else {
        await saveItem(place.id, "place");
      }
    } catch (error) {
      console.error("Unable to update saved items:", error);
    }
  };

  return (
    <article className="place-card">
      <button
        className={`place-card__save-button ${
          isSaved ? "place-card__save-button_saved" : ""
        }`}
        onClick={handleSaveClick}
        aria-label={isSaved ? "Remove from saved places" : "Save place"}
        aria-pressed={isSaved}
      >
        <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <Link
        to={`/destinations/${place.destination}/places/${place.id}`}
        className="place-card__link"
      >
        <img src={place.image} alt={place.name} className="place-card__image" />
        <h3 className="place-card__name">{place.name}</h3>
        <p className="place-card__category">{place.category}</p>
      </Link>
    </article>
  );
};

export default PlaceCard;

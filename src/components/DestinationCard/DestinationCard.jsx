import "./destinationCard.css";

import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

import { useSavedItems } from "../../contexts/useSavedItems.js";

const DestinationCard = ({ destination }) => {
  const { isItemSaved, saveItem, removeSavedItem, getSavedItemId } =
    useSavedItems();

  const isSaved = isItemSaved(destination.id, "destination");

  const handleSaveClick = async () => {
    try {
      if (isSaved) {
        const savedItemId = getSavedItemId(destination.id, "destination");
        await removeSavedItem(savedItemId);
      } else {
        await saveItem(destination.id, "destination");
      }
    } catch (error) {
      console.error("Unable to update saved items:", error);
    }
  };

  return (
    <article className="destination-card">
      <button
        className={`destination-card__save-button ${
          isSaved ? "destination-card__save-button_saved" : ""
        }`}
        onClick={handleSaveClick}
        aria-label={isSaved ? "Remove from saved places" : "Save place"}
        aria-pressed={isSaved}
      >
        <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <Link
        to={`/destinations/${destination.id}`}
        className="destination-card__link"
      >
        <img
          src={destination.image}
          alt={destination.name}
          className="destination-image"
        />
        <h3 className="destination-name">{destination.name}</h3>
        <p className="destination-description">{destination.description}</p>
      </Link>
    </article>
  );
};

export default DestinationCard;

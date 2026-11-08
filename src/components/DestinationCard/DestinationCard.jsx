import "./destinationCard.css";
import { useState } from "react";
import { Bookmark } from "lucide-react";

const DestinationCard = ({ destination }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <article className="destination-card">
      <button
        className={`destination-card__save-button ${
          isSaved ? "destination-card__save-button_saved" : ""
        }`}
        onClick={() => setIsSaved(!isSaved)}
        aria-label={isSaved ? "Remove from saved places" : "Save place"}
        aria-pressed={isSaved}
      >
        <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
      </button>
      <img
        src={destination.image}
        alt={destination.name}
        className="destination-image"
      />
      <h3 className="destination-name">{destination.name}</h3>
      <p className="destination-description">{destination.description}</p>
    </article>
  );
};

export default DestinationCard;

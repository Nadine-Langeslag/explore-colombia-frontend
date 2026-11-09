import "./placeCard.css";

const PlaceCard = ({ place, onOpen }) => {
  return (
    <article className="place-card">
      <button className="place-card__button" onClick={() => onOpen(place)}>
        <img src={place.image} alt={place.name} className="place-card__image" />
        <h3 className="place-card__name">{place.name}</h3>
        <p className="place-card__category">{place.category}</p>
      </button>
    </article>
  );
};

export default PlaceCard;

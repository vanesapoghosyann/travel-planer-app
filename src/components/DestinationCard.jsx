function DestinationCard({ destination, isFavorite, onToggleFavorite }) {
  return (
    <article className="destination-card">
      <img
        src={destination.image}
        alt={destination.name}
        className="destination-image"
      />

      <div className="destination-content">
        <div className="destination-title">
          <h2>{destination.name}</h2>

          <button
            className={`favorite-button ${
              isFavorite ? "favorite-active" : ""
            }`}
            onClick={() => onToggleFavorite(destination.id)}
            aria-label={
              isFavorite
                ? `Remove ${destination.name} from favorites`
                : `Add ${destination.name} to favorites`
            }
          >
            {isFavorite ? "❤️" : "♡"}
          </button>
        </div>

        <p>{destination.country}</p>

        <span>{destination.location}</span>

        <p>⭐ {destination.rating}</p>
      </div>
    </article>
  );
}

export default DestinationCard;
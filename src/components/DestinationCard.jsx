function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <img
        src={destination.image}
        alt={destination.name}
        className="destination-image"
      />

      <div className="destination-content">
        <h2>{destination.name}</h2>

        <p>{destination.country}</p>

        <span>{destination.location}</span>

        <p>⭐ {destination.rating}</p>
      </div>
    </article>
  );
}

export default DestinationCard;
function TripCard({ trip, onDelete }) {
  return (
    <article className="trip-card">
      <div>
        <h3>{trip.name}</h3>

        <p>📍 {trip.destination}</p>

        <p>
          📅 {trip.startDate} → {trip.endDate}
        </p>

        <p>👥 {trip.travelers} travelers</p>

        <p>
          💰 {trip.budget} {trip.currency}
        </p>

        <p>🏷️ {trip.tripType}</p>

        {trip.notes && (
          <p className="trip-notes">
            📝 {trip.notes}
          </p>
        )}
      </div>

      <button
        className="delete-trip-button"
        onClick={() => onDelete(trip.id)}
      >
        Delete
      </button>
    </article>
  );
}

export default TripCard;
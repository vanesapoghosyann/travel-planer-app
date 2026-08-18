import { useEffect, useState } from "react";

import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";

import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("travelPlannerFavorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "travelPlannerFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const favoriteDestinations = destinations.filter((destination) =>
    favorites.includes(destination.id)
  );

  const toggleFavorite = (destinationId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((id) => id !== destinationId)
    );
  };

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <h1>Your Favorites</h1>
        <p>Destinations you've saved for your future adventures.</p>
      </div>

      {favoriteDestinations.length > 0 ? (
        <section className="favorites-grid">
          {favoriteDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      ) : (
        <div className="empty-favorites">
  <h2>No favorites yet</h2>

  <p>
    Save destinations you love and they'll appear here.
  </p>
</div>
      )}
    </main>
  );
}

export default Favorites;
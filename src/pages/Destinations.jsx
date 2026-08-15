import { useEffect, useState } from "react";

import DestinationCard from "../components/DestinationCard";
import SearchBar from "../components/SearchBar";

import destinations from "../data/destinations";

import "./Destinations.css";

function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

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

  const toggleFavorite = (destinationId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(destinationId)) {
        return currentFavorites.filter((id) => id !== destinationId);
      }

      return [...currentFavorites, destinationId];
    });
  };

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      destination.country
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === "All" ||
      destination.location === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <main className="destinations-page">
      <div className="destinations-header">
        <h1>Explore Destinations</h1>

        <p>
          Discover beautiful places and find inspiration for your next trip.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />

      <section className="destinations-grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isFavorite={favorites.includes(destination.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p className="no-results">
            No destinations found. Try another search.
          </p>
        )}
      </section>
    </main>
  );
}

export default Destinations;
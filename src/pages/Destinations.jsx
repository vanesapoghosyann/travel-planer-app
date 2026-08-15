import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";
import "./Destinations.css";

function Destinations() {
  return (
    <main className="destinations-page">
      <div className="destinations-header">
        <h1>Explore Destinations</h1>

        <p>
          Discover beautiful places and find inspiration for your next trip.
        </p>
      </div>

      <section className="destinations-grid">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
          />
        ))}
      </section>
    </main>
  );
}

export default Destinations;
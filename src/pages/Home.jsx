import Hero from "../components/Hero";
import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";

import "./Home.css";

function Home() {
  const popularDestinations = destinations.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="featured-section">
        <div className="section-header">
          <h2>Popular Destinations</h2>
          <p>
            Explore some of the most beautiful places around the world.
          </p>
        </div>

        <div className="featured-grid">
          {popularDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="section-header">
          <h2>Why Travel Planner?</h2>
          <p>Everything you need to organize your next adventure.</p>
        </div>

        <div className="benefits-grid">
          <article className="benefit-card">
            <h3>🌍 Discover</h3>
            <p>
              Find inspiring destinations and explore new places around
              the world.
            </p>
          </article>

          <article className="benefit-card">
            <h3>📅 Plan</h3>
            <p>
              Organize your trips, dates, and travel plans in one place.
            </p>
          </article>

          <article className="benefit-card">
            <h3>❤️ Save</h3>
            <p>
              Keep your favorite destinations ready for your next trip.
            </p>
          </article>
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready for your next adventure?</h2>
        <p>Start exploring destinations and build your travel plans.</p>
      </section>
    </>
  );
}

export default Home;
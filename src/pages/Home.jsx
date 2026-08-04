import Hero from "../components/Hero";
import "../styles/Global.css"
function Home() {
  return (
    <>
      <Hero />
      <section className="featured-section">
        <h2>Popular Destinations</h2>
        <p>Explore some of the most beautiful places around the world.</p>
      </section>
    </>

  );
}

export default Home;
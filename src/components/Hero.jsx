import "../styles/Hero.css";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Plan Your Next Adventure</h1>

                <p>
                    Discover amazing destinations, organize your trips,
                    and keep everything in one place.
                </p>

                <Link to="/destinations" className="hero-button">
  Explore Destinations
</Link>
            </div>

            <div className="hero-image">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900"
                    alt="Travel"
                />
            </div>
        </section>
    );
}

export default Hero;
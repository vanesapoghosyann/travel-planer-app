import { useEffect, useState } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Map.css";

function Map({ destination }) {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!destination) {
      return;
    }

    const fetchCoordinates = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            destination
          )}&count=1&language=en&format=json`
        );

        if (!response.ok) {
          throw new Error("Unable to find destination.");
        }

        const data = await response.json();

        if (!data.results?.length) {
          throw new Error("Destination location not found.");
        }

        const location = data.results[0];

        setCoordinates({
          latitude: location.latitude,
          longitude: location.longitude,
          name: location.name,
          country: location.country,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [destination]);

  if (loading) {
    return (
      <section className="map-section">
        <h2>Location</h2>
        <p className="map-loading">Loading map...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="map-section">
        <h2>Location</h2>
        <p className="map-error">{error}</p>
      </section>
    );
  }

  if (!coordinates) {
    return null;
  }

  const position = [
    coordinates.latitude,
    coordinates.longitude,
  ];

  return (
    <section className="map-section">
      <div className="map-header">
        <div>
          <h2>Location</h2>
          <p>Explore your destination on the map.</p>
        </div>

        <span className="map-location">
          {coordinates.name}, {coordinates.country}
        </span>
      </div>

      <div className="map-container">
        <MapContainer
          center={position}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              <strong>{coordinates.name}</strong>
              <br />
              {coordinates.country}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
}

export default Map;
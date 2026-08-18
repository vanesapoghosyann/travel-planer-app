import L from "leaflet";

import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Map.css";

import { useEffect, useState } from "react";



import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function Map({ destination, activities = [] }) {
  const [coordinates, setCoordinates] = useState(null);
  const [activityCoordinates, setActivityCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get coordinates for the main destination
  useEffect(() => {
    if (!destination) {
      return;
    }

    const fetchDestinationCoordinates = async () => {
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

        if (!data.results || data.results.length === 0) {
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

    fetchDestinationCoordinates();
  }, [destination]);

  // Get coordinates for itinerary activities
  useEffect(() => {
    if (!activities.length) {
      setActivityCoordinates([]);
      return;
    }

    const fetchActivityCoordinates = async () => {
      const results = [];

      for (const activity of activities) {
        if (!activity.location) {
          continue;
        }

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              activity.location
            )}&limit=1`
          );

          if (!response.ok) {
            continue;
          }

          const data = await response.json();

          if (!data || data.length === 0) {
            console.log(
              "No coordinates found for:",
              activity.location
            );

            continue;
          }

          const location = data[0];

          results.push({
            id: activity.id,
            title: activity.title,
            location: activity.location,
            time: activity.time,
            date: activity.date,
            latitude: Number(location.lat),
            longitude: Number(location.lon),
          });
        } catch (error) {
          console.log(
            `Could not find location for ${activity.title}`
          );
        }
      }

      setActivityCoordinates(results);
    };

    fetchActivityCoordinates();
  }, [activities]);

  if (loading) {
    return (
      <section className="map-section">
        <h2>Trip Map</h2>

        <p className="map-loading">
          Loading map...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="map-section">
        <h2>Trip Map</h2>

        <p className="map-error">
          {error}
        </p>
      </section>
    );
  }

  if (!coordinates) {
    return null;
  }

  const destinationPosition = [
    coordinates.latitude,
    coordinates.longitude,
  ];

  return (
    <section className="map-section">

      <div className="map-header">

        <div>
          <h2>Trip Map</h2>

          <p>
            Explore your destination and planned activities.
          </p>
        </div>

        <span className="map-location">
          {coordinates.name}, {coordinates.country}
        </span>

      </div>

      <div className="map-container">

        <MapContainer
          center={destinationPosition}
          zoom={12}
          scrollWheelZoom={true}
        >

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Main destination marker */}

          <Marker position={destinationPosition}>

            <Popup>

              <strong>
                {coordinates.name}
              </strong>

              <br />

              {coordinates.country}

              <br />

              Main destination

            </Popup>

          </Marker>

          {/* Itinerary activity markers */}

          {activityCoordinates.map((activity) => (

            <Marker
              key={activity.id}
              position={[
                activity.latitude,
                activity.longitude,
              ]}
            >

              <Popup>

                <strong>
                  {activity.title}
                </strong>

                <br />

                📍 {activity.location}

                <br />

                🗓️ {activity.date}

                <br />

                🕐 {activity.time}

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>

      {activityCoordinates.length > 0 && (

        <p className="map-marker-info">

          📍 {activityCoordinates.length} itinerary location
          {activityCoordinates.length !== 1 ? "s" : ""} shown on the map.

        </p>

      )}

    </section>
  );
}

export default Map;
import { useEffect, useState } from "react";

import TripCard from "../components/TripCard";
import destinations from "../data/destinations";

import "./Planner.css";

function Planner() {
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem("travelPlannerTrips");

    return savedTrips ? JSON.parse(savedTrips) : [];
  });

  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [tripType, setTripType] = useState("Leisure");
  const [notes, setNotes] = useState("");

  
  useEffect(() => {
    localStorage.setItem("travelPlannerTrips", JSON.stringify(trips));
  }, [trips]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!tripName || !destination || !startDate || !endDate) {
      return;
    }

    const newTrip = {
      id: Date.now(),
      name: tripName,
      destination,
      startDate,
      endDate,
      travelers: Number(travelers),
      budget: Number(budget),
      currency,
      tripType,
      notes,
    };

    setTrips((currentTrips) => [...currentTrips, newTrip]);

    setTripName("");
    setDestination("");
    setStartDate("");
    setEndDate("");

    setTravelers(1);
    setBudget("");
    setCurrency("EUR");
    setTripType("Leisure");
    setNotes("");
  };

  const deleteTrip = (tripId) => {
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== tripId)
    );
  };

  return (
    <main className="planner-page">
      <section className="planner-header">
        <h1>Plan Your Trip</h1>
        <p>Create and organize your upcoming adventures.</p>
      </section>

      <section className="trip-form-section">
        <h2>Create a Trip</h2>

        <form onSubmit={handleSubmit} className="trip-form">
          <input
            type="text"
            placeholder="Trip name"
            value={tripName}
            onChange={(event) => setTripName(event.target.value)}
          />

          <select
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          >
            <option value="">Choose a destination</option>

            {destinations.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}, {item.country}
              </option>
            ))}
          </select>

          <label>
            Start date
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </label>

          <label>
            End date
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </label>

          <label>
            Travelers

            <input
              type="number"
              min="1"
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
            />
          </label>

          <label>
            Budget

            <input
              type="number"
              min="0"
              placeholder="1500"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            />
          </label>

          <label>
            Currency

            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </label>

          <label>
            Trip type

            <select
              value={tripType}
              onChange={(event) => setTripType(event.target.value)}
            >
              <option value="Leisure">Leisure</option>
              <option value="Adventure">Adventure</option>
              <option value="Business">Business</option>
              <option value="Family">Family</option>
              <option value="Romantic">Romantic</option>
            </select>
          </label>

          <label>
            Notes

            <textarea
              placeholder="Add some notes about your trip..."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows="4"
            />
          </label>

          <button type="submit">Create Trip</button>
        </form>
      </section>

      <section className="planned-trips">
        <h2>Planned Trips</h2>

        {trips.length > 0 ? (
          <div className="trips-grid">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={deleteTrip}
              />
            ))}
          </div>
        ) : (
          <p className="empty-trips">
            You haven't planned any trips yet.
          </p>
        )}
      </section>
    </main>
  );
}

export default Planner;
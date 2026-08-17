import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActivityForm from "../components/ActivityForm";
import ActivityCard from "../components/ActivityCard";

import destinations from "../data/destinations";
import Weather from "../components/Weather";

import "./TripDetails.css";

function TripDetails() {
    const { tripId } = useParams();
    const navigate = useNavigate();

    const [trip, setTrip] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [itinerary, setItinerary] = useState([]);

    useEffect(() => {
        const savedTrips = localStorage.getItem("travelPlannerTrips");

        if (!savedTrips) {
            return;
        }

        const trips = JSON.parse(savedTrips);

        const selectedTrip = trips.find(
            (item) => item.id === Number(tripId)
        );

        setTrip(selectedTrip || null);
        setItinerary(selectedTrip?.itinerary || []);
    }, [tripId]);

    const handleDelete = () => {
        const savedTrips = localStorage.getItem("travelPlannerTrips");

        if (!savedTrips) {
            return;
        }

        const trips = JSON.parse(savedTrips);

        const updatedTrips = trips.filter(
            (item) => item.id !== Number(tripId)
        );

        localStorage.setItem(
            "travelPlannerTrips",
            JSON.stringify(updatedTrips)
        );

        navigate("/planner");
    };

    const handleSave = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const updatedTrip = {
            ...trip,
            name: formData.get("name"),
            destination: formData.get("destination"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            travelers: Number(formData.get("travelers")),
            budget: Number(formData.get("budget")),
            currency: formData.get("currency"),
            tripType: formData.get("tripType"),
            notes: formData.get("notes"),
        };

        const savedTrips = localStorage.getItem("travelPlannerTrips");

        if (savedTrips) {
            const trips = JSON.parse(savedTrips);

            const updatedTrips = trips.map((item) =>
                item.id === updatedTrip.id ? updatedTrip : item
            );

            localStorage.setItem(
                "travelPlannerTrips",
                JSON.stringify(updatedTrips)
            );
        }

        setTrip(updatedTrip);
        setIsEditing(false);
    };


    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const difference = end - start;

        return Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        ) + 1;
    };

    if (!trip) {
        return (
            <main className="trip-details-page">
                <h1>Trip not found</h1>
                <Link to="/planner">Back to Planner</Link>
            </main>
        );
    }


    const duration = calculateDuration(
        trip.startDate,
        trip.endDate
    );

    const budgetPerTraveler =
        trip.travelers > 0
            ? trip.budget / trip.travelers
            : 0;

    const activityCount = itinerary.length;


    const handleAddActivity = (activity) => {
        const updatedItinerary = [
            ...itinerary,
            activity,
        ];

        setItinerary(updatedItinerary);

        const updatedTrip = {
            ...trip,
            itinerary: updatedItinerary,
        };

        setTrip(updatedTrip);

        const savedTrips = localStorage.getItem(
            "travelPlannerTrips"
        );

        if (savedTrips) {
            const trips = JSON.parse(savedTrips);

            const updatedTrips = trips.map((item) =>
                item.id === updatedTrip.id
                    ? updatedTrip
                    : item
            );

            localStorage.setItem(
                "travelPlannerTrips",
                JSON.stringify(updatedTrips)
            );
        }
    };


    const handleDeleteActivity = (activityId) => {
        const updatedItinerary = itinerary.filter(
            (activity) => activity.id !== activityId
        );

        setItinerary(updatedItinerary);

        const updatedTrip = {
            ...trip,
            itinerary: updatedItinerary,
        };

        setTrip(updatedTrip);

        const savedTrips = localStorage.getItem(
            "travelPlannerTrips"
        );

        if (savedTrips) {
            const trips = JSON.parse(savedTrips);

            const updatedTrips = trips.map((item) =>
                item.id === updatedTrip.id
                    ? updatedTrip
                    : item
            );

            localStorage.setItem(
                "travelPlannerTrips",
                JSON.stringify(updatedTrips)
            );
        }
    };



    return (
        <main className="trip-details-page">
            <Link to="/planner" className="back-link">
                ← Back to Planner
            </Link>

            {!isEditing ? (
                <>
                    <section className="trip-details-header">
                        <div>
                            <h1>{trip.name}</h1>
                            <p>
                                📍 {trip.destination}
                            </p>
                        </div>

                        <div className="trip-actions">
                            <button onClick={() => setIsEditing(true)}>
                                Edit Trip
                            </button>

                            <button
                                className="delete-button"
                                onClick={handleDelete}
                            >
                                Delete Trip
                            </button>
                        </div>
                    </section>

                    <section className="trip-summary">
                        <div>
                            <span>Dates</span>
                            <strong>
                                📅 {trip.startDate} → {trip.endDate}
                            </strong>
                        </div>

                        <div>
                            <span>Travelers</span>
                            <strong>👥 {trip.travelers}</strong>
                        </div>

                        <div>
                            <span>Budget</span>
                            <strong>
                                💰 {trip.budget} {trip.currency}
                            </strong>
                        </div>

                        <div>
                            <span>Trip type</span>
                            <strong>🏷️ {trip.tripType}</strong>
                        </div>
                    </section>


                    <section className="trip-statistics">
                        <div className="stat-card">
                            <span>Trip duration</span>
                            <strong>{duration} days</strong>
                        </div>

                        <div className="stat-card">
                            <span>Travelers</span>
                            <strong>{trip.travelers}</strong>
                        </div>

                        <div className="stat-card">
                            <span>Budget per traveler</span>
                            <strong>
                                {trip.budget > 0
                                    ? `${budgetPerTraveler.toFixed(2)} ${trip.currency}`
                                    : "Not specified"}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Planned activities</span>
                            <strong>{activityCount}</strong>
                        </div>
                    </section>

                    <Weather destination={trip.destination} />
                    {trip.notes && (
                        <section className="trip-notes-section">
                            <h2>Notes</h2>
                            <p>{trip.notes}</p>
                        </section>
                    )}

                    <section className="itinerary-section">
                        <div className="itinerary-header">
                            <div>
                                <h2>Your Itinerary</h2>

                                <p>
                                    Organize your activities day by day.
                                </p>
                            </div>
                        </div>

                        <ActivityForm
                            onAddActivity={handleAddActivity}
                            startDate={trip.startDate}
                            endDate={trip.endDate}
                        />

                        <div className="itinerary-list">
                            {itinerary.length > 0 ? (
                                Object.entries(
                                    [...itinerary]
                                        .sort((a, b) =>
                                            `${a.date}T${a.time}`.localeCompare(
                                                `${b.date}T${b.time}`
                                            )
                                        )
                                        .reduce((groups, activity) => {
                                            if (!groups[activity.date]) {
                                                groups[activity.date] = [];
                                            }

                                            groups[activity.date].push(activity);

                                            return groups;
                                        }, {})
                                ).map(([date, activities]) => (
                                    <div className="itinerary-day" key={date}>
                                        <h3>📅 {date}</h3>

                                        <div className="day-activities">
                                            {activities.map((activity) => (
                                                <ActivityCard
                                                    key={activity.id}
                                                    activity={activity}
                                                    onDelete={handleDeleteActivity}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="empty-itinerary">
                                    No activities planned yet. Add your first activity above.
                                </p>
                            )}
                        </div>
                    </section>
                </>
            ) : (
                <section className="edit-trip-section">
                    <h1>Edit Trip</h1>

                    <form onSubmit={handleSave} className="edit-trip-form">
                        <label>
                            Trip name
                            <input
                                name="name"
                                defaultValue={trip.name}
                                required
                            />
                        </label>

                        <label>
                            Destination
                            <select
                                name="destination"
                                defaultValue={trip.destination}
                                required
                            >
                                {destinations.map((destination) => (
                                    <option
                                        key={destination.id}
                                        value={destination.name}
                                    >
                                        {destination.name}, {destination.country}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Start date
                            <input
                                type="date"
                                name="startDate"
                                defaultValue={trip.startDate}
                                required
                            />
                        </label>

                        <label>
                            End date
                            <input
                                type="date"
                                name="endDate"
                                defaultValue={trip.endDate}
                                required
                            />
                        </label>

                        <label>
                            Travelers
                            <input
                                type="number"
                                name="travelers"
                                min="1"
                                defaultValue={trip.travelers}
                                required
                            />
                        </label>

                        <label>
                            Budget
                            <input
                                type="number"
                                name="budget"
                                min="0"
                                defaultValue={trip.budget}
                            />
                        </label>

                        <label>
                            Currency
                            <select
                                name="currency"
                                defaultValue={trip.currency}
                            >
                                <option value="EUR">EUR (€)</option>
                                <option value="USD">USD ($)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </label>

                        <label>
                            Trip type
                            <select
                                name="tripType"
                                defaultValue={trip.tripType}
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
                                name="notes"
                                defaultValue={trip.notes}
                                rows="5"
                            />
                        </label>

                        <div className="edit-actions">
                            <button type="submit">
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </main>
    );


}

export default TripDetails;
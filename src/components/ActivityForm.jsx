function ActivityForm({ onAddActivity, startDate, endDate }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const activity = {
      id: Date.now(),
      date: formData.get("date"),
      time: formData.get("time"),
      title: formData.get("title"),
      location: formData.get("location"),
      notes: formData.get("notes"),
    };

    if (!activity.date || !activity.time || !activity.title) {
      return;
    }

    onAddActivity(activity);

    event.currentTarget.reset();
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <h3>Add Activity</h3>

      <label>
        Date
        <input
          type="date"
          name="date"
          min={startDate}
          max={endDate}
          required
        />
      </label>

      <label>
        Time
        <input
          type="time"
          name="time"
          required
        />
      </label>

      <label>
        Activity
        <input
          type="text"
          name="title"
          placeholder="Visit Eiffel Tower"
          required
        />
      </label>

      <label>
        Location
        <input
          type="text"
          name="location"
          placeholder="Eiffel Tower, Paris"
        />
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          placeholder="Add additional information..."
          rows="3"
        />
      </label>

      <button type="submit">
        Add Activity
      </button>
    </form>
  );
}

export default ActivityForm;
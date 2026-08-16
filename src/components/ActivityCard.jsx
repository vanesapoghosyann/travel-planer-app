function ActivityCard({ activity, onDelete }) {
  return (
    <article className="activity-card">
      <div className="activity-time">
        {activity.time}
      </div>

      <div className="activity-content">
        <h4>{activity.title}</h4>

        {activity.location && (
          <p>📍 {activity.location}</p>
        )}

        {activity.notes && (
          <p>📝 {activity.notes}</p>
        )}
      </div>

      <button
        type="button"
        className="delete-activity-button"
        onClick={() => onDelete(activity.id)}
      >
        Delete
      </button>
    </article>
  );
}

export default ActivityCard;
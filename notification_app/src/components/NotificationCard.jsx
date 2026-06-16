function NotificationCard({ notification }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h3>{notification.title}</h3>
      <p>{notification.message}</p>
      <p>{notification.type}</p>
    </div>
  );
}

export default NotificationCard;

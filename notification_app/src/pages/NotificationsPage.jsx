import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../api/notificationApi";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getNotifications();
      setNotifications(data);
    }

    loadData();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

export default NotificationsPage;

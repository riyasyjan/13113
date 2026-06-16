import { useEffect, useState } from "react";

import NotificationCard from "../components/NotificationCard";

import { getNotifications } from "../api/notificationApi";

import { calculatePriority } from "../utils/priorityCalculator";

function PriorityPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getNotifications();

      const sorted = [...data].sort(
        (a, b) => calculatePriority(b) - calculatePriority(a),
      );

      setNotifications(sorted.slice(0, 10));
    }

    loadData();
  }, []);

  return (
    <div>
      <h1>Priority Notifications</h1>

      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

export default PriorityPage;

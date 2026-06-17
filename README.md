# Notification Application

## Overview

This project is a React-based Notification Management System developed as part of the Full Stack Campus Evaluation.

The application allows users to:

* View all notifications
* View priority notifications
* Sort notifications based on priority
* Use reusable logging middleware
* Demonstrate scalable notification system design

---

## Project Structure

```text
notification_app/
│
├── src/
│   ├── api/
│   │   └── notificationApi.js
│   │
│   ├── components/
│   │   ├── NotificationCard.jsx
│   │   └── FilterDropDown.jsx
│   │
│   ├── pages/
│   │   ├── NotificationsPage.jsx
│   │   └── PriorityPage.jsx
│   │
│   ├── utils/
│   │   └── priorityCalculator.js
│   │
│   ├── App.js
│   └── index.js
│
└── logging-middleware/
    └── logger.js
```

---

## Installation

```bash
npm install
```

## Run Application

```bash
npm start
```

Application runs at:

```text
http://localhost:3000
```

---

## Features

### Notifications Page

Displays all available notifications.

### Priority Notifications Page

Displays notifications sorted according to priority score.

### Logging Middleware

Reusable logging utility:

```javascript
Log(stack, level, packageName, message)
```

The middleware can be integrated across frontend and backend services.

---

## Technologies Used

* React.js
* JavaScript
* React Router
* Axios
* Node.js
* PostgreSQL (Design)
* Redis (Design)
* RabbitMQ/Kafka (Design)

---

## Future Improvements

* Real-time notifications using WebSockets
* Database integration
* Redis caching
* Queue-based notification processing
* User authentication

---

Notification API access was attempted using the provided access token.
Due to authorization issues, sample notification data was used to
demonstrate the priority notification algorithm and UI functionality.

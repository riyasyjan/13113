#Notification System DEsign

## Stage 1 - REST API design
### Core Actions

1. Get Notifications
2. Mark Notification as Read
3. Mark All Notifications as Read
4. Get Unread Count
5. Create Notification

### APIs

#### Get Notifications

GET /api/v1/notifications

Response

```json
{
  "notifications": [
    {
      "id": "1",
      "title": "Placement Drive",
      "message": "TCS drive scheduled",
      "type": "placement",
      "isRead": false,
      "createdAt": "2026-06-17T10:00:00Z"
    }
  ]
}
```

#### Mark Notification Read

PATCH /api/v1/notifications/{id}/read

Response

```json
{
  "message": "Notification marked as read"
}
```

#### Mark All Read

PATCH /api/v1/notifications/read-all

Response

```json
{
  "message": "All notifications marked as read"
}
```

#### Get Unread Count

GET /api/v1/notifications/unread-count

Response

```json
{
  "count": 5
}
```

#### Create Notification

POST /api/v1/notifications

Request

```json
{
  "title": "Placement Drive",
  "message": "Infosys recruitment starts",
  "type": "placement"
}
```

### Real Time Notifications

Use WebSocket for instant notification delivery to logged-in users.


## Stage 2 - Database Design

### Database Choice

I would use PostgreSQL because it provides strong ACID compliance, indexing support, and handles large amounts of structured data efficiently.

### Tables

#### Students Table

```sql
CREATE TABLE students (
    student_id BIGINT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

#### Notifications Table

```sql
CREATE TABLE notifications (
    notification_id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    title VARCHAR(255),
    message TEXT,
    notification_type VARCHAR(20),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)
    REFERENCES students(student_id)
);
```

### Relationship

One student can have many notifications.

### Scaling Considerations

As the number of notifications grows:

* Query performance may decrease.
* Storage requirements increase.
* Read operations become slower.

### Optimization Strategies

1. Add indexes on frequently queried columns.
2. Use pagination when fetching notifications.
3. Archive old notifications.
4. Partition large tables if necessary.

### Example Queries

Fetch notifications for a student:

```sql
SELECT *
FROM notifications
WHERE student_id = 1042
ORDER BY created_at DESC;
```

Fetch unread notifications:

```sql
SELECT *
FROM notifications
WHERE student_id = 1042
AND is_read = FALSE;
```


## Stage 3 - Query Optimization

### Existing Query

```sql
SELECT *
FROM notifications
WHERE student_id = 1042
AND is_read = FALSE
ORDER BY created_at ASC;
```

### Performance Issue

With 50,000 students and millions of notifications, this query may perform a full table scan, resulting in slow response times.

### Optimization

Create a composite index:

```sql
CREATE INDEX idx_notification_student_read_created
ON notifications(student_id, is_read, created_at);
```

### Benefits

* Faster filtering by student_id
* Faster filtering by read status
* Faster sorting by created_at

### Complexity

Without index:

```text
O(N)
```

With index:

```text
O(log N)
```

### Trade-Offs

Advantages:

* Faster reads
* Faster searches

Disadvantages:

* Additional storage
* Slightly slower inserts and updates

### Query for Placement Notifications in Last 7 Days

```sql
SELECT DISTINCT student_id
FROM notifications
WHERE notification_type = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```

---

## Stage 4 - Scaling and Caching

### Problem

Every user request directly queries the database.

```text
User -> API -> Database
```

As traffic increases, database load becomes a bottleneck.

### Solution

Use Redis Cache.

```text
User
  |
  V
Redis Cache
  |
  V
Database
```

### Workflow

1. User requests notifications.
2. Check Redis.
3. If found, return cached data.
4. Otherwise fetch from database and cache the result.

### Additional Optimizations

#### Pagination

```http
GET /notifications?page=1&limit=20
```

#### Infinite Scrolling

Load notifications in small chunks.

#### WebSockets

Use WebSockets for real-time notifications instead of constant polling.

### Benefits

* Reduced database load
* Faster response time
* Better user experience

---

## Stage 5 - Bulk Notification Delivery

### Requirement

An administrator clicks "Notify All" and 50,000 students should receive:

1. Email notification
2. In-app notification

### Problem With Simple Loop

```python
for student in students:
    send_email(student)
    save_notification(student)
```

Issues:

* Very slow
* API timeout
* Failure stops processing
* Not scalable

### Solution

Use a Message Queue (RabbitMQ/Kafka).

### Architecture

```text
Admin
  |
  V
Notification Service
  |
  V
Message Queue
   /       \
  /         \
Email     App Notification
Worker        Worker
```

### Workflow

1. Admin creates notification.
2. Notification stored in database.
3. Message placed in queue.
4. Email workers send emails.
5. Notification workers create in-app notifications.
6. Failed jobs are retried.

### Benefits

* Scalable
* Fault tolerant
* Faster processing
* Easy retry mechanism

---

## Stage 6 - Priority Notification Algorithm

### Goal

Display the Top N most important notifications.

### Priority Weights

```text
Placement = 3
Result    = 2
Event     = 1
```

### Scoring Formula

```text
Priority Score = Type Weight + Recency Weight
```

### Example

```text
Placement (Today)      = 8
Result (2 Days Ago)    = 5
Event (5 Days Ago)     = 2
```

### Algorithm

1. Calculate score for every notification.
2. Sort notifications by score in descending order.
3. Return top N notifications.

### Sample JavaScript

```javascript
function calculatePriority(notification) {
  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  const ageInDays =
    (Date.now() - new Date(notification.createdAt)) /
    (1000 * 60 * 60 * 24);

  const recencyWeight = Math.max(0, 5 - ageInDays);

  return weights[notification.type] + recencyWeight;
}
```

### Time Complexity

```text
O(N log N)
```

due to sorting.


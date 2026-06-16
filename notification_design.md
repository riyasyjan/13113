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


## Stage 2 -Database design

## Stage 3 - Query Optimization

## Stage 4 - Scaling and caching

## Satge 5 - Bulk Notification delivery

## Stage 6 - Priority Notification Algorithm

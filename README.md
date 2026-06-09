# the-aussie-outfit-notification-service

A lightweight Node.js notification service for The Aussie Outfit that delivers transactional email notifications for order updates, security alerts, and user notifications. Built with Express.js and MongoDB.

## Features

- 📧 **Email Notifications** - Send transactional emails using Gmail/Nodemailer
- 🎯 **Multiple Notification Types** - Order confirmations, payment alerts, delivery updates, promotions, security alerts, and system notifications
- 📊 **Notification Tracking** - Store and track all notifications and delivery logs in MongoDB
- 🔄 **Multi-Channel Support** - Support for email, SMS, push notifications, and in-app notifications
- ⚡ **Express.js API** - RESTful endpoints for sending and retrieving notifications
- 🗄️ **MongoDB Integration** - Persistent storage of notifications and message logs with Mongoose ODM
- 🌐 **CORS Enabled** - Configured for cross-origin requests

## Technology Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js (^5.2.1)
- **Database**: MongoDB with Mongoose (^9.6.1)
- **Email**: Nodemailer (^8.0.9)
- **Utilities**: Dotenv for environment management, CORS for cross-origin requests
- **Testing**: Vitest
- **Development**: Nodemon for hot-reloading

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- Gmail account (for email notifications)

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd the-aussie-outfit-notification-service
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory with the following variables:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/notification-service
DB_NAME=notification-service

# Email Configuration
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Optional
NOTIFICATION_API_KEY=your-api-key
```

### Running the Service

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on the configured `PORT` (default: 5000).

## API Endpoints

### 1. Send Order Confirmation Email
```
POST /order-confirmation
Content-Type: application/json

{
  "userId": "user_id",
  "orderId": "order_id",
  "email": "customer@example.com",
  "orderNumber": "ORD-12345"
}

Response:
{
  "success": true,
  "message": "Order confirmation email sent successfully",
  "data": { notification object }
}
```

### 2. Send Password Reset Email
```
POST /password-reset
Content-Type: application/json

{
  "userId": "user_id",
  "email": "customer@example.com",
  "resetToken": "reset_token_string"
}

Response:
{
  "success": true,
  "message": "Password reset email sent successfully",
  "data": { notification object }
}
```

### 3. Get User Notifications
```
GET /user/:userId

Response:
{
  "success": true,
  "count": 5,
  "data": [ array of notifications ]
}
```

### 4. Update Notification Status
```
PUT /:notificationId
Content-Type: application/json

{
  "status": "READ",
  "isRead": true
}

Response:
{
  "success": true,
  "data": { updated notification object }
}
```

## Project Structure

```
src/
├── index.js              # Server entry point and database connection
├── app.js                # Express app configuration
├── config/
│   ├── database.js       # MongoDB connection setup
│   └── constant.js       # Configuration constants
├── controller/
│   └── notification.js   # Notification business logic and email handling
├── models/
│   ├── notification.js   # Notification schema and model
│   └── messageLog.js     # Message delivery log schema and model
└── route/
    └── notification.js   # API routes
```

## Notification Schema

### Notification Model
- **userId** (ObjectId) - Reference to user
- **title** (String) - Notification title
- **message** (String) - Notification message
- **type** (String) - Type: ORDER, PAYMENT, DELIVERY, PROMOTION, SYSTEM, SECURITY
- **channel** (String) - Channel: IN_APP, EMAIL, SMS, PUSH
- **status** (String) - Status: PENDING, SENT, DELIVERED, FAILED, READ
- **isRead** (Boolean) - Read status
- **readAt** (Date) - When notification was read
- **metadata** (Object) - Additional data (orderId, email, resetToken, etc.)
- **timestamps** - createdAt and updatedAt

### MessageLog Model
- **notificationId** (ObjectId) - Reference to notification
- **userId** (ObjectId) - Reference to user
- **recipient** (String) - Recipient email/phone/etc.
- **channel** (String) - Delivery channel
- **subject** (String) - Email subject
- **messageBody** (String) - Message content
- **provider** (String) - Email provider (e.g., gmail)
- **providerMessageId** (String) - Provider's message ID
- **deliveryStatus** (String) - Status: PENDING, SENT, DELIVERED, FAILED
- **failureReason** (String) - Reason for failure if any
- **sentAt** (Date) - When sent
- **deliveredAt** (Date) - When delivered
- **timestamps** - createdAt and updatedAt

## Database Connection

The service uses MongoDB with connection pooling and caching support:

- **connectNotificationDatabase()** - Main connection for the application
- **getDatabaseConnection()** - Get cached or create new named connections
- **closeDatabaseConnections()** - Close all connections gracefully

## Configuration

Update settings via environment variables:

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port
- `EMAIL` - Gmail address for sending emails
- `EMAIL_PASSWORD` - Gmail app-specific password
- `NODE_ENV` - Environment (development/production)

## Testing

Run tests with:
```bash
npm test                # Run tests once
npm run test:watch     # Run tests in watch mode
```

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes and enhancements.

## License

This project is licensed under the ISC License.

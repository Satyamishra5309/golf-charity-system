# Golf Charity System

A full-stack MERN application for managing charity golf tournaments, player registrations, and fundraising donations.

---

## Features

* User Authentication & Authorization
* Golf Event Management
* Donation Management
* Admin Dashboard
* Player Registration
* Secure REST APIs
* Responsive Frontend UI

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

---

## Folder Structure

```bash
golf-charity-project/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/golf-charity-project.git
```

---

## Backend Setup

```bash
cd Backend

npm install
```

### Create .env File

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install

npm start
```

---

## API Endpoints

### Auth Routes

* POST /api/auth/register
* POST /api/auth/login

### Event Routes

* GET /api/events
* POST /api/events

### Donation Routes

* POST /api/donations

---

## Future Improvements

* Online Payment Gateway Integration
* Email Notifications
* Real-time Event Updates
* Analytics Dashboard

---

## Author

Satyam Gautam

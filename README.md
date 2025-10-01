# Chat App

A simple real-time chat application built with the MERN stack, Google OAuth login, and Socket.IO for live messaging.

## Features

- **Google OAuth Login:** Secure authentication using Google accounts.
- **Real-Time Chat:** Instant messaging powered by Socket.IO.
- **MERN Stack:** MongoDB, Express.js, React.js, and Node.js.
- **User List:** See online users.
- **Responsive UI:** Works on desktop and mobile devices.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Google OAuth 2.0
- **Real-time Messaging:** Socket.IO

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB database
- Google Cloud Project with OAuth credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aditya-coder-4002/chat-app.git
   cd chat-app
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in the `server` directory with:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     SESSION_SECRET=your_session_secret
     ```

5. **Run the app:**

   - Start the backend:
     ```bash
     cd ../server
     npm start
     ```
   - Start the frontend:
     ```bash
     cd ../client
     npm start
     ```

6. **Visit the app:**
   - Go to [http://localhost:3000](http://localhost:5000) in your browser.

## Usage

- Sign in with your Google account.
- Join the public chat room and start messaging in real-time.
- See who else is online.



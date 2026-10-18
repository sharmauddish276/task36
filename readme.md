# JWT Authentication

A beginner-friendly project using Express.js, JWT, and React.

## Features

- User registration
- User login
- JWT token generation
- Protected route
- Token stored in local storage
- Logout functionality

## Technologies

- React
- Express.js
- Node.js
- JSON Web Token

## Run Backend

Open terminal:

    cd backend
    npm install
    npm start

Backend runs at http://localhost:5000

## Run Frontend

Open a second terminal:

    cd frontend
    npm install
    npm run dev

Open the local URL shown by Vite.

## API Routes

- POST /register
- POST /login
- GET /protected

## Note

Users are stored in an array. All registered users are lost when the backend restarts.
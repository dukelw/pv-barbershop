# Barbershop Management System

A barbershop management system that allows customers to book appointments online, while also providing an admin panel for managing appointments, customers, and other related services.

This project uses **ReactJS** for the frontend, **NodeJS** for the backend, and **MongoDB** for storing data.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: NodeJS
- **Database**: MongoDB
- **State Management**: Redux
- **Routing**: React Router
- **Other Libraries**: Axios for HTTP requests, Bcrypt for password hashing, JWT for authentication.

## Project Structure

### `client/`
This folder contains the frontend ReactJS application.
- **components/**: Reusable React components for the app UI.
- **config/**: Configuration files for setting up Axios and other services.
- **constants/**: Static values such as API URLs or constant data.
- **layouts/**: React components that handle the layout of the pages.
- **pages/**: The pages of the app, such as home, booking page, and customer profile.
- **redux/**: Redux state management setup.
- **routes/**: React Router setup for handling page navigation.
- **src/**: Contains core files for rendering the app, such as `App.js` and `index.js`.

### `dashboard/`
This folder contains the admin panel ReactJS app.
- **src/**: Includes files to handle the logic and rendering of the dashboard.
- **createAxios.js**: Handles API requests to the backend.
- **index.html**: Main HTML file for the dashboard.
- **package.json**: Contains dependencies and scripts for the dashboard app.
- **README.md**: Documentation for the dashboard.

### `server/`
This folder contains the NodeJS backend API.
- **auth/**: Handles user authentication (login, registration, password reset).
- **controllers/**: Contains controller functions to manage business logic.
- **core/**: Contains core services for the backend.
- **databases/**: MongoDB database connection setup.
- **models/**: Mongoose models for MongoDB collections (e.g., User, Appointment).
- **routes/**: Defines API routes for the frontend to interact with.
- **services/**: Business logic for processing data.
- **uploads/**: Manages file uploads, if applicable.
- **utils/**: Helper functions.
- **index.js**: Main entry point for the NodeJS server.

## Setup Instructions

### Prerequisites

- **NodeJS** (v14.x or higher)
- **MongoDB**: Local or remote database setup.

### Steps to run locally

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/pv-barbershop.git
   cd pv-barbershop

2. Install the frontend dependencies:
   ```bash
    cd client
    npm install
3. Install the backend dependencies:
   ```bash
    cd ../server
    npm install
4. Set up environment variables in the server/.env file (MongoDB URI, JWT Secret, etc.)
5. Start the backend server:

   ```bash
    npm start
6. Start the frontend application:
   ```bash
    cd ../client
    npm start
7. Open your browser and navigate to http://localhost:3000 to see the website in action.
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

### `dashboard/`
This folder contains the admin panel ReactJS app.

### `server/`
This folder contains the NodeJS backend API.

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

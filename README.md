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

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in a user and generate a JWT token.
- **POST /api/auth/reset-password**: Reset the password for a user.

### Appointments

- **GET /api/appointments**: Get a list of all appointments.
- **POST /api/appointments/book**: Book a new appointment.
- **PUT /api/appointments/:id**: Update an appointment.
- **DELETE /api/appointments/:id**: Delete an appointment.

### Customers

- **GET /api/customers**: Get a list of all customers.
- **GET /api/customers/:id**: Get a specific customer's details.
- **PUT /api/customers/:id**: Update a customer's information.

## Usage

- **Customers** can browse available times and book appointments.
- **Admins** can manage appointments, customer details, and generate reports through the dashboard.

## Contributing

We welcome contributions to improve this project! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

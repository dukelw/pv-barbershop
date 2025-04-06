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

## Environment Variables

### Server Environment Variables
Before running the server, you'll need to configure the environment variables. Create a `.env` file in the `server` directory with the following contents:

- **CLOUDINARY_NAME**: Your Cloudinary account name (for image uploads).
- **CLOUDINARY_KEY**: Your Cloudinary API key.
- **CLOUDINARY_KEY_SECRET**: Your Cloudinary API secret.
- **PORT**: The port number for the backend server (default is 5000).
- **MONGODB_URL**: The URL for connecting to your MongoDB database. Make sure to replace this with the appropriate URL if you're using a remote MongoDB service.

Ensure that you have these values properly set before starting the backend server.

### Client Environment Variables
For the frontend, you'll need to create a `.env` file in the `client` directory with the following contents:

- **REACT_APP_BASE_URL**: The base URL for API requests. This should match the backend server's address (default is `http://localhost:5000/api/v1/` if running locally).

Make sure to restart your frontend server after setting these environment variables.

### Dashboard Environment Variables

**VITE_REACT_APP_BASE_URL**: The base URL for API requests when using the dashboard (defaults to `http://localhost:5000/api/v1/`).

### Steps to run locally

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/pv-barbershop.git
   cd pv-barbershop

2. Install the frontend dependencies:
   ```bash
    cd client
    npm install
4. Install the backend dependencies:
   ```bash
    cd ../server
    npm install
5. Install the dashboard:
   ```bash
    cd dashboard
    npm install

6. Start the backend server:

   ```bash
    npm start
7. Start the frontend application:
   ```bash
    cd ../client
    npm start

8. Start the dashboard:
   ```bash
    cd ../dashboard
    npm run dev

9. Open your browser and navigate to http://localhost:3000 to see the website in action.

## API Endpoints

### Authentication
- **POST /api/v1/user/signin**: Log in a user and generate a JWT token.
- **POST /api/v1/user/signup**: Register a new user.
- **POST /api/v1/user/other-signin**: Sign in via an alternative method.
- **POST /api/v1/user/other-signup**: Sign up via an alternative method.
- **POST /api/v1/user/signin**: Log in a user.
- **POST /api/v1/user/logout**: Log out a user.
- **POST /api/v1/user/add-favourite**: Add to the user's favourite list.
- **POST /api/v1/user/change-password**: Change user password.
- **POST /api/v1/user/update-address-default**: Update the default address.
- **POST /api/v1/user/add-address**: Add a new address.
- **POST /api/v1/user/update**: Update user information.
- **POST /api/v1/user/refresh-token**: Refresh the JWT token.

### Appointments
- **POST /api/v1/appointment/create**: Create a new appointment.
- **GET /api/v1/appointment/user**: Get appointments for the user.
- **GET /api/v1/appointment/barber/:barberId**: Get appointments for a specific barber.
- **PUT /api/v1/appointment/:id/status**: Update the status of an appointment.
- **DELETE /api/v1/appointment/:id**: Delete an appointment.

### Reviews
- **POST /api/v1/review/create**: Create a new review.
- **GET /api/v1/review/barber/:barberId**: Get reviews by barber.
- **GET /api/v1/review/service/:serviceId**: Get reviews by service.

### Services
- **POST /api/v1/service/create**: Create a new service.
- **GET /api/v1/service/all**: Get all services.
- **GET /api/v1/service/:id**: Get a specific service by ID.
- **PUT /api/v1/service/:id**: Update a service.
- **DELETE /api/v1/service/:id**: Delete a service.

### Inventory
- **POST /api/v1/inventory/add**: Add a new inventory item.
- **GET /api/v1/inventory/all**: Get all inventory items.
- **PUT /api/v1/inventory/:id**: Update an inventory item.
- **DELETE /api/v1/inventory/:id**: Delete an inventory item.

### Invoices
- **POST /api/v1/invoice/create**: Create a new invoice.
- **GET /api/v1/invoice/user**: Get invoices for a user.
- **PUT /api/v1/invoice/:id/status**: Update the status of an invoice.

### File Uploads
- **POST /api/v1/upload/image**: Upload an image.

### Slider
- **POST /api/v1/slider/create**: Create a new slider.
- **POST /api/v1/slider/update**: Update a slider.
- **POST /api/v1/slider/toggle**: Toggle the visibility of a slider.
- **GET /api/v1/slider/find-active**: Get active sliders.
- **GET /api/v1/slider/find/:id**: Get a specific slider by ID.
- **DELETE /api/v1/slider/:id**: Delete a slider.

### Site
- **GET /**: Welcome route for the site.

## Usage
- **Customers** can browse available times and book appointments.
- **Admins** can manage appointments, customer details, inventory, and generate reports through the dashboard.
- **Receptionist** can manage appointments, customer details, inventory, and generate reports through the dashboard.

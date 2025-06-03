# ⚡ Charging Station App

A full-stack application to manage EV charging stations with authentication, CRUD APIs, filters, and map-based UI.

---

## 🎯 Objective

The goal of this project is to assess and demonstrate the ability to build a complete full-stack application using **Node.js**, **Express**, and a **Vue.js frontend**. The app includes:

- Backend API for managing EV chargers
- Secure user authentication (JWT)
- Filterable listing and map-based view on the frontend
- Full deployment on the cloud

---

## 📌 Features & Requirements

### 🛠 Backend – Node.js + Express

- Built with **Node.js** and **Express**
- Database: MongoDB (or your choice of PostgreSQL/MySQL)
- RESTful API with full CRUD support for charging stations

#### Charging Station API

- `POST /api/chargers` – Create a new charging station
- `GET /api/chargers` – List all charging stations
- `GET /api/chargers/:id` – Get charger details
- `PUT /api/chargers/:id` – Update a charging station
- `DELETE /api/chargers/:id` – Delete a charging station

#### User Authentication (JWT)

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive a JWT
- Protected routes require a valid token for:
  - Creating
  - Updating
  - Deleting chargers

#### Charging Station Schema Includes:

- `name`: String
- `location`: Latitude, Longitude
- `status`: Active / Inactive
- `powerOutput`: Number (kW)
- `connectorType`: String (e.g., Type1, Type2, CCS)

---

### 🎨 Frontend – Vue.js

Built with **Vue 3**, the frontend interfaces with the backend API and provides a responsive, user-friendly UI.

#### Screens:

1. **Login Page**
   - Authenticates users via backend JWT API

2. **Charger Listing Page**
   - Displays all chargers in a tabular/card format
   - Filters by:
     - Status (Active/Inactive)
     - Power Output (e.g., 50kW+)
     - Connector Type

3. **Add / Edit / Delete Charger**
   - Modal or route-based forms
   - Protected by authentication

4. **Map View**
   - Google Maps or OpenStreetMap integration
   - Display chargers with location markers
   - Click a marker to view charger details

---

## 🚀 Deployment

### 🌐 Cloud Hosting

- **Frontend**: Deployed on [Vercel](https://charging-frontend-five.vercel.app/login) 
- **Backend**: Deployed on [Render](https://charging-backend-xrk2.onrender.com)


---

## 🧱 Tech Stack

| Layer     | Technology      |
|-----------|------------------|
| Frontend  | Vue.js (Vite)    |
| Backend   | Node.js, Express |
| Database  | MongoDB / Mongoose |
| Auth      | JWT              |
| Maps      | Google Maps |
| Hosting   | Vercel / Render |



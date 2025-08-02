# 🎭 Movie Booking App

A sleek full-stack web application to browse and book tickets for upcoming plays — complete with secure authentication and Stripe-powered payments.

## 🚀 Live Demo

Coming soon...

## 🛠️ Tech Stack

### Frontend
- **React** + **TypeScript**
- **TailwindCSS** for modern, responsive styling
- **@heroui/react** for polished UI components
- **Vite** for lightning-fast development

### Backend
- **Node.js** + **Express.js** for RESTful APIs
- **PostgreSQL** (via **Docker**) for persistent bookings data
- **Firebase Authentication** (Email + Google login)

### Payments
- **Stripe Payment Element** integration for secure, seamless checkout

## 🔑 Features

- 🔍 Browse upcoming plays with rich metadata (title, rating, date, location)
- 🧾 Dynamic ticket pricing and availability
- 🔐 Secure user authentication with Firebase
- 💳 Stripe-powered ticket checkout with custom session handling
- 🧠 Role-based navbar that adapts to login state
- 💡 Clean and responsive UI with modals, dropdowns, and search


## 🧪 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-booking-app.git
cd movie-booking-app
```

### 2. Add Environment Variables

In both the **root `.env`** and **`/server/.env`** files, add the stripe secret and public keys :


### 3. Configure Stripe

- Go to the [Stripe Dashboard](https://dashboard.stripe.com/)
- Create a new **Product** and **Price**
- Replace the placeholder `price_id` in the project code with your real Stripe price ID

### 4. Set Up the Database

Make sure Docker is running, then start the database:

```bash
docker-compose up -d
```

Then run the DB setup script:

```bash
cd server
node setup-db.js
```

This initializes the database with the required tables.

### 5. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../frontend
npm install
```

### 6. Run the App

Start the backend server:

```bash
cd server
npm run dev
```

In a separate terminal, start the frontend:

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

[MIT](LICENSE)

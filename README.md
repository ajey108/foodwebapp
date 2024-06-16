# FoodApp

FoodApp is a full-stack web application that allows users to register, log in, browse food items, order food, and pay through Stripe. The app also includes an admin panel for managing food items, including updating prices, images, and descriptions. The app categorizes food items into different categories such as lunch specials and dinner.

## Features

- User registration and authentication using JWT
- Login and logout functionality
- Admin panel to manage food items (CRUD operations)
- Order food and make payments through Stripe
- Categories for food items (e.g., lunch specials, dinner)

## Tech Stack

- **Frontend**: React.js, React Router DOM, React Icons
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, Bcrypt
- **File Uploads**: Multer
- **Development Tools**: Nodemon, Cors

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Stripe account for payment processing

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ajey108/foodapp.git
cd foodapp

2. Install dependencies for both frontend and backend:
cd frontend
npm install

cd ../backend
npm install
Configuration
Create a .env file in the backend folder and add the following environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key


In the frontend folder, create a .env file and add the following environment variable:

REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key


Running the Application
Start the backend server:

cd backend
npm run dev

Start the frontend server:
cd frontend
npm run dev

The frontend will be running on http://localhost:3000 and the backend on http://localhost:5000.


Usage
Register: Users can register by providing their details on the registration page.

Login/Logout: Users can log in with their credentials and log out when they are done.

Admin Panel: Admins can access the admin panel to manage food items, including adding, updating, and deleting items.

Order Food: Users can browse food items, add them to the cart, and proceed to checkout to make a payment through Stripe.

Dependencies

Frontend
React
React Router DOM
React Icons
Backend
Express
Mongoose
Cors
Multer
JWT
Bcrypt
Nodemon

Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License.




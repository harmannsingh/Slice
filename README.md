Slice - online food ordering app

Slice is a full-featured, responsive food delivery application built using the MERN stack (MongoDB, Express, React, Node.js) with Razorpay payment integration. 

 Features

 Customer Interface (Frontend)
- Responsive Design
- User Authentication
- Order Management
- Razorpay Payment Integration
  
 Admin Panel
- User Management
- Menu Management
- Order Tracking


 Backend (Server)
- API Development
- Data Storage
- Security

 Technology Stack
- Frontend: React, CSS3, and Razorpay integration for payment processing.
- Backend: Node.js with Express.js.
- Database: MongoDB Atlas.
- Payment Integration: Razorpay for secure and seamless payment processing.

 Getting Started
1. Clone the Repository: `git clone <repo-url>`
2. Install Dependencies: 
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Set Up Environment Variables: Add environment variables for MongoDB, Razorpay keys, and JWT secrets in a `.env` file.
4. Run the Application:
   - Start the client: `npm start` from the client folder.
   - Start the server: `npm start` from the server folder.

 Project Structure
```bash
Slice/
│
├── client/                  # Frontend code (React)
│   ├── public/
│   ├── src/
│       ├── components/
│       ├── pages/
│       └── utils/
│
├── server/                  # Backend code (Node.js, Express)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
├── admin/                   # Admin panel (React, can be separate or part of client)
│   ├── components/
│   └── pages/
│
├── .env                     # Environment variables
├── README.md
└── package.json
```


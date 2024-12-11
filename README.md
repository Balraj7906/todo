# getDone - MERN Stack Todo Application

A modern todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to manage their tasks efficiently.

## Features

- User Authentication (Register/Login)
- Create, Read, Update, Delete Todos
- Toggle Todo Status
- Optional Time Setting for Todos
- Modern and Responsive UI

## Project Structure

```
getDone/
├── frontend/     # React + Vite frontend
└── backend/      # Node.js + Express backend
```

## Setup Instructions

### Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB URI and JWT secret
4. Start the server: `npm start`

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Deployment Instructions

### Frontend Deployment

1. Build the frontend:
```bash
cd frontend
npm install
npm run build
```

2. Deploy the `dist` folder to your static hosting service (e.g., Netlify, Vercel, or AWS S3)

3. Set the environment variables in your hosting platform:
   - `VITE_API_URL`: Your backend API URL

### Backend Deployment

1. Prepare your backend:
```bash
cd backend
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your production settings:
     - `NODE_ENV=production`
     - `PORT`: Your desired port (usually provided by hosting platform)
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string for JWT signing
     - `CORS_ORIGIN`: Your frontend application URL

3. Deploy to your chosen platform (e.g., Heroku, DigitalOcean, or AWS):
   - Make sure to set all environment variables in your hosting platform
   - Configure your database connection
   - Set up SSL/TLS for secure communication

### Deployment Checklist

- [ ] Frontend build is created and tested
- [ ] Backend environment variables are configured
- [ ] Database is set up and secured
- [ ] CORS is configured correctly
- [ ] SSL/TLS certificates are installed
- [ ] Domain names are configured
- [ ] API endpoints are working
- [ ] Authentication is working
- [ ] Error logging is set up

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Security Considerations

- Always use HTTPS in production
- Store sensitive data in environment variables
- Keep dependencies updated
- Implement rate limiting
- Set up proper CORS configuration
- Use secure session management
- Implement proper error handling

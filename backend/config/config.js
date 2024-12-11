export default {
  development: {
    port: 3000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/getDone',
    jwtSecret: process.env.JWT_SECRET || 'your-dev-secret',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
  },
  production: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI, // Set this in your deployment environment
    jwtSecret: process.env.JWT_SECRET, // Set this in your deployment environment
    corsOrigin: process.env.CORS_ORIGIN || 'https://your-frontend-domain.com' // Replace with your frontend domain
  }
};

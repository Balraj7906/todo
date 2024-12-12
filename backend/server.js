import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from "./routes/auth.js"
import todoRoutes from './routes/todos.js'
import config from './config/config.js';

// Load environment variables
dotenv.config({
  path: './.env'
});

const environment = process.env.NODE_ENV || 'development';
const currentConfig = config[environment];

const app = express();

app.get("/", ((req, res) => {
  res.send("Server started")
}))

// Security middleware
app.use(cors({
  origin: ["https://deploy-todo-app.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(currentConfig.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = currentConfig.port;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server running in ${environment} mode on http://${HOST}:${PORT}`);
});

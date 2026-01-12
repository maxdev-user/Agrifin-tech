import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import contractRoutes from './routes/contractRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/contract', contractRoutes);
app.use(errorHandler);

const port = process.env.SVR_PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

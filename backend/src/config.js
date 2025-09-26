import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sweetshop'
};



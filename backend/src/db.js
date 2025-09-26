import mongoose from 'mongoose';

export async function connectMongo(uri) {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri);
}



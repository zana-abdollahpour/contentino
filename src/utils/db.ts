import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.cf89u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export async function db() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(uri);
}

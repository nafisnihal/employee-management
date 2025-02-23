import mongoose from "mongoose";

const MONGO_URL = process.env.NEXT_PUBLIC_MONGO_URL || "";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGO_URL);
    console.log("📡 Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

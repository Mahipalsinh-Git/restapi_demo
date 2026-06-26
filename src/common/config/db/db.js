import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoose = await mongoose.connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log("DB connection failed");
    throw error;
  }
};

export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("mongodb connected");
  } catch (error) {
    console.error(error);
  }
};
export default connectDB;

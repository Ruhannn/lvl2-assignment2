import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    // eslint-disable-next-line no-console
    console.log("mongodb connected");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
export default connectDB;

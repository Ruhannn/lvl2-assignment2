import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
dotenv.config();
const app = express();
// connect to mongodb
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("i love ayaka");
});
app.listen(PORT, () => {
  console.log(`Love ayaka on ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import productRoutes from "./routes/products";
dotenv.config();
const app = express();
// connect to mongodb
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5001;
// ROUTES
app.get("/", (req, res) => {
  res.send("i love ayaka");
});
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Love ayaka on ${PORT}`);
});

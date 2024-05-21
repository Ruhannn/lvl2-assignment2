// @typescript-eslint/no-unused-vars
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
dotenv.config();
const app = express();
// connect to mongodb
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5001;
// ROUTES
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
// home
app.get("/", (req, res) => {
  res.send("i love ayaka");
});
// unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// error handling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: express.Request, res: express.Response) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Love ayaka on ${PORT}`);
});

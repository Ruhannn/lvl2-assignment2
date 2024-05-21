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
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.get("/", (req, res) => {
  res.send("i love ayaka");
});
// error handling
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
);
app.listen(PORT, () => {
  console.log(`Love ayaka on ${PORT}`);
});

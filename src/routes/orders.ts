import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrdersByEmail,
  deleteOrder,
} from "../controllers/orders";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/email", getOrdersByEmail);
router.delete("/orders/:orderId", deleteOrder);

export default router;

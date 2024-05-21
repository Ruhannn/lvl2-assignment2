import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products";
const router = Router();

router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
router.post("/products", createProduct);
router.put("/products/:productId", updateProduct);

export default router;

import { Router } from "express";
import { getProductById, getProducts } from "../controllers/products";
const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);

export default router;

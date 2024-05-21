import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import { orderSchema } from "../middleware/validation";

// get order by email address
export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email query parameter is required" });
    }

    const orders = await Order.find({ email: email.toString() });
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
// create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const validationResult = orderSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ success: false, message: validationResult.error.errors });
    }

    const { email, productId, price, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "O not found" });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();

    const order = new Order({ email, productId, price, quantity });
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
// get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
// delete order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

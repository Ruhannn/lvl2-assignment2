import { Request, Response } from "express";
import Product from "../models/Product";
import { productSchema } from "../middleware/validation";

// get all products + search
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid search term.",
        });
      }
      // create the search query
      const searchQuery = { $text: { $search: searchTerm.trim() } };
      // fetch products matching the term
      const products = await Product.find(searchQuery);
      // check if no products are found
      if (products.length === 0) {
        return res.status(404).json({
          success: true,
          message: "No products found matching the search term.",
          data: [],
        });
      }
      // return the found products
      return res.status(200).json({
        success: true,
        message: `Products matching search term fetched successfully!`,
        data: products,
      });
    }
    // Fetch all products
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: (error as Error).message });
  }
};
// get single product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
// create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ success: false, message: validationResult.error.errors });
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
// update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({ success: false, message: validationResult.error.errors });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
// delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

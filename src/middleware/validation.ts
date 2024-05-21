import { object, string, number, array, boolean } from "zod";

export const productSchema = object({
  name: string().min(1),
  description: string().min(1),
  price: number().positive(),
  category: string().min(1),
  tags: array(string()),
  variants: array(
    object({
      type: string().min(1),
      value: string().min(1),
    })
  ),
  inventory: object({
    quantity: number().nonnegative(),
    inStock: boolean(),
  }),
});

export const orderSchema = object({
  email: string().email(),
  productId: string().min(1),
  price: number().positive(),
  quantity: number().positive(),
});

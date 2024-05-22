const axios = require("axios");
const baseURL = "http://localhost:5001/api";
let cId;
// create product
describe("Create a New Product", () => {
  test("should create a new product successfully", async () => {
    const requestBody = {
      name: "iPhone 13",
      description:
        "A sleek and powerful smartphone with cutting-edge features.",
      price: 999,
      category: "Electronics",
      tags: ["smartphone", "Apple", "iOS"],
      variants: [
        { type: "Color", value: "Midnight Blue" },
        { type: "Storage Capacity", value: "256GB" },
      ],
      inventory: { quantity: 50, inStock: true },
    };
    const response = await axios.post(`${baseURL}/products`, requestBody);
    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Product created successfully!");
    expect(response.data.data).toEqual(expect.objectContaining(requestBody));
    cId = response.data.data._id;
  });
});
// get all products
describe("Retrieve a List of All Products", () => {
  test("should retrieve all products successfully", async () => {
    const response = await axios.get(`${baseURL}/products`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Products fetched successfully!");
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
// get product by id
describe("Retrieve a Specific Product by ID", () => {
  test("should retrieve a product by ID successfully", async () => {
    const productId = "664c3ffe764232ea2d3082e6";
    const response = await axios.get(`${baseURL}/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Product fetched successfully!");
    expect(response.data.data).toHaveProperty("name", "Coffee Maker");
  });
});
// update a specific product
describe("Update Product Information", () => {
  test("should update product information successfully", async () => {
    const productId = "664c2e117ded80d494b10ef0";
    const updatedData = {
      name: "iPhone 13",
      description:
        "A sleek and powerful smartphone with cutting-edge features.",
      price: 999,
      category: "Electronics",
      tags: ["smartphone", "Apple", "iOS"],
      variants: [
        { type: "Color", value: "Midnight Blue" },
        { type: "Storage Capacity", value: "256GB" },
      ],
      inventory: { quantity: 49, inStock: true },
    };

    const response = await axios.put(
      `${baseURL}/products/${productId}`,
      updatedData
    );
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Product updated successfully!");
    expect(response.data.data).toEqual(expect.objectContaining(updatedData));
  });
});
// delete product
describe("Delete a Product", () => {
  test("should delete a product successfully", async () => {
    // Check if cId is defined
    expect(cId).toBeDefined();
    const getProductResponse = await axios.get(`${baseURL}/products/${cId}`);
    expect(getProductResponse.status).toBe(200);
    expect(getProductResponse.data.success).toBe(true);

    const deleteResponse = await axios.delete(`${baseURL}/products/${cId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.data.success).toBe(true);
    expect(deleteResponse.data.message).toBe("Product deleted successfully!");
  });
});
//  select product
describe("Search Products", () => {
  test("should retrieve products matching search term successfully", async () => {
    const searchTerm = "Wireless";
    const response = await axios.get(
      `${baseURL}/products?searchTerm=${searchTerm}`
    );
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe(
      `Products matching search term fetched successfully!`
    );
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
// create order
describe("Create a New Order", () => {
  test("should create a new order successfully", async () => {
    const requestBody = {
      email: "level2@programming-hero.com",
      productId: "664c2e117ded80d494b10ef0",
      price: 1,
      quantity: 1,
    };
    const response = await axios.post(`${baseURL}/orders`, requestBody);
    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Order created successfully!");
    expect(response.data.data).toEqual(expect.objectContaining(requestBody));
  });
});
// get all orders
describe("Retrieve All Orders", () => {
  test("should retrieve all orders successfully", async () => {
    const response = await axios.get(`${baseURL}/orders`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Orders fetched successfully!");
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
// get order by email
describe("Retrieve Orders by User Email", () => {
  test("should retrieve orders by user email successfully", async () => {
    const email = "level2@programming-hero.com";
    const response = await axios.get(`${baseURL}/orders?email=${email}`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Orders fetched successfully!");
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});

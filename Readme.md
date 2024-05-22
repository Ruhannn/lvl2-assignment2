### Prerequisites
Before you begin, ensure you have
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/Ruhannn/lvl2-assignment2.git
   ```

2. Navigate to the project directory:

   ```bash
   cd lvl2-assignment2
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory
   - Add the following environment variables:

   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   ```

   Replace `<your-mongodb-uri>` with the connection URI for your MongoDB database.

### Running the Application

To start the application, execute the following command:

```bash
npm start
```

The server will start running on `http://localhost:5001`.

### API Endpoints

- **GET /api/products**: Retrieve all products or search for products using a query parameter `searchTerm`.

- **POST /api/products**: Create a new product.

- **GET /api/products/:productId**: Retrieve a specific product by ID.

- **PUT /api/products/:productId**: Update a product by ID.

- **DELETE /api/products/:productId**: Delete a product by ID.

- **POST /api/orders**: Create a new order.

- **GET /api/orders**: Retrieve all orders.

- **GET /api/orders?email=<user-email>**: Retrieve orders by user email.

 You can test all of them by
```bash
npm test
```

## Built With

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

## Authors

- [Ruhannn](https://github.com/Ruhannn)


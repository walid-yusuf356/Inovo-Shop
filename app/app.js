import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";
import productRoutes from "../routes/productRoute.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Middleware to parse JSON

// db connect
dbConnect();

// routes middleware to parse the request body and pass it to the userRoutes
app.use("/api/v1/users/", userRoutes);
// routes middleware to parse the request body and pass it to the productRoutes
app.use("/api/v1/products", productRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

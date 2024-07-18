import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Middleware to parse JSON

// db connect
dbConnect();
// pass incoming data to the routes
app.use(express.json());

// routes
app.use("/", userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

// Initiate express router
import express from "express";
import { createProductController, getProductsController } from "../controllers/productController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

// Create a new router method to handle product routes
const productRoutes = express.Router();
// http method to handle product creation route and pass it to the createProductController
productRoutes.post("/", isLoggedIn, createProductController);

// http method to handle product fetch route and pass it to the getProductsController
productRoutes.get("/", getProductsController);


export default productRoutes;
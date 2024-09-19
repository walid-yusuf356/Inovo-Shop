// Initiate express router
import express from "express";
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

// Create a new router method to handle product routes
const productRoutes = express.Router();
// http method to handle product creation route and pass it to the createProductController
productRoutes.post(
  "/",
  isLoggedIn, 
  isAdmin,
  upload.single("file"),
  createProductController
);

// http method to handle product fetch route and pass it to the getProductsController
productRoutes.get("/", getProductsController);

// http method to handle product fetch by id route and pass it to the getProductController
productRoutes.get("/:id", getProductController);

// http method to handle product update route and pass it to the updateProductController
productRoutes.put("/:id", isLoggedIn, isAdmin ,updateProductController);

// http method to handle product delete route and pass it to the deleteProductController
productRoutes.delete("/:id/delete", isLoggedIn, isAdmin, deleteProductController);

export default productRoutes;

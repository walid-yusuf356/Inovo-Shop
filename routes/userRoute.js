// import express module to use express methods and properties to handle user routes
import express from "express";
import {
  registerUserController,
  loginUserController,
  profileUserController,
  updateShippingAddressController,
} from "../controllers/userController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
// Create a new router method to handle user routes
const userRoutes = express.Router();

// http method to handle user registration route pass to the registerUserController
userRoutes.post("/register", registerUserController);
// http method to handle user login route pass to the loginUserController
userRoutes.post("/login", loginUserController);
// http method to handle user profile route pass to the profileUserController
userRoutes.get("/profile", isLoggedIn, profileUserController);
userRoutes.put("/update/shipping", isLoggedIn, updateShippingAddressController);

export default userRoutes;

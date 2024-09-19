import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { createColorController, getAllColorsController, getSingleColorController, updateColorsController, deleteColorController } from '../controllers/ColorController.js';
import isAdmin from '../middlewares/isAdmin.js';
const colorRouter = express.Router();

// http method to handle color creation route and pass it to the createColorController
colorRouter.post("/", isLoggedIn, isAdmin, createColorController);
colorRouter.get("/", getAllColorsController);
colorRouter.get("/:id", getSingleColorController);
colorRouter.put("/:id", isLoggedIn, isAdmin, updateColorsController);
colorRouter.delete("/:id", isLoggedIn, isAdmin, deleteColorController);

export default colorRouter;

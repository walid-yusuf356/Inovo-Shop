import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { createColorController, getAllColorsController, getSingleColorController, updateColorsController, deleteColorController } from '../controllers/ColorController.js';

const colorRouter = express.Router();

// http method to handle color creation route and pass it to the createColorController
colorRouter.post("/", isLoggedIn, createColorController);
colorRouter.get("/", getAllColorsController);
colorRouter.get("/:id", getSingleColorController);
colorRouter.put("/:id", isLoggedIn, updateColorsController);
colorRouter.delete("/:id", isLoggedIn, deleteColorController);

export default colorRouter;
